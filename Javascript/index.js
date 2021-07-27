'use strict'

let cardContainer = document.getElementById("collectionSection");
let imagesLoaded = 0;
let pokemonCardCollection = [];
let pokemonDictionary = new Map();
let timesCalled = 0; //How many times the image loaded function has been called, updated inside the images loaded function
const WAIT_TIME = 8; //How many seconds to wait before closing the loading page

getCardCollectionFromDB();

function getCardCollectionFromDB(){
    $.ajax({
        type: 'POST',
        url: 'PHP/get_collection.php',
        data: {
            message: "RETRIEVE_CARD_COLLECTION"
        },
        datatype: 'JSON',
        success: function(jsonData){
            pokemonCardCollection = JSON.parse(jsonData);
            displayModeCard();
        },
        error: function(){
            alert("Failure -- Could Not Retrieve Card Collection");
            closeLoadingScreen();
        },
    });
}

//      DISPLAY MODE - CARD
function displayModeCard(){
    let ul = document.createElement("ul");
    ul.classList.add("displayCard");
    ul.id = "cardUL"
    let currentCardUL = document.getElementById("cardUL");
    if (currentCardUL != null){
        // Remove Current UL...
        cardContainer.removeChild(currentCardUL);
    }
    //Add contents to Ul...
    renderNextHundred_Card(ul);
    // Add new UL...
    cardContainer.appendChild(ul);
    if (pokemonCardCollection.length > 0){
        isImagesLoadedCall();
    }
    else{
        closeLoadingScreen();
    }
}

function renderNextHundred_Card(ul){
    // TODO change so max is 100
    pokemonCardCollection.forEach(card => {
        let li = document.createElement("li");
        li.classList.add("cardLI");
        li.cardObj = card;
            let div = document.createElement("div");
            div.classList.add("cardImageWrapper");
                let image = document.createElement("img");
                image.onload = function() {
                    imagesLoadedTracker();
                };
                image.classList.add("cardImage");
                image.classList.add("lazyload");
                image.src = card.image_url;
                image.alt = card.name;

        div.appendChild(image);
        li.appendChild(div);
        ul.appendChild(li);
        if (pokemonCardCollection.length > 0){
            isImagesLoadedCall();
        }
        else{
            closeLoadingScreen();
        }
    });
    lazyload();
}


//      DISPLAY MODE - INFO
function displayModeInfo(){
    let ul = document.createElement("ul");
    ul.classList.add("displayInfo");
    ul.id = "cardUL"
    let currentCardUL = document.getElementById("cardUL");
    if (currentCardUL != null){
        // Remove Current UL...
        cardContainer.removeChild(currentCardUL);
    }
    // Add contents to Ul
    renderNextHundred_Info(ul);
    // Add new UL...
    cardContainer.appendChild(ul);
}



function renderNextHundred_Info(ul){
    // TODO change so max is 100
    pokemonCardCollection.forEach(card => {
        let li = document.createElement("li");
        li.cardObj = card;
        li.classList.add("infoLI");
            let firstDiv = document.createElement("div");
            firstDiv.classList.add("basicInfoWrapper");
                let imageDiv = document.createElement("div");
                imageDiv.classList.add("infoImageWrapper");
                    let infoImage = document.createElement("img");
                    infoImage.onload = function() {
                        imagesLoadedTracker();
                    };
                    infoImage.classList.add("infoImage");
                    infoImage.classList.add("lazyload");
                    infoImage.src = card.image_url;
                    infoImage.alt = card.name;
                let nameSpan = document.createElement("span");
                nameSpan.classList.add("infoName");
                    let nameSpanText = document.createTextNode(card.name);
            let secondDiv = document.createElement("div");
            secondDiv.classList.add("infoTypeWrapper");
                let typeSpan = document.createElement("span");
                typeSpan.classList.add("infoType");
                    let cardTypeText = card.type.replace("/", "\n");
                    let typeSpanText = document.createTextNode(cardTypeText);
            let thirdDiv = document.createElement("div");
            thirdDiv.classList.add("infoSeriesWrapper");
                let seriesSpan = document.createElement("span");
                seriesSpan.classList.add("infoSeries");
                    let seriesSpanText = document.createTextNode(card.series);
            let fourthDiv = document.createElement("div");
            fourthDiv.classList.add("infoSetWrapper");
                let setSpan = document.createElement("span");
                setSpan.classList.add("infoSet");
                    let setSpanText = document.createTextNode(card.set);
            let cardOptionsMenu = document.createElement("span");
            cardOptionsMenu.classList.add("cardOptionsMenu");
                let cardOptionsMenuText = document.createTextNode("⋮");
        // First Section
        imageDiv.appendChild(infoImage);
        nameSpan.appendChild(nameSpanText);
        firstDiv.appendChild(imageDiv);
        firstDiv.appendChild(nameSpan);
        li.appendChild(firstDiv);
        // Second Section
        typeSpan.appendChild(typeSpanText);
        secondDiv.appendChild(typeSpan)
        li.appendChild(secondDiv);
        // Third Section
        seriesSpan.appendChild(seriesSpanText);
        thirdDiv.appendChild(seriesSpan)
        li.appendChild(thirdDiv);
        // Fourth Section
        setSpan.appendChild(setSpanText);
        fourthDiv.appendChild(setSpan)
        li.appendChild(fourthDiv);
        // Last Section
        cardOptionsMenu.appendChild(cardOptionsMenuText);
        li.appendChild(cardOptionsMenu);
        // Add Li to Ul
        ul.appendChild(li);
        if (pokemonCardCollection.length > 0){
            isImagesLoadedCall();
        }
        else{
            closeLoadingScreen();
        }
    });
    lazyload();
}

function imagesLoadedTracker(){
    imagesLoaded++;
}

function isImagesLoadedCall(){
    setTimeout(isImagesLoaded, 1000);
}

function isImagesLoaded(){
    if (imagesLoaded == pokemonCardCollection.length){
        closeLoadingScreen();
        imagesLoaded = 0;
        timesCalled = 0;
    }
    else if(timesCalled >= WAIT_TIME){
        closeLoadingScreen();
        imagesLoaded = 0;
        timesCalled = 0;
    }
    else{
        timesCalled++;
        isImagesLoadedCall();
    }
}
