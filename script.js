window.onload = function(){
    pickPlayerCard();
    resetGame();
    pass();
}

window.onpageshow = function () {
    pickDealerCard();
}

class Card {
    num = "";
    suit = "";
    value = 0;
    img = "";

    constructor(num, suit, img){
        this.num = num;
        this.suit = suit;
        this.img = img;
    }

    setValue(num){
        switch(num){
            case "ace":
                this.value = 1;
                break;
            case "2":
                this.value = 2;
                break;
            case "3":
                this.value = 3;
                break;
            case "4":
                this.value = 4;
                break;
            case "5":
                this.value = 5;
                break;
            case "6":
                this.value = 6;
                break;
            case "7":
                this.value = 7;
                break;
            case "8":
                this.value = 8;
                break;
            case "9":
                this.value = 9;
                break;
            case "10":
                this.value = 10;
                break;
            case "jack":
                this.value = 10;
                break;
            case "queen":
                this.value = 10;
                break;
            case "king":
                this.value = 10;
                break;
            default:
                this.value = 0;
                break;
        }
    }
}


//Construcción de baraja
function createDeck() {
    let arraySuits = ["hearts","spades","diamonds","clovers"];
    let arrayNum = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];

    let arrayCards = [];
    
    for(let i=0;i<arraySuits.length;i++){
        for (let j = 0; j < arrayNum.length; j++) {
            const num = arrayNum[j];
            const suit = arraySuits[i];
            const img = "Multimedia/" + num + "_of_" + suit;
            const card = new Card(num, suit, img);
            card.setValue(num);

            arrayCards.push(card);
        }
    }

    return arrayCards;
}


//Variables control baraja y partida
let arrayCards = createDeck();
let dealerPickedCards = [];
let playerPickedCards = [];


// Carta al azar
function randomCard(array){
    let pick = Math.floor(Math.random() * array.length);
    let card = array[pick];
    array.splice(pick, 1);
    return card;
}


// Reiniciar
function reset(){
    arrayCards = createDeck();
    cardCount = 52;

    do {
        dealerPickedCards.pop();
    } while(dealerPickedCards.length > 0)

    do {
        playerPickedCards.pop();
    } while(playerPickedCards.length > 0)
}


// Manejo DOM
const dealerCard1 = document.querySelector(".dealerCard1");
const dealerCard2 = document.querySelector(".dealerCard2");
const dealerCard3 = document.querySelector(".dealerCard3");
const dealerCard4 = document.querySelector(".dealerCard4"); 
const playerCard1 = document.querySelector(".playerCard1");
const playerCard2 = document.querySelector(".playerCard2");
const playerCard3 = document.querySelector(".playerCard3");
const playerCard4 = document.querySelector(".playerCard4");

const dealerScoreboard = document.querySelector(".dealerPoints");
const playerScoreboard = document.querySelector(".playerPoints")

const playerButton = document.querySelector(".cardForPlayer");
const resetButton = document.querySelector(".reset");
const passButton = document.querySelector(".pass");
const result = document.querySelector(".result");


// Carta para el dealer
function pickDealerCard(){
    let card = randomCard(arrayCards);
    
    if(dealerCard1.style.backgroundImage===""){
        dealerPickedCards.push(card);
        dealerCard1.style.backgroundImage = "url(" + card.img + ".png)";
        checkBlackjack("Dealer", dealerPickedCards, dealerScoreboard);
    } else if(dealerCard2.style.backgroundImage===""){
        dealerPickedCards.push(card);
        dealerCard2.style.backgroundImage = "url(" + card.img + ".png)"
        checkBlackjack("Dealer", dealerPickedCards, dealerScoreboard);
    } else if(dealerCard3.style.backgroundImage===""){
        let dealerPoints = calculatePoints(dealerPickedCards);
        let playerPoints = calculatePoints(playerPickedCards);

        if(dealerPoints < 17 && playerPoints < 21){
            dealerPickedCards.push(card);
            dealerCard3.style.backgroundImage = "url(" + card.img + ".png)"
            checkBlackjack("Dealer", dealerPickedCards, dealerScoreboard);
        }
    } else if(dealerCard4.style.backgroundImage===""){
        let dealerPoints = calculatePoints(dealerPickedCards);
        let playerPoints = calculatePoints(playerPickedCards);

        if(dealerPoints < 17 && playerPoints < 21){
            dealerPickedCards.push(card);
            dealerCard4.style.backgroundImage = "url(" + card.img + ".png)"
            checkBlackjack("Dealer", dealerPickedCards, dealerScoreboard);
        }
    }
}


