/* ------------- CONFIG ------------- */
const OPENAI_API_KEY = "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"; // İstersen ekle, boş kalsın offline mod çalışır.

/* tarot kart havuzu */
const CARD_POOL = [
 "fool","magician","highpriestess","empress","emperor","hierophant","lovers",
 "chariot","strength","hermit","wheel","justice","hangedman","death",
 "temperance","devil","tower","star","moon","sun","judgement","world"
];

/* offline fallback */
const FALLBACK_COMMENTS = [
  "Bu kartlar önemli bir değişim sürecine girdiğini gösteriyor.",
  "Kalbindeki bir konu yakında netleşecek.",
  "Beklenmedik bir fırsat kapında olabilir.",
  "Geçmiş bir mesele çözüme kavuşacak.",
  "Duygusal dengeyi kurman her şeyi lehine çevirecek."
];

/* ELEMENTLER */
const cardsRow = document.getElementById('cardsRow');
const spreadSelect = document.getElementById('spreadSelect');
const dealBtn = document.getElementById('dealBtn');
const getCommentBtn = document.getElementById('getCommentBtn');
const readingText = document.getElementById('readingText');
const cardSound = document.getElementById('cardSound');
const aiModal = document.getElementById('aiModal');
const aiChatBtn = document.getElementById('aiChatBtn');
const aiMessages = document.getElementById('aiMessages');
const aiSend = document.getElementById('aiSend');
const aiInput = document.getElementById('aiInput');

let selectedCards = [];
let flipped = 0;

/* ---------- BURÇLARI YÜKLE ---------- */
const signs = ["KOÇ","BOĞA","İKİZLER","YENGEÇ","ASLAN","BAŞAK","TERAZİ","AKREP","YAY","OĞLAK","KOVA","BALIK"];
const hor = document.getElementById('horoscopes');

signs.forEach(s=>{
  const d = document.createElement('div');
  d.className='sign';
  d.innerHTML = `
      <img src="icons/hor_${s.toLowerCase()}.png" onerror="this.style.display='none'">
      <span>${s}</span>
  `;
  d.onclick = ()=> alert(`${s} için günlük kısa yorum: Bugün enerjin yüksek.`);
  hor.appendChild(d);
});

/* ---------- KART DAĞIT ---------- */
dealBtn.addEventListener('click',()=>{
  cardsRow.innerHTML='';
  selectedCards=[];
  flipped=0;
  
  const count = parseInt(spreadSelect.value);
  const pool = shuffle([...CARD_POOL]);

  for(let i=0;i<count;i++){
    const name = pool[i];
    const card = document.createElement('div');
    card.className='card';
    card.dataset.name = name;

    const lbl = document.createElement('div');
    lbl.className='label';
    lbl.innerText = "Tıkla aç";
    card.appendChild(lbl);

    card.onclick = async ()=>{
      if(card.classList.contains('flipped')) return;
      card.classList.add('flipped');

      lbl.innerText = prettify(name);

      try{ 
        cardSound.currentTime = 0; 
        await cardSound.play(); 
      }catch(e){}

      selectedCards.push(name);
      flipped++;
    };

    cardsRow.appendChild(card);
  }
});

/* ---------- YORUM GETİR ---------- */
getCommentBtn.addEventListener('click', async ()=>{
  if(selectedCards.length === 0){
    alert("Kart açman lazım.");
    return;
  }

  readingText.innerHTML = "Yorum hazırlanıyor...";

  const birth = document.getElementById('birth').value || "Belirtilmedi";
  const q = document.getElementById('q').value || "";

  const prompt = buildPrompt(selectedCards, birth, q);

  if(OPENAI_API_KEY.startsWith("sk-")){
    try{
      const ai = await callOpenAI(prompt);
      readingText.innerHTML = ai.replace(/\n/g,"<br><br>");
      return;
    }catch(e){}
  }

  readingText.innerHTML = FALLBACK_COMMENTS[Math.floor(Math.random()*FALLBACK_COMMENTS.length)];
});

/* ---------- AI CHAT ---------- */
aiChatBtn.addEventListener('click',()=>{
  aiModal.style.display = aiModal.style.display === 'block' ? 'none' : 'block';
});

aiSend.addEventListener('click', async ()=>{
  const text = aiInput.value.trim();
  if(!text) return;

  pushMsg(text, "user");
  aiInput.value = "";

  if(OPENAI_API_KEY.startsWith("sk-")){
    pushMsg("Yazıyorum...", "ai");
    try{
      const ai =
