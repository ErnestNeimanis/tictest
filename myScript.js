let limit = userButtons.length -2;
const gestures ={
    rock: 1,
    paper: 2,
    sizzors: 3
}


let userButtons = document.querySelector("#player").childNodes;

userButtons.forEach(function(btn){
    btn.addEventListener("mousedown",()=>{
       let playerChoice = btn.value;
       let computerChoice = randomInt(1,3)
       console.log(playerChoice, computerChoice);
       document.querySelector("#computer").innerHTML = Object.keys(gestures)[computerChoice-1];
       document.querySelector("#winner").innerHTML = winner(playerChoice,computerChoice)
    })
})

function randomInt(from, to) {
    return Math.floor(Math.random()*(to-from+1))+from;
}


   function winner(you, computer){
 
    if(you == computer){
        return "tie";
    }else if(Math.abs(you - computer) == 1){
        return Math.max(you,computer) == you ? "you win" : "computer wins";
    } else  {
        return Math.min(you,computer) == you ? "you win" : "computer wins";
    }
}


