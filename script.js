const cards = [
  "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
  "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
  "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
  "The Devil", "The Tower", "The Star", "The Moon", "The Sun",
  "Judgement", "The World"
];

const drawBtn = document.getElementById('draw-btn');
const cardsContainer = document.getElementById('cards-container');
const reading = document.getElementById('reading');
const flipSound = document.getElementById('flip-sound');

drawBtn.addEventListener('click', async () => {
  const birthdate = document.getElementById('birthdate').value;
  const question = document.getElementById('question').value;
  const cardCount = parseInt(document.getElementById('card-count').value);

  // Kartları temizle
  cardsContainer.innerHTML = "";
  reading.innerHTML = "";

  // Rastgele kart seçimi
  let selectedCards = [];
  while (selectedCards.length < cardCount) {
    const card = cards[Math.floor(Math.random() * cards.length)];
    if (!selectedCards.includes(card)) selectedCards.push(card);
  }

  // Kart kutuları oluştur
  selectedCards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.textContent = card;
    cardDiv.addEventListener('click', () => flipSound.play());
    cardsContainer.appendChild(cardDiv);
  });

  // Hikaye tarzı yorum oluştur (API entegrasyonu yerini alacak placeholder)
  let apiReading = `Doğum Tarihiniz: ${birthdate || 'Belirtilmedi'}<br>`;
  apiReading += `Sorunuz: ${question || 'Genel fal'}<br>`;
  apiReading += `Seçilen kartlar: ${selectedCards.join(', ')}<br>`;
  apiReading += `<p><em>Bu kartlar, evrenin enerjilerini ve ruhsal yolculuğunuzu simgeliyor. Her bir kart, size detaylı ve hikaye tadında mesajlar iletecek.</em></p>`;
  
  reading.innerHTML = apiReading;
});
