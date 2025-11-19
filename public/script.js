document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("fortuneForm");
    const resultBox = document.getElementById("resultBox");
    const output = document.getElementById("output");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const question = document.getElementById("question").value.trim();
        const type = document.getElementById("fortuneType").value;

        if (!question) {
            output.innerText = "Lütfen bir soru yaz.";
            resultBox.style.display = "block";
            return;
        }

        output.innerText = "Yorum hazırlanıyor...";
        resultBox.style.display = "block";

        try {
            const request = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer OPENAI_API_KEY_BURAYA"
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content: `Sen TarotEker adlı profesyonel yapay zeka fal yorumcusun. 
                            Kullanıcıdan gelen soruyu seçilen fal türüne göre derin ve etkileyici şekilde yorumla.`
                        },
                        {
                            role: "user",
                            content: `Fal türü: ${type}. Soru: ${question}`
                        }
                    ]
                })
            });

            const response = await request.json();
            output.innerText = response.choices?.[0]?.message?.content || "Hata oluştu.";

        } catch (error) {
            output.innerText = "Bağlantı hatası. API anahtarı veya sunucu kontrol edilmeli.";
        }
    });
});
