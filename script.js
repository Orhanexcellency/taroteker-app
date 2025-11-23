document.querySelectorAll(".burc-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        alert(btn.innerText + " burcu yorumu yakında eklenecek.");
    });
});

document.getElementById("openCardsBtn").addEventListener("click", () => {
    const count = document.getElementById("cardCount").value;
    const area = document.getElementById("cardsArea");

    area.innerHTML = "";

    for (let i = 0; i < count; i++) {
        const card = document.createElement("div");
        card.className = "card";
        card.innerText = (i + 1) + ". Kart";
        area.appendChild(card);
    }
});
