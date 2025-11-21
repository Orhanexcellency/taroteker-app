// === API KEY BURAYA YAZILACAK ===
const OPENAI_API_KEY = "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";

// Kart listesi
const tarotCards = [
    "fool", "magician", "highpriestess", "empress", "emperor", "hierophant",
    "lovers", "chariot", "strength", "hermit", "wheel", "justice", "hangedman",
    "death", "temperance", "devil", "tower", "star", "moon", "sun",
    "judgement", "world"
];

let selectedCount = 0;
let selectedCards = [];

function startReading(count) {
    selectedCount = count;
    selectedCards = [];
    document.getElementById("readingText").style.display = "none";

    const container = document.getElementById("cardContainer");
    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("tarot-card");

        const img = document.createElement("img");

        const random = tarotCards[Math.floor(Math.random() * tarotCards.length)];
        img.src = `images/${random}.jpg`;
        img.dataset.name = random;

        cardDiv.appendChild(img);

        cardDiv.onclick = () => flipCard(cardDiv, img);

        container.appendChild(cardDiv);
    }
}

function flipCard(cardDiv, img) {
    document.getElementById("cardSound").play();

    img.style.display = "block";
    cardDiv.style.background = "none";

    selectedCards.push(img.dataset.name);

    if (selectedCards.length === selectedCount) {
        // tüm kartlar seçildi
    }
}

async function generateReading() {
    if (selectedCards.length === 0) {
        alert("Kart seçmelisin!");
        return;
    }

    const question = document.getElementById("userQuestion").value || "genel hayat yorumu";

    const prompt = `
Sen usta bir falcısın. 
Aşağıdaki tarot kartlarını kullanarak hikaye tarzında detaylı bir tarot yorumu yap:
Kartlar: ${selectedCards.join(", ")}
Kullanıcının sorusu: "${question}"

Yorumun:
- akıcı bir hikaye gibi olsun
- detaylı psikolojik analiz içer
- spiritüel ve sezgisel bir dil kullansın
- 3 paragraf olsun
    `;

    const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4.1-mini",
            input: prompt
        })
    });

    const data = await response.json();

    const text = data.output_text || "Yorum getirilemedi.";

    const readingBox = document.getElementById("readingText");
    readingBox.innerHTML = text.replace(/\n/g, "<br><br>");
    readingBox.style.display = "block";
}
