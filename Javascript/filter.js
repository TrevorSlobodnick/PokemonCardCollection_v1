'use strict';

let nameBtn = document.getElementById("filterByName");
let typeBtn = document.getElementById("filterByType");

let filterPopup = document.getElementById("filterPopup");

/**@type Array */
let selectedTypes = [];
/**@type Array */
let previousTypes = [];
/**@type HTMLElement */
let selectedTypesSpan;

nameBtn.addEventListener("click", openFilterPopup);
typeBtn.addEventListener("click", openFilterPopup);

function applyFilter(type, filter){
    let cardUL = document.getElementById("cardUL");
    if (cardUL != null){
        let displayedCards = cardUL.children;
        if (displayedCards.length > 0){
            let isDisplayInfo = false;
            if (cardUL.classList.contains("displayInfo")){
                isDisplayInfo = true;
            }
            let displayedCardsArr = Array.from(displayedCards);
            if (type == "Name"){
                // filter type = string
                if (filter == ""){
                    displayedCardsArr.forEach(card => {
                        if (isDisplayInfo){
                            card.style.display = "flex";
                        }
                        else{
                            card.style.display = "list-item";
                        }
                    });
                }
                else{
                    displayedCardsArr.forEach(card => {
                        if (card.cardObj.name.startsWith(filter)){
                            if (isDisplayInfo){
                                card.style.display = "flex";
                            }
                            else{
                                card.style.display = "list-item";
                            }
                        }
                        else{
                            card.style.display = "none";
                        }
                    });
                }
            }
            else if(type == "Type"){
                // filter type = array
                if (filter.length == 0){
                    displayedCardsArr.forEach(card => {
                        if (isDisplayInfo){
                            card.style.display = "flex";
                        }
                        else{
                            card.style.display = "list-item";
                        }
                    });
                }
                else{
                    let hasType;
                    displayedCardsArr.forEach(card => {
                        hasType = false;
                        filter.forEach(type => {
                            if (card.cardObj.type.includes(type)){
                                if (isDisplayInfo){
                                    card.style.display = "flex";
                                }
                                else{
                                    card.style.display = "list-item";
                                }
                                hasType = true;
                            }
                        });
                        if (!hasType){
                            card.style.display = "none";
                        }
                    });
                }
            }
        }
    }
}

function fillFilterPopup_Name(){
    removeChildrenFromFilterPopup();
    filterPopup.insertAdjacentHTML("beforeend", 
    `<div id="filter">
        <input id="filterInput" type="text" name="pokemonName" placeholder="Pikachu">
    </div>
    <span id="filterDesc">Enter in the pokemons name</span>
    <div id="filterButtons">
        <button id="applyFilterBtn">Apply Filter</button>
        <button id="closeFilterPopup">Cancel</button>
    </div>`
    );
    let applyFilterBtn = document.getElementById("applyFilterBtn");
    let closeBtn = document.getElementById("closeFilterPopup");
    closeBtn.addEventListener("click", cancelFilterPopup);
    applyFilterBtn.addEventListener("click", function(){
        applyFilter("Name", document.getElementById("filterInput").value);
        closeFilterPopup();
    });
}

function fillFilterPopup_Type(){
    removeChildrenFromFilterPopup();
    filterPopup.insertAdjacentHTML("beforeend", 
    `<ul id="types">
        <li id="bug">Bug</li>
        <li id="dark">Dark</li>
        <li id="dragon">Dragon</li>
        <li id="electric">Electric</li>
        <li id="energy">Energy</li>
        <li id="fairy">Fairy</li>
        <li id="fighting">Fighting</li>
        <li id="fire">Fire</li>
        <li id="flying">Flying</li>
        <li id="ghost">Ghost</li>
        <li id="grass">Grass</li>
        <li id="ground">Ground</li>
        <li id="ice">Ice</li>
        <li id="normal">Normal</li>
        <li id="poison">Poison</li>
        <li id="psychic">Psychic</li>
        <li id="rock">Rock</li>
        <li id="steel">Steel</li>
        <li id="trainer">Trainer</li>
        <li id="water">Water</li>
    </ul>
    <span id="filterDesc">Choose the types to filter by</span>
    <span id="selectedTypes"></span>
    <div id="filterButtons">
        <button id="applyFilterBtn">Apply Filter</button>
        <button id="closeFilterPopup">Cancel</button>
    </div>`
    );
    let typesUL = document.getElementById("types");
    selectedTypesSpan = document.getElementById("selectedTypes");
    let applyFilterBtn = document.getElementById("applyFilterBtn");
    let closeBtn = document.getElementById("closeFilterPopup");
    typesUL.addEventListener('click', onTypeSelected);
    closeBtn.addEventListener("click", cancelFilterPopup);
    applyFilterBtn.addEventListener("click", function(){
        previousTypes = selectedTypes.slice();
        applyFilter("Type", selectedTypes);
        closeFilterPopup();
    });
    if (selectedTypes.length > 0){
        selectedTypesSpan.innerHTML = selectedTypes.join(", ");
        selectedTypes.forEach(type => {
            document.getElementById(type.toLowerCase()).classList.add("typeSelected");
        });
    }
}

