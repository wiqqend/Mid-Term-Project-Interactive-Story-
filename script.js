
// Element references
const paragraph1 = document.getElementById("paragraph1");
const paragraph2 = document.getElementById("paragraph2");
const paragraph3 = document.getElementById("paragraph3");

const northButton = document.getElementById("northbutton");
const southButton = document.getElementById("southbutton");
const eastButton = document.getElementById("eastbutton");
const backButton = document.getElementById("backbutton");
const mainImage = document.getElementById("mainimage");
const safeInput = document.getElementById("safeinput");

// State variables
let hasCode = false;
let inventory = [];

// Functions
function updateStory(text1, text2, text3) {
    paragraph1.textContent = text1;
    paragraph2.textContent = text2;
    paragraph3.textContent = text3;
}

function changeImage(src) {
    mainImage.src = src;
}   

function checkSafe() {
    if (safeInput.value === "1234") {
        updateStory("The safe opens", "Inside you find some cash", "You add the cash to your inventory.");
        inventory.push("1000$");
        
    } else {
        updateStory("The safe is locked.", "Maybe you need to find a  code?");
    }}

// Event listeners

