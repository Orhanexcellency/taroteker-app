const cards = [
  {name:"Fool", img:"images/fool.jpg"},
  {name:"Magician", img:"images/magician.jpg"},
  {name:"High Priestess", img:"images/highpriestess.jpg"},
  {name:"Empress", img:"images/empress.jpg"},
  {name:"Emperor", img:"images/emperor.jpg"},
  {name:"Hierophant", img:"images/hierophant.jpg"},
  {name:"Lovers", img:"images/lovers.jpg"},
  {name:"Chariot", img:"images/chariot.jpg"},
  {name:"Strength", img:"images/strength.jpg"},
  {name:"Hermit", img:"images/hermit.jpg"},
  {name:"Wheel", img:"images/wheel.jpg"},
  {name:"Justice", img:"images/justice.jpg"},
  {name:"Hanged Man", img:"images/hangedman.jpg"},
  {name:"Death", img:"images/death.jpg"},
  {name:"Temperance", img:"images/temperance.jpg"},
  {name:"Devil", img:"images/devil.jpg"},
  {name:"Tower", img:"images/tower.jpg"},
  {name:"Star", img:"images/star.jpg"},
  {name:"Moon", img:"images/moon.jpg"},
  {name:"Sun", img:"images/sun.jpg"},
  {name:"Judgement", img:"images/judgement.jpg"},
  {name:"World", img:"images/world.jpg"}
];

let cardCount = 1;

function setCardCount(num){
  cardCount = num;
  renderCards();
}

function renderCards(){
  const container = document.getElementById('card-container');
  container.innerHTML = '';
  let selected = shuffle(cards).slice(0, cardCount);
  selected.forEach(card=>{
    let div = document.createElement('div');
    div.className='card';
    div.onclick = () => flipCard(div, card);
    container.appendChild(div);
  });
}

function flipCard(div, card){
  div.classList.add('flipped');
  div.style.backgroundImage = `url('${card.img}')`;
  document.getElementById('card-sound').play();
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Yorum üretimi (API key veya offline fallback)
async function generateComment(){
  const question = document.getElementById('question').value;
  const comment = document.getElementById('comment');

  const OPENAI_API_KEY = "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"; //
  if(OPENAI_API_KEY !== "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"){
    try{
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model:"gpt-4",
          messages:[{role:"user", content: question || "Tarot falı için hikaye tarzı yorum oluştur"}],
          max_tokens:300
        })
      });
      const data = await response.json();
      if(data.choices && data.choices[0].message){
        comment.innerText = data.choices[0].message.content;
        return;
      }
    }catch(e){
      console.log("API çağrısı başarısız, offline fallback kullanılıyor", e);
    }
  }

  // Offline fallback
  let offlineComments = [
    "Bu kartlar senin hayatında önemli bir değişimi simgeliyor.",
    "Seçtiğin kartlar, içsel gücünü ve sezgilerini güçlendirecek mesajlar taşıyor.",
    "Hayatında karşılaştığın durumlara dair ipuçları veriyor. Sabırlı ol.",
    "Bu açılım, senin duygusal ve zihinsel dengenle ilgili işaretler taşıyor.",
    "Kartlar sana rehberlik ediyor; dikkatle oku ve hislerine güven."
  ];
  let randomComment = offlineComments[Math.floor(Math.random()*offlineComments.length)];
  comment.innerText = question ? `Sorduğun soruya göre yorum: ${randomComment}` : randomComment;
}

// İlk render
renderCards();
