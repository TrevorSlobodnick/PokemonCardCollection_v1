'use strict'

let viewCollectionBtn = document.getElementById("viewCollectionLI");
let viewCollectionAnchor = document.getElementById("viewCollectionA");
let addCardToCollectionBtn = document.getElementById("addCardToCollectionLI");
let addCardToCollectionAnchor = document.getElementById("addCardToCollectionA");

if (addCardToCollectionBtn != null){
    addCardToCollectionBtn.addEventListener("click", actLikeButtonClick);
    addCardToCollectionBtn.addEventListener("mouseover", actLikeButtonHoverIn);
    addCardToCollectionBtn.addEventListener("mouseout", actLikeButtonHoverOut);
}
else if(viewCollectionBtn != null){
    viewCollectionBtn.addEventListener("click", actLikeButtonClick);
    viewCollectionBtn.addEventListener("mouseover", actLikeButtonHoverIn);
    viewCollectionBtn.addEventListener("mouseout", actLikeButtonHoverOut);
}

/**
 * Performs certain tasks when the mouse clicks on a given element/area
 * @param {event} e 
 */
function actLikeButtonClick(e){
    if(e.currentTarget === viewCollectionBtn){
        if (e.target.id == "viewCollectionA"){
            e.preventDefault();
        }
        window.location = "https://tslobodnick.ca/PokemonCardTracker";
    }
    else if(e.currentTarget === addCardToCollectionBtn){
        if (e.target.id == "addCardToCollectionA"){
            e.preventDefault();
        }
        window.location = "https://tslobodnick.ca/PokemonCardTracker/Add";
    }
}

/**
 * Performs certain tasks when the mouse enters a given element/area
 * @param {event} e 
 */
function actLikeButtonHoverIn(e){
    if(viewCollectionBtn != null){
        viewCollectionAnchor.style.color = "white";
        viewCollectionBtn.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))";
    }
    else if(addCardToCollectionBtn != null){
        addCardToCollectionAnchor.style.color = "white";
        addCardToCollectionBtn.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))";
    }
}

/**
 * Performs certain tasks when the mouse leaves a given element/area
 * @param {event} e 
 */
function actLikeButtonHoverOut(e){
    if(viewCollectionBtn != null){
        viewCollectionBtn.style.backgroundImage = "none, none";
        viewCollectionAnchor.style.color = "black";
    }
    else if(addCardToCollectionBtn != null){
        addCardToCollectionBtn.style.backgroundImage = "none, none";
        addCardToCollectionAnchor.style.color = "black";
    }
}