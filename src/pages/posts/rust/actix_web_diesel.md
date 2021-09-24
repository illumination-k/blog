---
title: Actix-Web + Diesel + PostgresでCRUDしてみた
description: Actix-webを使ってみたかったので、DieselのGetting StartをActix-webで実装しました。
---

## TL;DR

型がほしい、Python の Typing とかじゃなくて型がほしい。ということで Actix-web に入門しています。とりあえず、Diesel を使って CRUD してみます。

基本的には、[Diesel の Getting Start](https://diesel.rs/guides/getting-started)を Actix-web を使って再現する、ということをします。

## 準備

まず`Diesel`をインストールします。今回は Postgresql を使うので、feature は postgres のみです。postgres のために`libpq-dev`が必要なので最初に入れます。

```bash
sudo apt install libpq-dev
cargo install diesel_cli --no-default-features --features postgres
```

Postgresql を立ち上げます。今回は`docker-compose`を使います。

```yaml:title=docker-compose.yaml
version: "3.0"

services:
  db:
    image: postgres:11.7
    container_name: actix_web_crud
    volumes:
      - ./postgres_data:/var/lib/postgresql/data/
    ports:
      - 5432:5432
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=disel_demo

volumes:
  postgres_data: {}
```

環境変数として`.env`を作成しておきます。

```bash
echo 'DATABASE_URL=postgres://postgres:postgres@localhost/actix_web_crud' >> .env
```

プロジェクトを作って migration します。

```bash
cargo new actix-web-crud
cd actix-web-crud
docker-compose up -d
diesel setup
diesel generate create_posts
```

`migrations/${date}_create_posts`というディレクトリの中に`up.sql`と`down.sql`ができているはずです。`up.sql`が migration run するときに使われるやつで、`down.sql`が migration redo するときに使われるやつです。これらを以下のように書き換えます。

```sql:title=up.sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  body TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT 'f'
)
```

```sql:title=down.sql
DROP TABLE posts
```

migration します。

```bash
diesel migration run
```

これでセットアップは終わりです。

## Rust を書く

今回使うものを入れていきます。ORM として Diesel を、JSON を扱うために serde 類を、エラーハンドリングに anyhow を使っています。

```toml:title=Cargo.tml
[dependencies]
actix-web = "3"
diesel = { version = "^1.1.0", features = ["postgres", "r2d2"] }
dotenv = "0.15"
r2d2 = "0.8"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
anyhow = "1.0"
```

### Hello, World

まず、`Actix-Web`で Hello world しておきます。

```rust
use anyhow::Result;
use actix_web::{get, App, HttpServer, Responder};

#[get("/")]
async fn hello() -> impl Responder {
    "Hello, world!"
}

#[actix_web::main]
async fn main() -> Result<()> {
    HttpServer::new(move || {
        App::new()
            .service(hello)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
    .expect("Error in build httpserver");
    Ok(())
}
```

```bash
cargo run
curl http://localhost:8080
# Hello, world!
```

### ディレクトリ構成

```
src/
├── database.rs
├── main.rs
├── models.rs
├── routes/
│  ├── mod.rs
│  └── posts/
│     ├── delete.rs
│     ├── get.rs
│     ├── mod.rs
│     ├── post.rs
│     └── publish.rs
└── schema.rs
```

ディレクトリ構成は以上のものを想定しています。役割は名前のままですが、Routing のためにディレクトリを作ったくらいです。`publish`というところで PUT を実装します。

### データベースの準備

まず、データベースに接続するための設定を書きます。あと型が長いので名前をつけておきます。

```rust:title=database.rs
use anyhow::Result;
use diesel::pg::PgConnection;
use diesel::r2d2::{self, ConnectionManager};

use ::r2d2::PooledConnection;
use dotenv::dotenv;

pub type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;
pub type PooledPgConnection = PooledConnection<ConnectionManager<PgConnection>>;

fn database_uri() -> Result<String> {
    dotenv().ok();

    let uri = std::env::var("DATABASE_URL")?;
    Ok(uri)
}

pub fn establish_connection() -> Result<Pool> {
    let uri = database_uri()?;

    let manager = ConnectionManager::<PgConnection>::new(uri);
    let pool = r2d2::Pool::builder().build(manager)?;
    Ok(pool)
}
```

model を書きます。Get で返すときや Post で受け取るときに JSON に Serialize/Deserialize できる必要があります。Query とかで使うやつには`Queryable`、Post で使うやつに`Insertable`をつけます。

```rust:title=models.rs
use crate::schema::posts;
use serde::{Deserialize, Serialize};
#[derive(Debug, Serialize, Deserialize, Queryable)]
pub struct Post {
    pub id: i32,
    pub title: String,
    pub body: String,
    pub published: bool,
}

#[derive(Debug, Insertable, Serialize, Deserialize)]
#[table_name = "posts"]
pub struct NewPost {
    pub title: String,
    pub body: String,
}
```

## CRUD の実装

とりあえず`mod.rs`類を書きます。

```rust:title=routes/mod.rs
pub mod posts;
```

```rust:title=routes/posts/mod.rs
pub mod delete;
pub mod get;
pub mod post;
pub mod publish;
```

あとは`main.rs`に以下を追記します。

```rust:title=main.rs
mod database;
mod models;
mod routes;
mod schema;
```

### GET と Post の実装

すべての Posts を返します。diesel は tokio をサポートしてないらしいので、`web::lock`を使っています。

```rust:title=routes/posts/get.rs
use crate::database::Pool;
use crate::models::Post;
use crate::schema::posts;
use actix_web::{get, web, HttpResponse};
use diesel::prelude::*;

#[get("/posts")]
pub async fn index(pool: web::Data<Pool>) -> HttpResponse {
    let conn = pool
        .get()
        .expect("couldn't get driver connection from pool");

    let results: Vec<Post> = web::block(move || posts::table.load(&conn))
        .await
        .map_err(|e| {
            eprintln!("Error: {}", e);
            HttpResponse::InternalServerError().finish()
        })
        .expect("Error in load posts");

    HttpResponse::Ok().json(results)
}
```

何も入れてないため、GET しても空リストしかもらえないので、POST も実装します。

```rust:title=routes/posts/post.rs
use crate::database::{Pool, PooledPgConnection};
use crate::models::NewPost;
use crate::schema::posts;
use actix_web::{post, web, HttpResponse};
use anyhow::Result;
use diesel::prelude::*;

fn add_post(conn: &PooledPgConnection, new_post: &NewPost) -> Result<()> {
    diesel::insert_into(posts::table)
        .values(new_post)
        .execute(conn)?;
    Ok(())
}

#[post("/posts")]
pub async fn index(pool: web::Data<Pool>, form: web::Json<NewPost>) -> HttpResponse {
    let conn = pool
        .get()
        .expect("couldn't get driver connection from pool");

    let new_post = NewPost {
        title: form.title.clone(),
        body: form.body.clone(),
    };

    web::block(move || add_post(&conn, &new_post))
        .await
        .map_err(|e| {
            eprintln!("ERROR: {}", e);
            HttpResponse::InternalServerError().finish()
        })
        .expect("Error in add post");

    eprintln!("Accecpted!");

    HttpResponse::Created().body("Created!")
}
```

`main.rs`を更新します。Routing の追加とデータベースへの接続を行います。

```rust:title=main.rs
#[macro_use]
extern crate diesel;

use anyhow::Result;

use actix_web::{get, App, HttpServer, Responder};

mod database;
mod models;
mod routes;
mod schema;

#[get("/")]
async fn hello() -> impl Responder {
    "Hello, world!"
}

#[actix_web::main]
async fn main() -> Result<()> {
    // databaseへの接続
    let pool = database::establish_connection()?;
    HttpServer::new(move || {
        App::new()
            .data(pool.clone())
            .service(hello)
            .service(routes::posts::get::index)
            .service(routes::posts::post::index)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
    .expect("Error in build httpserver");
    Ok(())
}
```

動かしてみます。

```bash
curl -H "Content-type: application/json" -X POST http://localhost:8080/posts -d '{ "title": "First post", "body": "this is first post for actix-web-crud" }'
# Created!
curl http://localhost:8080/posts
# [{"id":1,"title":"First post","body":"this is first post for actix-web-crud","published":false}]
```

### PUT の実装

publish 状態を変更する PUT を実装します。簡単のため`/posts/publish/$post_id`で Publish 状態になることにします。

`web::Path<T>`は`to_owned`で`T`になります。

```rust:title=routes/posts/publish.rs
use crate::models::Post;
use crate::schema::posts;
use actix_web::{put, web, HttpResponse};
use anyhow::Result;
use diesel::prelude::*;

fn published(conn: &PooledPgConnection, id: i32) -> Result<Post> {
    let post: Post = diesel::update(posts::table.find(id))
        .set(posts::published.eq(true))
        .get_result(conn)?;

    Ok(post)
}

#[put("/posts/publish/{post_id}")]
pub async fn index(pool: web::Data<Pool>, post_id: web::Path<i32>) -> HttpResponse {
    let conn = pool
        .get()
        .expect("couldn't get driver connection from pool");

    let id = post_id.to_owned();

    let post: Post = web::block(move || published(&conn, id))
        .await
        .expect("Error in published");

    HttpResponse::Ok().body(format!("Published:\n title: {}", post.title))
}
```

`main.rs`に Routing を足したあと実行してみます。

```bash
curl -X PUT http://localhost:8080/posts/publish/1
# Published:
#  title: First post
curl http://localhost:8080/posts
# [{"id":1,"title":"First post","body":"this is first post for actix-web-crud","published":true}]
```

### DELETE の実装

`/posts/$post_id`で DELETE します。

```rust:routes/posts/delete.rs
use crate::database::{Pool, PooledPgConnection};
use crate::schema::posts;
use actix_web::{delete, web, HttpResponse};
use anyhow::Result;
use diesel::prelude::*;

fn delete(conn: &PooledPgConnection, id: i32) -> Result<()> {
    diesel::delete(posts::table.find(id)).execute(conn)?;
    Ok(())
}

#[delete("/posts/{post_id}")]
pub async fn index(pool: web::Data<Pool>, post_id: web::Path<i32>) -> HttpResponse {
    let conn = pool
        .get()
        .expect("couldn't get driver connection from pool");

    let id = post_id.to_owned();

    web::block(move || delete(&conn, id))
        .await
        .expect("Error in delete");

    HttpResponse::Ok().body(format!("Delete: {}", id))
}
```

Routing を追加して実行します。

```bash
curl -X DELETE http://localhost:8080/posts/1
# Delete: 1
curl http://localhost:8080/posts
# []
```

CRUD の完成です。

## 終わりに

実装は以下です。もう少し機能が追加されています。

![github:illumination-k/actix-web-crud](github:illumination-k/actix-web-crud)
