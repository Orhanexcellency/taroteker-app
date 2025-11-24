function openDream() {
    window.location.href = "sohbet.html";
}

function openCards() {
    const count = parseInt(document.getElementById("cardCount").value);
    const cardsDiv = document.getElementById("cards");
    cardsDiv.innerHTML = "";

    if (count === 5) cardsDiv.className = "cards-container cards-five";
    else cardsDiv.className = "cards-container";

    for (let i = 0; i < count; i++) {
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<img src="images/card-back.jpg">`;
        cardsDiv.appendChild(card);
    }

    document.getElementById("yorum").innerText = "";
}
