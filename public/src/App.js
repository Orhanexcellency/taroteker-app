import React, { useState } from "react";

export default function App() {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);

  const cards = [
    "The Fool",
    "The Magician",
    "The High Priestess",
    "The Empress",
    "The Emperor",
    "The Hierophant",
    "The Lovers",
    "The Chariot",
    "Justice",
    "The Hermit",
    "Wheel of Fortune",
    "Strength",
    "The Hanged Man",
    "Death",
    "Temperance",
    "The Devil",
    "The Tower",
    "The Star",
    "The Moon",
    "The Sun",
    "Judgement",
    "The World"
  ];

  function drawCard() {
    setLoading(true);
    setTimeout(() => {
      const random = cards[Math.floor(Math.random() * cards.length)];
      setCard(random);
      setLoading(false);
    }, 1000);
  }

  return (
    <div>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>🔮 Taroteker</h1>

      <button
        onClick={drawCard}
        style={{
          padding: "12px 26px",
          background: "#6a00ff",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontSize: "18px",
          cursor: "pointer"
        }}
      >
        Kart Çek
      </button>

      <div style={{ marginTop: "30px", fontSize: "22px" }}>
        {loading ? "Kart karılıyor..." : card ? `Kartın: ${card}` : ""}
      </div>
    </div>
  );
}