//Carta para el jugador
function pickPlayerCard(){
    playerButton.addEventListener('click',function () {
        let card = randomCard(arrayCards);
                
        if(playerCard1.style.backgroundImage===""){
            playerPickedCards.push(card);
            playerCard1.style.backgroundImage = "url(" + card.img + ".png)";
            checkBlackjack("You", playerPickedCards, playerScoreboard);
            setTimeout(() => {
                pickDealerCard();                
            }, 1000);
        } else if(playerCard2.style.backgroundImage===""){
            playerPickedCards.push(card);
            playerCard2.style.backgroundImage = "url(" + card.img + ".png)"
            checkBlackjack("You", playerPickedCards, playerScoreboard);
            setTimeout(() => {
                pickDealerCard();                
            }, 1000);
        } else if(playerCard3.style.backgroundImage===""){
            playerPickedCards.push(card);
            playerCard3.style.backgroundImage = "url(" + card.img + ".png)"
            checkBlackjack("You", playerPickedCards, playerScoreboard);
            setTimeout(() => {
                pickDealerCard();                
            }, 1000);
        } else {
            playerPickedCards.push(card);
            playerCard4.style.backgroundImage = "url(" + card.img + ".png)"
            checkBlackjack("You", playerPickedCards, playerScoreboard);
        }
    })
}


//Pasar
function pass() {
    passButton.addEventListener('click', function () {
        console.log("Has pasado");
        checkBlackjack("","","", true);
    })
}


// Comprobación BlackJack
function checkBlackjack(player, arrayCards, scoreboard, pass) {
    
    for (let i = 0; i < arrayCards.length; i++) {
        if(arrayCards[i].num === "ace"){
            arrayCards[i] = checkAceValue(arrayCards[i], arrayCards);
        }
    }

    points = calculatePoints(arrayCards);

    scoreboard.innerHTML = "Puntos: " + points;

    if(points > 21){
        result.innerHTML = player + " lose!"
        result.style.visibility = "visible";
        playerButton.disabled = true;
        passButton.disabled = true;
    } else if(points === 21){
        result.innerHTML = player + " win!"
        result.style.visibility = "visible";
        playerButton.disabled = true;
        passButton.disabled = true;
    }

    if(pass === true){
        let dealerPoints = calculatePoints(dealerPickedCards);
        let playerPoints = calculatePoints(playerPickedCards);

        if(dealerPoints > playerPoints){
            result.innerHTML = "Dealer win!"
            result.style.visibility = "visible";
            playerButton.disabled = true;
            passButton.disabled = true;
        } else if(dealerPoints < playerPoints){
            result.innerHTML = "You win!"
            result.style.visibility = "visible";
            playerButton.disabled = true;
            passButton.disabled = true;
        } else {
            result.innerHTML = "Game tied!"
            result.style.visibility = "visible";
            playerButton.disabled = true;
            passButton.disabled = true;
        }
    }
}


//Calcular puntos
function calculatePoints(arrayCards) {
    let points = 0;
    for (let i = 0; i < arrayCards.length; i++) {
        points += arrayCards[i].value;
    }
    return points;
}


// Doble valor del as
function checkAceValue(card, arrayCards) {
    let points = calculatePoints(arrayCards);

    if(card.value === 1 && (points + 10) <= 21){
        card.value = 11;
    } else if(card.value === 11 && points > 21){
        card.value = 1;
    }

    return card;
}


//Reiniciar el juego
function resetGame(){
    resetButton.addEventListener('click', function (){
        reset();
        dealerCard1.style.backgroundImage = "";
        dealerCard2.style.backgroundImage = "";
        dealerCard3.style.backgroundImage = "";
        dealerCard4.style.backgroundImage = "";
        playerCard1.style.backgroundImage = "";
        playerCard2.style.backgroundImage = "";
        playerCard3.style.backgroundImage = "";
        playerCard4.style.backgroundImage = "";
        dealerScoreboard.innerHTML = "Puntos: ";
        playerScoreboard.innerHTML = "Puntos: ";
        result.style.visibility = "hidden";
        playerButton.disabled = false;
        passButton.disabled = false;
        pickDealerCard();
    })
}
