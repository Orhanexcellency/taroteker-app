// Kart sesinin yüklenmesi
const flipSound = new Audio("sounds/card-flip.mp3");

// Kart listesi (sıralar düzeltildi)
const tarotCards = [
    "fool", "magician", "highpriestess", "empress", "emperor",
    "hierophant", "lovers", "chariot", "strength", "hermit",
    "wheel", "justice", "hangedman", "death", "temperance",
    "devil", "tower", "star", "moon", "sun", "judgement", "world"
];

// Rastgele kart seç
function getRandomCards(count) {
    let selected = [];
    while (selected.length < count) {
        let r = tarotCards[Math.floor(Math.random() * tarotCards.length)];
        if (!selected.includes(r)) selected.push(r);
    }
    return selected;
}

function openCards() {
    const area = document.getElementById("cardsArea");
    area.innerHTML = "";

    const chosen = getRandomCards(5);

    flipSound.play();

    // ÜST 3 KART
    let row1 = document.createElement("div");
    row1.className = "row";

    for (let i = 0; i < 3; i++) {
        let c = document.createElement("div");
        c.className = "card";
        c.innerHTML = chosen[i];
        row1.appendChild(c);
    }

    // ALT 2 KART (ORT ALAN)
    let row2 = document.createElement("div");
    row2.className = "row";

    for (let i = 3; i < 5; i++) {
        let c = document.createElement("div");
        c.className = "card";
        c.innerHTML = chosen[i];
        row2.appendChild(c);
    }

    area.appendChild(row1);
    area.appendChild(row2);
}
