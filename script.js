// 🔮 Tarot Card Database (Major Arcana Only – 22 Cards)
const tarotCards = [
  { name: "The Fool", meaning: "Yeni başlangıçlar, risk alma, özgürlük." },
  { name: "The Magician", meaning: "Güç, odaklanma, yaratma enerjisi." },
  { name: "The High Priestess", meaning: "Sezgi, sırlar, içsel bilgi." },
  { name: "The Empress", meaning: "Bolluk, doğurganlık, sıcaklık." },
  { name: "The Emperor", meaning: "Kontrol, güç, otorite." },
  { name: "The Hierophant", meaning: "Gelenek, düzen, inanç." },
  { name: "The Lovers", meaning: "Aşk, uyum, kader." },
  { name: "The Chariot", meaning: "Zafer, kararlılık, hız." },
  { name: "Strength", meaning: "Sabır, güç, cesaret." },
  { name: "The Hermit", meaning: "Arayış, yalnızlık, bilgelik." },
  { name: "Wheel of Fortune", meaning: "Kadersel dönüşüm, şans." },
  { name: "Justice", meaning: "Adalet, doğruluk, hesaplaşma." },
  { name: "The Hanged Man", meaning: "Bekleme, farkındalık, teslimiyet." },
  { name: "Death", meaning: "Bitişler, dönüşüm, yeniden doğuş." },
  { name: "Temperance", meaning: "Denge, sabır, uyum." },
  { name: "The Devil", meaning: "Bağımlılık, tutku, gölge yön." },
  { name: "The Tower", meaning: "Ani değişim, sarsıntı, özgürleşme." },
  { name: "The Star", meaning: "Umut, şifa, rehberlik." },
  { name: "The Moon", meaning: "Korkular, bilinçaltı, sis." },
  { name: "The Sun", meaning: "Mutluluk, başarı, aydınlık." },
  { name: "Judgement", meaning: "Uyanış, karar, farkındalık." },
  { name: "The World", meaning: "Tamamlanma, bütünlük, başarı." }
];

// 🎴 Random card pull function
function pullCard() {
  const randomIndex = Math.floor(Math.random() * tarotCards.length);
  const card = tarotCards[randomIndex];

  document.getElementById("result").innerHTML = `
    <h2>${card.name}</h2>
    <p>${card.meaning}</p>
  `;
}
