async function pullCard() {
  const resultEl = document.getElementById("result");
  const apiKey = document.getElementById("apiKey").value;

  if (!apiKey) {
    resultEl.innerHTML = "⚠️ Lütfen OpenAI API Key gir.";
    return;
  }

  // Loading
  resultEl.innerHTML = `<div class="loading">🔮 Kart enerjileri okunuyor...</div>`;

  // Rastgele kart seç
  const randomIndex = Math.floor(Math.random() * tarotCards.length);
  const card = tarotCards[randomIndex];

  // Yapay zekâdan yorum iste
  const aiMessage = await askAI(card.name, card.meaning, apiKey);

  // Animasyon reset
  resultEl.classList.remove("card-animate");
  void resultEl.offsetWidth;

  // Sonuç
  resultEl.innerHTML = `
    <h2>${card.name}</h2>
    <p>${aiMessage}</p>
  `;

  resultEl.classList.add("card-animate");
}
