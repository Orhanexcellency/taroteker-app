// Chanstein Modu AI PullCard
const cards = [
  { name: "Kupa Ası", meaning: "Yeni başlangıçlar ve duygusal şans." },
  { name: "Sinek Üçü", meaning: "Zorluklar karşısında sabır ve dikkat." },
  { name: "Kılıç On", meaning: "Güçlü bir değişim ve dönüm noktası." },
  { name: "Tılsım Beş", meaning: "Maddi kayıp ve ders çıkarma zamanı." },
  { name: "Kupa On", meaning: "Mutluluk, tamamlanmış bir dönem." },
  { name: "Sinek Kralı", meaning: "Zihinsel açıklık ve liderlik." },
  { name: "Tılsım Kraliçesi", meaning: "Pratik düşünce ve bolluk." },
  { name: "Kılıç Yedi", meaning: "Strateji, dikkat ve gizli fırsatlar." },
  { name: "Kupa Üç", meaning: "Kutlama ve sosyal destek." },
  { name: "Kılıç Ası", meaning: "Yeni fikirler ve net kararlar." }
];

const cardSlot = document.getElementById("card-slot");
const interpretation = document.getElementById("card-interpretation");

// Chanstein modu: otomatik kart seçimi ve yorum
cardSlot.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * cards.length);
  const card = cards[randomIndex];

  // Kart gösterimi
  cardSlot.innerHTML = card.name;
  cardSlot.style.background = "#ffeaa7";
  cardSlot.style.transition = "all 0.5s";

  // Yorum AI tarzı
  setTimeout(() => {
    interpretation.innerHTML = `<b>${card.name}:</b> ${card.meaning}`;
  }, 500);
});
