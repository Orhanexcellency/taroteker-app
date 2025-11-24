const cards = [
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg",
    "images/4.jpg",
    "images/5.jpg",
    "images/6.jpg",
    "images/7.jpg",
    "images/8.jpg",
    "images/9.jpg",
    "images/10.jpg",
    "images/11.jpg",
    "images/12.jpg"
];

const container = document.getElementById("cardContainer");
const btn = document.getElementById("drawCards");

btn.addEventListener("click", () => {
    container.innerHTML = "";

    const selected = [];

    while (selected.length < 5) {
        let r = Math.floor(Math.random() * cards.length);
        if (!selected.includes(r)) selected.push(r);
    }

    selected.forEach((index) => {
        const div = document.createElement("div");
        div.className = "card";

        const img = document.createElement("img");
        img.src = cards[index];

        div.appendChild(img);

        // Flip
        setTimeout(() => {
            div.classList.add("revealed");
        }, 500);

        container.appendChild(div);
    });
});
