const cards = [
  "Aşk açılımında olumlu enerji geliyor.",
  "Kariyerinde büyük bir yükseliş var.",
  "Yakında önemli bir karar vereceksin.",
  "Geçmişten biri iletişime geçecek.",
  "Evren senin için kapılar açıyor."
];

function pullCard() {
  const result = cards[Math.floor(Math.random() * cards.length)];
  document.getElementById("result").innerText = result;
}
