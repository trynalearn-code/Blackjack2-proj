
const nums = ["Ace",2,3,4,5,6,7,8,9,10,"Jack","Queen","King"]
const types = ["hearts", "diamonds", "spades", "clubs"]

export function drawCard(){
    const num = nums[Math.floor(Math.random()*nums.length)]
    const type = types[Math.floor(Math.random()*types.length)]

    return {
        number:num,
        suit:type}
}

export function determineValue(cards){
    let total = 0
    let aces = 0
    for (const card of cards){
    if (card.number === "King" || card.number === "Queen" || card.number ==="Jack")
        {
        total +=10
    }
    else if (card.number === "Ace"){
        total +=11
        aces +=1
    }
    else{
    total += card.number}
    }

    while (total>21 && aces>0){
        total -=10
        aces-=1
    }

    return total
}
