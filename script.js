async function pullCard() {
  const sound = new Audio("sounds/card-flip.mp3");
  sound.play();

  const cards = [
    "fool", "magician", "highpriestess", "empress", "emperor",
    "hierophant", "lovers", "chariot", "strength", "hermit",
    "wheel", "justice", "hangedman", "death", "temperance",
    "devil", "tower", "star", "moon", "sun", "judgement", "world"
  ];

  const selected = cards[Math.floor(Math.random() * cards.length)];

  document.getElementById("card-img").src = `images/${selected}.jpg`;

  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer SENIN_API_KEYIN"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "user", content: `${selected} kartının enerjisini derin, hikaye tadında, akıcı bir şekilde yorumla.` }
        ]
      })
    }
  );

  const data = await response.json();
  document.getElementById("result").innerHTML = data.choices[0].message.content;
}