function onTypeSelected(e){
    if (e.target.tagName == "LI"){
        e.target.classList.toggle("typeSelected");
        if (selectedTypes.includes(e.target.innerHTML)){
            // If it contains the element, remove it
            selectedTypes.splice(selectedTypes.indexOf(e.target.innerHTML), 1);
        }
        else{
            // Otherwise, add it
            selectedTypes.push(e.target.innerHTML);
        }
        selectedTypes.sort();
        selectedTypesSpan.textContent = selectedTypes.join(", ");
    }
}

function openFilterPopup(e){
    if (e.target.id == "filterByName"){
        fillFilterPopup_Name();
    }
    else if (e.target.id == "filterByType"){
        fillFilterPopup_Type();
    }
    filterPopup.style.display = "flex";
    setTimeout(function(){
        filterPopup.style.opacity = "1";
        filterPopup.style.minHeight = "100vh";
        filterPopup.style.maxHeight = "100vh";
    }, 50);
}

function closeFilterPopup(){
    filterPopup.style.minHeight = "0px";
    filterPopup.style.maxHeight = "0px";
    filterPopup.style.opacity = "0";
    setTimeout(function(){
        filterPopup.style.display = "none";
    }, 600);
}

function cancelFilterPopup(e){
    selectedTypes = previousTypes.slice();
    closeFilterPopup();
}

function removeChildrenFromFilterPopup(){
    let children = filterPopup.children;
    let childrenArr = Array.from(children);
    if (childrenArr.length > 0){
        childrenArr.forEach(child => {
            filterPopup.removeChild(child);
        });
    }
}




//////////////////////////////////////////////////////////////////////////////////




let sortBox = document.getElementById("sortBy");

sortBox.addEventListener("change", sortPokemonCards);

function sortPokemonCards(e){
    let sortBy = e.target.value;
    if(document.getElementById("cardUL") != null || document.getElementById("cardUL").children.length > 0){
        let currentUl = document.getElementById("cardUL");
        switch (sortBy) {
            case "name":
                pokemonCardCollection.sort(function(a, b){
                    return a.name.localeCompare(b.name);
                });
                break;
            case "type":
                pokemonCardCollection.sort(function(a, b){
                    return a.type.localeCompare(b.type);
                });
                break;
            case "hp":
                pokemonCardCollection.sort(function(a, b){
                    return b.hp - a.hp;
                });
                break;
            case "series":
                pokemonCardCollection.sort(function(a, b){
                    return a.series.localeCompare(b.series);
                });
                break;
            case "set":
                pokemonCardCollection.sort(function(a, b){
                    return a.set.localeCompare(b.set);
                });
                break;
            case "date_new":
                pokemonCardCollection.sort(function(a, b){
                    return b.id - a.id;
                });
                break;
            case "date_old":
                pokemonCardCollection.sort(function(a, b){
                    return a.id - b.id;
                });
                break;
            default:
                break;
        }
        openLoadingScreen();
        setTimeout(function(){
            removeCardsFromDisplay(currentUl);
            if (document.getElementById("displayCardPref").classList.contains("selected")){
                renderNextHundred_Card(document.getElementById("cardUL"));
            }
            else{
                renderNextHundred_Info(document.getElementById("cardUL"));
            }
        }, 1000);
    }
}

function removeCardsFromDisplay(ul){
    let ulChildrenArr = Array.from(ul.children);
    ulChildrenArr.forEach(child => {
        ul.removeChild(child);
    });
}




//////////////////////////////////////////////////////////////////////////////////




let displayCardPref = document.getElementById("displayCardPref");
let displayInfoPref = document.getElementById("displayInfoPref");

displayCardPref.addEventListener("click", changeDisplay);
displayInfoPref.addEventListener("click", changeDisplay);

function changeDisplay(e){
    if (!e.target.classList.contains("selected")){
        let cardUL = document.getElementById("cardUL");
        displayCardPref.classList.toggle("selected");
        displayInfoPref.classList.toggle("selected");
        if (e.target.id == "displayCardPref"){
            openLoadingScreen();
            cardUL.classList.add("displayCard");
            cardUL.classList.remove("displayInfo");
            setTimeout(function(){
                if (cardUL != null){
                    removeCardsFromDisplay(cardUL);
                    renderNextHundred_Card(cardUL);
                }
                closeLoadingScreen();
            }, 1000);
        }
        else if(e.target.id == "displayInfoPref"){
            openLoadingScreen();
            cardUL.classList.add("displayInfo");
            cardUL.classList.remove("displayCard");
            setTimeout(function(){
                if (cardUL != null){
                    removeCardsFromDisplay(cardUL);
                    renderNextHundred_Info(cardUL);
                }
                closeLoadingScreen();
            }, 1000);
        }
    }
}