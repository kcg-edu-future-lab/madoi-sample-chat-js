# madoi-sample-chat-js

未来環境ラボで開発しているオブジェクト共有サービス [madoi](https://github.com/kcg-edu-future-lab/madoi) を使ってチャットを作成するサンプルです。

まずはこのリポジトリをcloneしてください。
```
git clone https://github.com/kcg-edu-future-lab/madoi-sample-chat-js
```

次にindex.htmlがあるディレクトリでHTTPサーバを起動し，ブラウザで表示してください。例えばpython3がインストールされていれば，以下のコマンドでサーバを起動できます。
```
python3 -m http.server
```

表示された画面のテキストフィールドにメッセージを入力してEnterを押すか送信ボタンを押すと，チャットメッセージが送信されます。

## コードの説明

madoiを使ったチャットのサンプルです。madoiは指定されたメソッドの実行を，同じセッションに参加しているアプリ間で共有するサービスです。このサンプル(index.html)では，まずチャットログを管理するクラスChatを作り，メソッドaddLogを以下のように記述しています。

```
    addLog(name, message){
        const textSpan = document.createElement("span");
        textSpan.append(name + ": " + message);
        this.logDiv.append(textSpan);
        this.logDiv.append(document.createElement("br"));
        this.logDiv.scrollTop = this.logDiv.scrollHeight;
    }
```

このメソッドでは，名前(name)とメッセージ(message)を受け取り，チャットログに"名前: メッセージ"という文字列を追加しています。あるブラウザでこのメソッドの実行されるときに，参加している他のブラウザでも同じようにこのメソッドを実行すれば，チャットログの状態が同じになります。index.htmlの以下の部分で，その指定を行っています。

```
    mm.shareObject(chat, [chat.addLog], {
        "methods": {
            "addLog": {keep: "log", maxLog: "1000"}
        }
    });
```