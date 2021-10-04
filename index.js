window.addEventListener("load", ()=>{
    const m = new madoi.Madoi("rooms/chat-ldfnglkkeg");
    const chat = new Chat(
        "#chatForm", "#nameInput",
        "#messageInput", "#chatLogDiv");
    m.register(chat, [
        {method: chat.send, share: {maxLog: 1000}}
    ]);
});

class Chat{
    constructor(sendFormId, nameInputId, messageInputId, logDivId){
        this.nameInput = document.querySelector(nameInputId);
        this.messageInput = document.querySelector(messageInputId);
        this.logDiv = document.querySelector(logDivId);
        const sendForm = document.querySelector(sendFormId);
        sendForm.addEventListener("submit", event => {
            event.preventDefault();
            const name = this.nameInput.value.trim();
            const text = this.messageInput.value.trim();
            if(text.length == 0) return false;
            this.messageInput.value = "";
            this.send(name, text);
            return false;
        });
    }
    send(name, message){
        const textSpan = document.createElement("span");
        textSpan.append(name + ": " + message);
        this.logDiv.append(textSpan);
        this.logDiv.append(document.createElement("br"));
        this.logDiv.scrollTop = this.logDiv.scrollHeight;
    }
}
