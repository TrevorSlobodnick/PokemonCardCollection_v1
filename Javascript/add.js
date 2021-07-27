'use strict'

let addCardBtn = document.getElementById("addCardBtn");
let chooseCardPopup = document.getElementById("chooseCard");
let closeCardPopup = document.getElementById("bottomOfChooser");
let cardContainer = document.getElementById("cardScroller");
let selectButtons = [];

addCardBtn.addEventListener("click", collectCardData);

authorizeUser();

/**
 * Check if user is authorized to access this page (admin)
 */
function authorizeUser(){
    let password = prompt("This page is for admin user only. If you are admin, enter password, otherwise, go away");
    console.log(password);
    $.ajax({
        type: 'POST',
        url: '../PHP/validation.php',
        data: {
            password: password
        },
        datatype: 'JSON',
        success: function(message){
            if (message != "Valid"){
                window.location.replace("https://tslobodnick.ca/PokemonCardTracker/");
            }
            else{
                iqwerty.toast.toast("Success");
            }
        },
        error: function(){
            alert("Failure -- Something Went Wrong");
        },
    });
}

/**
 * Send GET request to pokemontcg API and handle data returned
 */
function collectCardData(){
    let name = document.getElementById("name").value.toLowerCase();
    let code = document.getElementById("code").value;
    let number = code.split('/')[0];
    $.ajax({
        type: 'GET',
        url: 'https://api.pokemontcg.io/v1/cards?name=' + name + '&number=' + number,
        datatype: 'JSON',
        success: function(jsonObj){
            let cards = jsonObj["cards"];
            if (cards.length == 1){
                let cardChosen = cards[0];
                let cardType = "";
                if (cardChosen.types == undefined){
                    cardType = cardChosen.supertype;
                }
                else{
                    cardType = cardChosen.types.join("/");
                }
                sendData(cardChosen.id, cardChosen.imageUrl, cardChosen.name, code, cardType, cardChosen.hp, cardChosen.rarity, cardChosen.series, cardChosen.set);
            }
            else if (cards.length == 0){
                alert("Failure -- Card Not Found");
            }
            else{
                iqwerty.toast.toast("More than 1 Card found");
                let adjacentHtml = "";
                let index = 0;
                // Creating card elements to add to card picker/chooser
                cards.forEach(element => {
                    let cardStr = `<li>
                                    <img class="card" src="${element.imageUrl}" alt="${element.set}">
                                    <button data-index="${index}" data-code="${code}" class="chooseCardBtn">Select</button>
                                   </li>`
                    adjacentHtml += cardStr;
                    index++;
                });
                addToCardPicker(adjacentHtml, cards);
                openCardPicker();
            }
        },
        error: function(){
            alert("Failure -- Could Not Add Card To Collection");
        },
    });
}

/**
 * Sends the card data to the database
 * @param {The id of the card} cardId 
 * @param {The name of the pokemon/card} name 
 * @param {The card code. In format: number/number} code 
 * @param {The card type(s) seperated by slashes} type 
 * @param {The card HP} hp 
 * @param {The card rarity} rarity 
 * @param {The card series} series 
 * @param {The card set} set 
 */
function sendData(cardId, imageUrl, name, code, type, hp, rarity, series, set){
    $.ajax({
        type: 'POST',
        url: '../PHP/add_card.php',
        data: {
            card_id: cardId,
            image_url: imageUrl,
            name: name,
            code: code,
            type: type,
            hp: hp,
            rarity: rarity,
            series: series,
            set: set
        },
        datatype: 'JSON',
        success: function(message){
            if (message == "Success"){
                document.getElementById("name").value = "";
                document.getElementById("code").value = "";
                iqwerty.toast.toast("Successfully Added " + name.toUpperCase() + " To Your Collection");
            }
            else{
                alert("Failure -- PHP Error");
            }
        },
        error: function(){
            alert("Failure -- Could Not Add Card To Collection");
        },
    });
}

closeCardPopup.addEventListener("click", closeCardPicker);

/**
 * Makes the card picker visible
 */
function openCardPicker(){
    chooseCardPopup.style.display = "flex";
}

/**
 * Makes the card picker invisible
 */
function closeCardPicker(){
    chooseCardPopup.style.display = "none";
    removeAllFromCardPicker();
}

/**
 * Adds cards to card picker so user can choose which card they meant to add
 * @param {*The cards to add, in the form an li with an image and button inside} cardsToAdd 
 * @param {*The cards to choose from @type Array} cards 
 */
function addToCardPicker(cardsToAdd, cards){
    cardContainer.insertAdjacentHTML("beforeend", cardsToAdd);
    let htmlCardColl = document.getElementsByClassName("chooseCardBtn");
    let btnArr = Array.prototype.slice.call(htmlCardColl);
    btnArr.forEach(element => {
        element.addEventListener("click", function(event) {
            selectCard(event, cards);
        });
    });
}

/**
 * Removes all cards currently inside the card chooser popup.
 * Resetting it for future use.
 */
function removeAllFromCardPicker(){
    let children = [].slice.call(cardContainer.children);
    if (children.length > 0) {
        for (let i = 0; i < children.length; i++) {
            cardContainer.removeChild(children[i]);
        }
    }
}

function selectCard(e, cards){
    let cardChosenIndex = e.target.getAttribute("data-index");
    let cardCode = e.target.getAttribute("data-code");
    let cardChosen = cards[cardChosenIndex];
    let cardType = "";
    if (cardChosen.types == undefined){
        cardType = cardChosen.supertype;
    }
    else{
        cardType = cardChosen.types.join("/");
    }
    sendData(cardChosen.id, cardChosen.imageUrl, cardChosen.name, cardCode, cardType, cardChosen.hp, cardChosen.rarity, cardChosen.series, cardChosen.set);
    closeCardPicker();
    removeAllFromCardPicker();
}