/* ========= CONFIG ========= */
// Eğer OpenAI kullanacaksan buraya koy (tarayıcıda saklamak güvenli değil — test için olabilir)
const OPENAI_API_KEY = "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"; // "sk-..." koyarsan API aktif olur, boşsa offline fallback kullanılır

/* ========= DATA ========= */
const CARD_POOL = [
 "fool","magician","highpriestess","empress","emperor","hierophant","lovers",
 "chariot","strength","hermit","wheel","justice","hangedman","death",
 "temperance","devil","tower","star","moon","sun","judgement","world"
];

const HOROS = ["KOÇ","BOĞA","İKİZLER","YENGEÇ","ASLAN","BAŞAK","TERAZİ","AKREP","YAY","OĞLAK","KOVA","BALIK"];

/* ========= UI ELEMENTS ========= */
const horContainer = document.getElementById('horoscopes');
const spreadSelect = document.getElementById('spreadSelect');
const birthInput = document.getElementById('birth');
const dealBtn = document.getElementById('dealBtn');
const cardsRow = document.getElementById('cardsRow');
const getCommentBtn = document.getElementById('getCommentBtn');
const readingText = document.getElementById('readingText');
const cardSound = document.getElementById('cardSound');

/* ========= INIT ========= */
(function init(){
  // Fill horoscopes like the image (rounded pink squares)
  HOROS.forEach(sign=>{
    const d = document.createElement('div');
    d.className = 'hor-card';
    d.innerHTML = `<img src="icons/hor_${sign.toLowerCase()}.png" alt=""><span>${sign}</span>`;
    d.onclick = ()=> alert(sign + " için kısa burç yorumu: Bugün enerjin güçlü.");
    horContainer.appendChild(d);
  });
})();

/* ========= HELPERS ========= */
function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]] } return a; }
function pretty(s){ return s.replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase()); }

/* ========= DEAL / CARD LOGIC ========= */
dealBtn.addEventListener('click', () => {
  const count = parseInt(spreadSelect.value,10);
  dealCards(count);
});

function dealCards(count){
  cardsRow.innerHTML = ""; // clear
  readingText.innerText = "Kart seçip 'Yorumu Getir' butonuna basın.";
  const pool = shuffle([...CARD_POOL]);
  const chosen = pool.slice(0,count);

  if(count === 5){
    // create grid layout with 5 cards top3 bottom2 centered
    const wrapper = document.createElement('div');
    wrapper.className = 'cards-five';
    // create 5 card elements
    chosen.forEach((name, idx) => {
      const c = makeCard(name);
      wrapper.appendChild(c);
    });
    cardsRow.appendChild(wrapper);

    // small fix: move 4th and 5th to second row center by wrapping in a flex row if needed
    // the CSS tries to place 4 in column 2; to visually center both, we'll ensure wrapper width and alignment is ok
  } else if(count === 3){
    const row = document.createElement('div'); row.className = 'card-row';
    chosen.forEach(name => row.appendChild(makeCard(name)));
    cardsRow.appendChild(row);
  } else if(count === 1){
    const row = document.createElement('div'); row.className = 'card-row';
    row.appendChild(makeCard(chosen[0]));
    cardsRow.appendChild(row);
  } else {
    // generic
    const row = document.createElement('div'); row.className = 'card-row';
    chosen.forEach(name => row.appendChild(makeCard(name)));
    cardsRow.appendChild(row);
  }

  // ensure visible
  setTimeout(()=> cardsRow.scrollIntoView({behavior:'smooth', block:'center'}), 150);
}

function makeCard(name){
  const el = document.createElement('div');
  el.className = 'card';
  el.dataset.name = name;
  // if you have actual card image: use <img src="images/{name}.jpg"> instead; but image optional
  // fallback show name label hidden until reveal
  const lbl = document.createElement('div'); lbl.className = 'label'; lbl.innerText = 'Tıkla aç';
  el.appendChild(lbl);

  el.addEventListener('click', async ()=>{
    if(el.classList.contains('revealed')) return;
    try{ cardSound.currentTime = 0; await cardSound.play(); }catch(e){}
    el.classList.add('revealed');
    lbl.innerText = pretty(name);
    // store for reading
    if(!window._selected) window._selected = [];
    window._selected.push(name);
  });

  return el;
}

/* ========= GENERATE READING ========= */
getCommentBtn.addEventListener('click', async ()=>{
  const selected = window._selected || [];
  if(selected.length === 0){ alert("Lütfen önce kart açıp üzerine tıklayınız."); return; }
  readingText.innerText = "Yorum hazırlanıyor...";

  const birth = birthInput.value || "Belirtilmedi";
  const q = document.getElementById('q').value || "";

  const prompt = `Sen usta bir tarot yorumcususun.
Doğum tarihi: ${birth}
Kartlar: ${selected.map(pretty).join(', ')}
Soru: ${q}
3 paragrafta, akıcı ve hikaye tarzında bir yorum yaz.`;

  if(OPENAI_API_KEY && OPENAI_API_KEY.startsWith("sk-")){
    try{
      const ai = await callOpenAI(prompt);
      readingText.innerHTML = ai.replace(/\n/g,'<br><br>');
      return;
    }catch(err){
      console.warn("OpenAI hatası, fallback kullanılıyor", err);
    }
  }

  // fallback offline composed result
  const p1 = `Kartlar: ${selected.map(pretty).join(', ')}. Doğum tarihin: ${birth}. Bu açılım içsel bir dönüşümü işaret ediyor.`;
  const p2 = q ? `Sorduğun soru: "${q}". Kartlar, bu konuyla ilgili sabırlı olmanı ve sezgine güvenmeni söylüyor.` : `Genel bakış: Bugünlerde küçük adımlar ve net iletişim fayda sağlayacak.`;
  const p3 = `Öneri: Nefes al, çevrendeki insanlarla dürüstçe konuş ve hislerine güven.`;
  readingText.innerHTML = `${p1}<br><br>${p2}<br><br>${p3}`;
});

/* ========= OPENAI CALL (chat completions) ========= */
async function callOpenAI(prompt){
  const url = "https://api.openai.com/v1/chat/completions";
  const body = {
    model: "gpt-4o-mini",
    messages: [{role:"user", content:prompt}],
    max_tokens: 500,
    temperature: 0.8
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify(body)
  });
  if(!res.ok) throw new Error("OpenAI error " + res.status);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || data.output_text || "Yorum üretilemedi.";
}

/* ========= NAV / OPEN SECTION ========= */
function openCoffee(){ alert("Kahve Falı demo"); }
function openHand(){ alert("El Falı demo"); }
function openTarot(){ document.getElementById('dealBtn').click(); }
function openDream(){ window.location.href = 'sohbet.html'; }
function openSection(k){ alert(k + " tıklandı (demo)."); }
