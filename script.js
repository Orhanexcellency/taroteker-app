// Kart listesi (sadece ses + anlam)
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

// Elementler
const drawBtn = document.getElementById("drawBtn");
const cardContainer = document.getElementById("cardContainer");
const meaningBox = document.getElementById("meaningBox");

// Kart çekme
function drawCards() {
    cardContainer.innerHTML = "";
    meaningBox.innerHTML = "";

    const selected = [];
    while (selected.length < 3) {
        const r = cards[Math.floor(Math.random() * cards.length)];
        if (!selected.includes(r)) selected.push(r);
    }

    selected.forEach(card => {
        // Kart kutusu (sadece isim)
        const div = document.createElement("div");
        div.classList.add("card");
        div.textContent = card.name;

        // Tıklayınca ses çalsın
        div.addEventListener("click", () => playSound(card.file));

        cardContainer.appendChild(div);

        // Yorum
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
    new Audio(`sound/${mp3File}`).play();
}

drawBtn.addEventListener("click", drawCards);
