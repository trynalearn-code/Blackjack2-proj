const chipsDisplay = document.getElementById("chips");
const dealerCardsDisplay = document.getElementById("dealerCards");
const playerCardsDisplay = document.getElementById("playerCards");
const playerScoreDisplay = document.getElementById("playerScore");

const betInput = document.getElementById("betInput");
const startButton = document.getElementById("startButton");
const hitButton = document.getElementById("hitButton");
const standButton = document.getElementById("standButton");

const message = document.getElementById("message");

let playerId = null
async function startGame() {
    const response = await fetch("http://localhost:3000/start-game", { method: "POST" })
    const data = await response.json()
    playerId = data.playerId
    chipsDisplay.textContent = data.chips
    message.textContent = "Player created. Place your bet!"
}
startButton.addEventListener("click", startGame)

async function startRound() {
    const bet = Number(betInput.value);

    const response = await fetch("/start-round", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            playerId: playerId,
            bet: bet
        })
    });

    const data = await response.json();

    console.log(data);
}