const mainMenuSection = document.querySelector(".main-menu");
const playButton = document.querySelector(".play-button");
const categorySection = document.querySelector(".category");
const backButton = document.querySelector(".back-button");
const playArea = document.querySelector(".play-area");
const categoryOption = document.querySelectorAll(".category-option");
const movies = categoryOption[0];
const playAreaSection = document.querySelector(".play-area");
const menuIcon = document.querySelector(".menu-icon");
const inGameMenu = document.querySelector(".in-game-menu");
const inGameMenuOption = document.querySelectorAll(".in-game-menu-option");
const gameOverMenu = document.querySelector(".game-over-menu");
const resume = document.querySelector(".continue");
const newGame = document.querySelectorAll(".new-game");
const newCategory = document.querySelectorAll(".new-category");
const letters = document.querySelectorAll(".letters");
const hintRow1= document.querySelector(".hint-row1");
const hintRow2= document.querySelector(".hint-row2");
const playAreaTitle = document.querySelector(".play-area-title");
const healthMeter = document.querySelector(".inner-health");



//fetching JSON file and the finishing part of this is at the of JS
document.addEventListener("DOMContentLoaded", function () {
    // Fetch data
    fetch('./data.json')
        .then((response) => response.json())
        .then((json) => {
           
            let data= json;
            
let magicWord =null;        
let currentCategory;
let  health =8;
let spaceLocation = 0;
let numOfSpaces =0;
let clickedLetterArr =[];


function reset(){   //sets some of the global parameters back to original
    magicWord =null;  // we need to reset the magicWord to empty somehow to avoid issues when clicking new game or new category 
    health = 8;
    spaceLocation = 0;
     numOfSpaces =0;
     healthMeter.classList.remove("inner-health80","inner-health70","inner-health60","inner-health50","inner-health30","inner-health20","inner-health10");
     clickedLetterArr.length =0;
}



playButton.addEventListener("click", function (){
    mainMenuSection.classList.add("hidden");
    categorySection.classList.remove("hidden");
});

backButton.addEventListener("click", function (){
    categorySection.classList.add("hidden");
    mainMenuSection.classList.remove("hidden");
});

for(let i=0; i<categoryOption.length; i++){
categoryOption[i].addEventListener("click", function(){
    playAreaSection.classList.remove("hidden");
    categorySection.classList.add("hidden");
    if(i==0){
        magicWord = magicWordCreator("Movies");
        letterClick(magicWord);
    } else if (i==1){
        magicWord = magicWordCreator("TV Shows");
        letterClick(magicWord);
    } else if (i==2){
        magicWord = magicWordCreator("Countries");
        letterClick(magicWord);
    } else if (i==3){
        magicWord =magicWordCreator("Capital Cities");
        letterClick(magicWord);
    } else if (i==4){
        magicWord = magicWordCreator("Animals");
        letterClick(magicWord);
    } else if (i==5){
        // magicWordCreator("Sports");
        magicWord =magicWordCreator("Sports");
        letterClick(magicWord);
    }

})
}

menuIcon.addEventListener("click", function(){
    inGameMenu.classList.toggle("hidden");
});

resume.addEventListener("click", function(){
    inGameMenu.classList.toggle("hidden");
});

//checks and sees if menu icons are clicked in game menu and gameover menu
for (let i=0; i <newCategory.length; i++){ 
newGame[i].addEventListener("click", function(){ //newgame button
    reset();
    console.log(health + ""  +spaceLocation + " " + numOfSpaces + "health, spaceloc,numofspaces");
    inGameMenu.classList.add("hidden");
    gameOverMenu.classList.add("hidden");
    for (let i =0; i < letters.length; i++){
        letters[i].classList.add("letters")
        }
    magicWord = magicWordCreator(currentCategory);
    letterClick(magicWord);
})

//newcategory button

newCategory[i].addEventListener("click", function(){
    reset();
    console.log(health + ""  +spaceLocation + " " + numOfSpaces + "health, spaceloc,numofspaces");
    inGameMenu.classList.add("hidden");
    gameOverMenu.classList.add("hidden");
    playAreaSection.classList.add("hidden");
    categorySection.classList.remove("hidden");
    for (let i =0; i < letters.length; i++){
    letters[i].classList.add("letters") // adds clicked buttons back into being clickable
    }
})
}


//checking to see if letters are in the magicWord
function letterClick(magicWord){
    console.log(magicWord +"+++");
    for (let i=0; i < letters.length; i++){
        letters[i].addEventListener("click", function(){
            const clickedLetter = letters[i].innerHTML;
            letters[i].classList.remove("letters");
            // let numOfSpaces= 0;
            // let spaceLocation = 0;
            console.log(magicWord + "came thru");  //THIS IS BRINGING MORE THAN TWO WORDS AFTER CLICKING NEW GAME OR NEW CATEGORY
            // for(let j = 0; j <magicWord.length; j++){
            //     if (magicWord[j]===" "){
            //         numOfSpaces++;
            //         spaceLocation = j;
            //         }else{
            //             numOfSpaces =0;
            //             spaceLocation=0;
            //         }
            // }
            if(magicWord.includes(clickedLetter)){
                for(let j=0; j< magicWord.length; j++){
                    if (clickedLetter.includes(magicWord[j])){  
                        const newLetter = document.querySelectorAll(".hint p");            
                            newLetter[j].innerHTML = clickedLetter;
                            clickedLetterArr.push(clickedLetter);
                    }
                }
                youWin();
            } else{ //when letter isn't there
                health--;
                if(health ===7){
                    healthMeter.classList.add("inner-health80")
                } else if (health ===6){
                    healthMeter.classList.add("inner-health70")
                } else if (health ===5){
                    healthMeter.classList.add("inner-health60")
                } else if (health ===4){
                    healthMeter.classList.add("inner-health50")
                } else if (health ===3){
                    healthMeter.classList.add("inner-health30")
                } else if (health ===2){
                    healthMeter.classList.add("inner-health20")
                } else if (health ===1){
                    healthMeter.classList.add("inner-health10")
                }
                if (health === 0){
                    gameOverMenu.classList.remove("hidden");
                    healthMeter.classList.add("inner-health0");
                    for(let j=0; j< magicWord.length; j++){
                    if(!clickedLetterArr.includes(magicWord[j])){
                        const newLetter = document.querySelectorAll(".hint p");   //fills out the answer before ending the game       
                            newLetter[j].innerHTML = magicWord[j];
                    }
                    }
                    
                }
            }
        })

    }
    
}


//function for choosing random word from each category
function magicWordCreator(category){
    currentCategory = category;
    const heading = category.toUpperCase() //choosing heading for each category
    playAreaTitle.innerHTML = heading;
    while(hintRow1.lastElementChild){ //this resets the hints to blank before a new hint is given
        hintRow1.removeChild(hintRow1.lastElementChild) 
    }
    while(hintRow2.lastElementChild){ 
        hintRow2.removeChild(hintRow2.lastElementChild) 
    }
    magicNum = Math.floor(Math.random()*data["categories"][category].length) //choosing randomNUm
   magicWord = data["categories"][category][magicNum]["name"]; //choosing the data based on randomNum
   console.log(magicWord);
   if(!magicWord.includes(" ")){  //single line if there's no space
    for(let j = 0; j <magicWord.length; j++){
        const newLetter= document.createElement("p");
       newLetter.classList.add("hint-letter");
       hintRow1.appendChild(newLetter);
    }
   } else{    //if magic word has space and then where to put the hint spaces
   let numOfSpaces= 0;
   spaceLocation = 0;     
   for(let j = 0; j <magicWord.length; j++){    //checking for spacelocation
    if (magicWord[j]===" "){
        numOfSpaces++;
        spaceLocation = j;
    }
    }
 


    for(let j = 0; j <magicWord.length; j++){ //if there's space, we're adding everything after last space to a new line
        if (magicWord[j]===" "){
        const newSpace = document.createElement("p");
        newSpace.classList.add("hint-space");
        hintRow1.appendChild(newSpace);
    } else  {
        if(j < spaceLocation){
            const newLetter= document.createElement("p");
            newLetter.classList.add("hint-letter");
            hintRow1.appendChild(newLetter);
        } else{
            const newLetter= document.createElement("p");
            newLetter.classList.add("hint-letter");
            hintRow2.appendChild(newLetter);
        }
    }
}
 } //where the else no space condition ends here
   magicWord = magicWord.toUpperCase();
   return magicWord;
}




// using this to see where the space is on the word

// to see if you've guessed all the parts and won

function youWin(){
    let won = true;
    const letterCheck = document.querySelectorAll(".hint-letter");
    for (let i=0; i < letterCheck.length; i++){
       if (letterCheck[i].childNodes.length ==0){
        won =false;
        console.log("still empty spaces");
       }
    }
    if (won==true){
        gameOverMenu.classList.remove("hidden");
    }
}







//ending of JSON file being pulled in
})
.catch((error) => {
    console.error('Error fetching the JSON file:', error);
});


});

