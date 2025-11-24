const chatBox = document.getElementById('chatBox');
const dreamInput = document.getElementById('dreamInput');
const dreamSend = document.getElementById('dreamSend');

dreamSend.addEventListener('click', sendDream);
dreamInput.addEventListener('keyup', (e)=> { if(e.key === 'Enter') sendDream(); });

async function sendDream(){
  const text = dreamInput.value.trim();
  if(!text) return;
  appendUser(text);
  dreamInput.value = '';
  appendAi("Rüyanızı analiz ediyorum...");
  // if API key present, call OpenAI (use same OPENAI_API_KEY as in script.js if set)
  if(typeof OPENAI_API_KEY !== 'undefined' && OPENAI_API_KEY && OPENAI_API_KEY.startsWith('sk-')){
    try{
      const prompt = `Kullanıcının rüyası: ${text}\nRüya yorumu, sezgisel ve hikaye tarzında 3 paragraf halinde ver.`;
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method:"POST",
        headers: {"Content-Type":"application/json","Authorization":`Bearer ${OPENAI_API_KEY}`},
        body: JSON.stringify({ model:"gpt-4o-mini", messages:[{role:"user",content:prompt}], max_tokens:500, temperature:0.8 })
      });
      const data = await res.json();
      const out = data.choices?.[0]?.message?.content || "Yorum getirilemedi.";
      replaceLastAi(out);
      return;
    }catch(e){
      console.warn(e);
      replaceLastAi("API çağrısı başarısız, offline cevap gösteriliyor.");
    }
  }
  // offline fallback
  setTimeout(()=> replaceLastAi("Rüyanızda güçlü bir dönüşüm mesajı var. Yakında karar vermeniz gereken bir süreç açılacak; sezgilerinize güvenin."), 800);
}

function appendUser(txt){ const d = document.createElement('div'); d.className='chat-row'; d.innerHTML = `<div class="user-bubble">${txt}</div>`; chatBox.appendChild(d); chatBox.scrollTop = chatBox.scrollHeight; }
function appendAi(txt){ const d = document.createElement('div'); d.className='chat-row'; d.innerHTML = `<div class="ai-bubble">${txt}</div>`; chatBox.appendChild(d); chatBox.scrollTop = chatBox.scrollHeight; }
function replaceLastAi(txt){ const items = chatBox.querySelectorAll('.ai-bubble'); if(items.length===0) return appendAi(txt); items[items.length-1].innerText = txt; chatBox.scrollTop = chatBox.scrollHeight; }
