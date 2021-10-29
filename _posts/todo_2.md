---
titile: Markdownで書けるタスクリストを作る
description: まずはMarkdownで書けるタスクリストを作ります。
---

## TL;DR

O/Rマッパとしてはprismaを使用するので、とりあえず

## Next.jsのセットアップ

なにはともあれNext.jsをセットアップします。

```bash
yarn create next-app --typescript
```

## prismaのセットアップ

### Postgresqlの準備

herokuかなんかにデプロイする気がするので、postgresを使用します。まず、postgresをdockerで用意しておきます。頻繁にpostgresのdockerを使っているので、使用するportは15432です。

```yml
version: "3"
services:
  db:
    image: postgres:13.3
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - 15432:5432
    volumes:
      - ./postgres:/var/lib/postgresql
volumes:
  postgres:
```

### prismaをインストール

```bash
# install
yarn add @prisma/client
yarn add prisma --dev

# init
npx prisma init
```

`.env`が作成され、その中にDATABASE_URLが設定されています。portを今回はいじっているのと、パスワード、ユーザーネームが設定されているので以下のように変更しておきます。

```
DATABASE_URL="postgresql://postgres:postgres@localhost:15432/main?schema=public"
```

schemaを書きます。とりあえず、titleとcontentがあれば良さそうです。

```
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Todo {
  id        Int      @default(autoincrement()) @id
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title String @db.VarChar(255)
  content String?
}
```

準備ができたので、データベースを起動した後、migrationをし、prisma clientのセットアップをします。

```bash
npx prisma migrate dev --name init
```

migrateをすると自動的に`@prisma/client`が`node_modules`配下に作成されます。明示的に`npx prisma generate`をすることでも生成できます。

