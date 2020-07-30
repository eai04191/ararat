<h1 align="right">
<img src="./doc/logo.png" height="48px">
</h1>

> <h3>アララト山 - Wikipedia</h3>
> アララト山（アララトさん）は、トルコ共和国の東端にある標高5,137mの山であり成層火山である。
>
> 『旧約聖書』にでてくるノアの箱舟が大洪水の後、流れ着いたとされる山と目されて、12 世紀以降にヨーロッパ人により命名された。
>
> <p align="right"><a href="https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%A9%E3%83%A9%E3%83%88%E5%B1%B1">ja.wikipedia.org/wiki/アララト山</a></p>

notestock の webhook から呼び出される前提で作ってあります。

トークンに必要な権限: `read:search` `write:statuses`

vercel にデプロイしていい感じに設定すれば動くと思います
### 使い方

使う人いないと思うけど自分が忘れたときのために

1. vercelにデプロイ
2. vercelでproductionのenvを設定(`BOT_TOKEN`と`BOT_HOST`)
3. notestockでwebhookを設定

### notestock webhook設定

- 正規表現: `#waterfloodeveryday`
- webhook URL: `デプロイ先/api`
- メソッド: `POST`
- Content-Type: `application/json`
- 送信body: `$JSON`
