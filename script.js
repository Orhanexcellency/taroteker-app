// Chanstein Modu - Full Dünya Harikası
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

window.addEventListener("DOMContentLoaded", () => {
  const cardSlot = document.getElementById("card-slot");
  const interpretation = document.getElementById("card-interpretation");

  // Partikül efektleri oluştur
  for (let i=0; i<30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random()*100 + 'vw';
    p.style.animationDelay = Math.random()*5 + 's';
    p.style.width = p.style.height = (2 + Math.random()*4) + 'px';
    document.body.appendChild(p);
  }

  cardSlot.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    const card = cards[randomIndex];

    // Kart animasyonu
    cardSlot.classList.add("flipped");
    cardSlot.innerHTML = card.name;

    // Yorum animasyonu
    interpretation.classList.remove("show");
    setTimeout(() => {
      interpretation.innerHTML = `<b>${card.name}:</b> ${card.meaning}`;
      interpretation.classList.add("show");
    }, 600);

    // Kartı resetleme
    setTimeout(() => {
      cardSlot.classList.remove("flipped");
      cardSlot.innerHTML = "Kart Çekmek İçin Tıkla";
      interpretation.classList.remove("show");
    }, 3500);
  });
});
