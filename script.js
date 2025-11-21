// Kart listesi
const cards = [
    { name: "Aşıklar", file: "asiklar.mp3", meaning: "Uyum, kader ortaklığı, güçlü bağlar, önemli bir seçim." },
    { name: "Kader Çarkı", file: "kader.mp3", meaning: "Dönüm noktası, ani değişim, şansın açılması." },
    { name: "Güneş", file: "gunes.mp3", meaning: "Başarı, mutluluk, netlik, temiz başlangıç." },
    { name: "Ay", file: "ay.mp3", meaning: "Belirsizlik, sezgi, gizli gerçeklerin ortaya çıkması." },
    { name: "Kule", file: "kule.mp3", meaning: "Ani sarsıntı, uyanış, zor bir gerçeğin açığa çıkması." },
    { name: "İmparator", file: "imparator.mp3", meaning: "Güç, kontrol, disiplin, sağlam duruş." },
    { name: "İmparatoriçe", file: "imparatorice.mp3", meaning: "Bolluk, üretkenlik, yenilik, doğurgan enerji." },
    { name: "Dünya", file: "dunya.mp3", meaning: "Tamamlanma, başarı, yeni döngü, yükseliş." },
    { name: "Aziz", file: "aziz.mp3", meaning: "Bilgelik, rehberlik, doğru karar, manevi destek." },
];

// Elemanları seç
const drawBtn = document.getElementById("drawBtn");
const cardContainer = document.getElementById("cardContainer");
const meaningBox = document.getElementById("meaningBox");

// Rastgele kart seçme fonksiyonu
function drawCards() {
    cardContainer.innerHTML = "";
    meaningBox.innerHTML = "";

    // 3 kart seç
    const selected = [];
    while (selected.length < 3) {
        const random = cards[Math.floor(Math.random() * cards.length)];
        if (!selected.includes(random)) selected.push(random);
    }

    selected.forEach(card => {
        // Kart kutusu oluştur
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        cardDiv.innerHTML = `
            <div class="card-title">${card.name}</div>
            <img src="images/${card.name.replace(/ /g, "_").toLowerCase()}.jpg" class="card-img">
        `;

        cardDiv.addEventListener("click", () => playSound(card.file));

        cardContainer.appendChild(cardDiv);

        // Açıklama ekle
        meaningBox.innerHTML += `
            <div class="meaning">
                <h3>${card.name}</h3>
                <p>${card.meaning}</p>
            </div>
        `;
    });
}

// Ses oynatma
function playSound(mp3File) {
    const audio = new Audio(`sound/${mp3File}`);
    audio.play();
}

drawBtn.addEventListener("click", drawCards);
