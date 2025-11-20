// Chanstein Modu - Full Dünya Harikası v2
const cards = [
  { name: "Kupa Ası", meaning: "Yeni başlangıçlar ve duygusal şans.", img: "https://i.ibb.co/0V5bC7S/kupa-asi.jpg" },
  { name: "Sinek Üçü", meaning: "Zorluklar karşısında sabır ve dikkat.", img: "https://i.ibb.co/kGBJdS6/sinek-ucu.jpg" },
  { name: "Kılıç On", meaning: "Güçlü bir değişim ve dönüm noktası.", img: "https://i.ibb.co/Mgdfw5h/kilic-on.jpg" },
  { name: "Tılsım Beş", meaning: "Maddi kayıp ve ders çıkarma zamanı.", img: "https://i.ibb.co/qN9GfQJ/tilsim-bes.jpg" },
  { name: "Kupa On", meaning: "Mutluluk, tamamlanmış bir dönem.", img: "https://i.ibb.co/LkxjQjR/kupa-on.jpg" },
  { name: "Sinek Kralı", meaning: "Zihinsel açıklık ve liderlik.", img: "https://i.ibb.co/FXY3p6b/sinek-krali.jpg" },
  { name: "Tılsım Kraliçesi", meaning: "Pratik düşünce ve bolluk.", img: "https://i.ibb.co/5k0Mzfg/tilsim-krali.jpg" },
  { name: "Kılıç Yedi", meaning: "Strateji, dikkat ve gizli fırsatlar.", img: "https://i.ibb.co/X7rKktD/kilic-yedi.jpg" },
  { name: "Kupa Üç", meaning: "Kutlama ve sosyal destek.", img: "https://i.ibb.co/d2VZ7B9/kupa-ucu.jpg" },
  { name: "Kılıç Ası", meaning: "Yeni fikirler ve net kararlar.", img: "https://i.ibb.co/GdCk8Br/kilic-asi.jpg" }
];

window.addEventListener("DOMContentLoaded", () => {
  const cardSlot = document.getElementById("card-slot");
  const interpretation = document.getElementById("card-interpretation");
  const sound = document.getElementById("card-sound");

  // Partikül efektleri
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

    // Ses çal
    sound.currentTime = 0;
    sound.play();

    // Kart açma animasyonu ve resim
    cardSlot.classList.add("flipped");
    cardSlot.style.background = `url('${card.img}') no-repeat center/cover`;
    cardSlot.innerHTML = "";

    // Yorum animasyonu
    interpretation.classList.remove("show");
    setTimeout(() => {
      interpretation.innerHTML = `<b>${card.name}:</b> ${card.meaning}`;
      interpretation.classList.add("show");
    }, 600);

    // Reset
    setTimeout(() => {
      cardSlot.classList.remove("flipped");
      cardSlot.style.background = "url('https://i.ibb.co/0Jmshvb/tarot-back.jpg') no-repeat center/cover";
      cardSlot.innerHTML = "Kart Çekmek İçin Tıkla";
      interpretation.classList.remove("show");
    }, 4000);
  });
});
