interface Books {
    isbn10: string,
    title: string,
    amazon_link: string,
    rakuten_link: string,
    review_link?: string,
    categories?: string[]
}

export const books: Array<Books> = [
    {
        isbn10: "4873115655",
        title: "リーダブルコード ―より良いコードを書くためのシンプルで実践的なテクニック (Theory in practice)",
        amazon_link: "https://amzn.to/3AljCoF",
        rakuten_link: "https://books.rakuten.co.jp/rb/11753651/"
    },
    {
        isbn10: "4774142042",
        title: "Webを支える技術 -HTTP、URI、HTML、そしてREST (WEB+DB PRESS plus)",
        amazon_link: "https://amzn.to/2SKEgh9",
        rakuten_link: "https://books.rakuten.co.jp/rb/6385779/"
    },
    {
        isbn10: "4274224473",
        title: "マスタリングTCP/IP―入門編―(第6版)",
        amazon_link: "https://amzn.to/3hbzT7X",
        rakuten_link: "https://books.rakuten.co.jp/rb/16094948/?l-id=search-c-item-text-02"
    },
    {
        isbn10: "483997277X",
        title: "アルゴリズム実技検定 公式テキスト[エントリー~中級編]",
        amazon_link: "https://amzn.to/3jDYNiw",
        rakuten_link: "アルゴリズム実技検定 公式テキスト[エントリー~中級編]",
        categories: ["atcoder"]
    },
    {
        isbn10: "",
        title: "問題解決力を鍛える！アルゴリズムとデータ構造",
        amazon_link: "https://amzn.to/2UTNvfu",
        rakuten_link: "問題解決力を鍛える！アルゴリズムとデータ構造",
        categories: ["atcoder"]
    }
]