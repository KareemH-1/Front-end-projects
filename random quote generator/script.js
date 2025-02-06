const quotes = [
    "I learned that courage was not the absence of fear, but the triumph over it. The brave man is not he who does not feel afraid, but he who conquers that fear.",
    "If you believe it will work, you'll see opportunities. If you believe it won't, you will see obstacles.",
    "I didn't get there by wishing for it or hoping for it, but by working for it.I didn't get there by wishing for it or hoping for it, but by working for it.",
    "Be yourself; everyone else is already taken.",
    "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
    "So many books, so little time.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "In three words I can sum up everything I've learned about life: it goes on.",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    "The only impossible journey is the one you never begin.",
    "Life is what happens when you're busy making other plans.",
    "Get busy living or get busy dying.",
    "You only live once, but if you do it right, once is enough.",
    "It does not matter how slowly you go as long as you do not stop.",
    "You miss 100% of the shots you don't take.",
    "The way to get started is to quit talking and begin doing.",
    "Don't wait. The time will never be just right.",
    "Life isn't about waiting for the storm to pass, it's about learning to dance in the rain.",
    "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    "Life is 10% what happens to us and 90% how we react to it.",
    "The best way to predict the future is to create it.",
    "You must be the change you wish to see in the world."
];

const usedIndexes = new Set(); //to go through all the array elements without repeating until they are all generated
const quoteElem = document.getElementById("quote");
function genQuote(){
    
        if (usedIndexes.size === quotes.length){
            usedIndexes.clear();
        }

    while(true){   
        const randomIndex = Math.floor(Math.random() * quotes.length);
            if(usedIndexes.has(randomIndex)){
                continue;
            }
        
        
        quoteElem.innerHTML = quotes[randomIndex];
        usedIndexes.add(randomIndex);
        break;
    }
}