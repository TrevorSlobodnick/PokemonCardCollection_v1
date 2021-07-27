'use strict'

let body = document.getElementById("body");
let loadingScreen = document.getElementById("loadingPopup");
let loadingGif = document.getElementById("loadingGif");
let loadingText = document.getElementById("loadingText");

function closeLoadingScreen(){
    loadingScreen.style.minHeight = "0px";
    loadingScreen.style.maxHeight = "0px";
    body.style.overflow = "auto";
    loadingGif.style.opacity = "0";
    loadingText.style.opacity = "0";
}

function openLoadingScreen(){
    loadingGif.style.opacity = "1";
    loadingText.style.opacity = "1";
    body.style.overflow = "hidden";
    loadingScreen.style.minHeight = "100vh";
    loadingScreen.style.maxHeight = "100vh";
}