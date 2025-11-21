// ===== TAROT KART GÖRSELLERİ =====
const cardImages = {
  "The Fool": "images/fool.jpg",
  "The Magician": "images/magician.jpg",
  "The High Priestess": "images/highpriestess.jpg",
  "The Empress": "images/empress.jpg",
  "The Emperor": "images/emperor.jpg"
};

// Kullanılacak kart listesi
const tarotCards = Object.keys(cardImages);

// ===== Kart Çekme Fonksiyonu =====
function pullCard() {
  // Ses efekti çal
  const sound = document.getElementById("cardSound");
  if (sound) sound.play();

  // Rastgele kart seç
  const randomName = tarotCards[Math.floor(Math.random() * tarotCards.length)];

  // Kart alanı
  const cardsDiv = document.getElementById("cards");
  cardsDiv.innerHTML = ""; // eski kartları sil

  // Yeni kart oluştur
  const div = document.createElement("div");
  div.classList.add("card");
  div.style.backgroundImage = `url(${cardImages[randomName]})`;

  cardsDiv.appendChild(div);

  // Kart yorumu yaz
  const reading = document.getElementById("reading");
  reading.innerText = generateReading(randomName);

  // animasyon
  reading.classList.add("show");
}


// ===== YORUM MOTORU — HİKÂYE TARZI =====
function generateReading(cardName) {
  const templates = [
    `${cardName}, bugün içindeki bir kapıyı aralıyor. Uzun süredir ertelediğin bir karar artık senden cesaret bekliyor.`,
    `${cardName} sana derin bir dönüşüm enerjisi getiriyor. Evren, gözden kaçırdığın küçük bir işareti büyütüyor.`,
    `${cardName}, ruhuna fısıldayan bir mesaj taşıyor: Kendine dürüst olduğunda yol zaten görünür.`,
    `${cardName}, hayatındaki tek bir davranışın zincir etkisi yaratacağını söylüyor. Küçük adım — büyük sonuç.`,
    `${cardName} kartı, kalbinden geçen bir dileğin görünmeyen bir şekilde şekillenmekte olduğunu işaret ediyor.`,
    `${cardName}, bugün sezgilerinin olağanüstü açık olduğunu gösteriyor. İç sesini takip etmen gereken günlerden biri.`
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}
