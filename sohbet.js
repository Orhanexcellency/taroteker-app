function addMsg(type, text) {
    const box = document.getElementById("chat-box");
    let div = document.createElement("div");
    div.className = type;
    div.innerText = text;

    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

function sendDream() {
    let input = document.getElementById("chat-input");
    let text = input.value.trim();
    if (!text) return;

    addMsg("user-msg", text);
    input.value = "";

    setTimeout(() => {
        addMsg("ai-msg", "Rüyanın altında yatan güçlü bir mesaj var. Yakında hayatında beklediğin bir dönüşüm yaşanacak. Bilinçaltın seni bir karar değişikliğine hazırlıyor...");
    }, 600);
}
