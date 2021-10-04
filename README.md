# madoi-sample-chat-js

未来環境ラボで開発しているオブジェクト共有サービス madoi を使ってチャットを作成するサンプルです。

まずはこのリポジトリをcloneしてください。
```
git clone https://github.com/kcg-edu-future-lab/madoi-sample-chat-js
```

次にindex.htmlがあるディレクトリでHTTPサーバを起動し，ブラウザで表示してください。例えばpython3がインストールされていれば，以下のコマンドでサーバを起動できます。Rubyや他の言語でもHTTPサーバを起動できるものはありますので，環境に応じた方法で起動してください。
```
python3 -m http.server
```

表示された画面のテキストフィールドにメッセージを入力してEnterを押すか送信ボタンを押すと，チャットメッセージが送信されます。

## コードの説明

madoiを使ったチャットのサンプルです。madoiは指定されたメソッドの実行を，同じセッションに参加しているアプリ間で共有するサービスです。このサンプル(index.js)では，まずチャットログを管理するクラスChatを作り，メソッドsendを以下のように記述しています。

```
    send(name, message){
        const textSpan = document.createElement("span");
        textSpan.append(name + ": " + message);
        this.logDiv.append(textSpan);
        this.logDiv.append(document.createElement("br"));
        this.logDiv.scrollTop = this.logDiv.scrollHeight;
    }
```

このメソッドでは，名前(name)とメッセージ(message)を受け取り，チャットログに"名前: メッセージ"という文字列を追加しています。もしこの処理が他のブラウザでも実行されば，誰かがチャットログを追加したときに他のブラウザでも同じように追加されることになります。index.jsの以下の部分で，その指定を行っています。

```
    m.register(chat, [
        { method: chat.send, config: {maxLog: "1000"}}
    ]);
```

上記のコードが実行されると，chat.sendの内容が置き換えられ，メソッドが実行されたら一旦それをサービスに送信するようになります。サービスは参加している全てのブラウザにそれを送信し，ブラウザ側で受信されたら本来のchat.sendの処理が実行されます。これにより，チャットログの共有が実現されます。
