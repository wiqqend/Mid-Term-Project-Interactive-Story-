
// Element references
const paragraph1   = document.getElementById("paragraph1");
const paragraph2   = document.getElementById("paragraph2");
const paragraph3   = document.getElementById("paragraph3");
const mainImage    = document.getElementById("mainimage");
const tooltip      = document.getElementById("tooltip");
const gameTitle    = document.getElementById("gameTitle");

const northButton  = document.getElementById("northbutton");
const southButton  = document.getElementById("southbutton");
const eastButton   = document.getElementById("eastbutton");
const backButton   = document.getElementById("backbutton");
const submitButton = document.getElementById("submitButton");
const reviewButton = document.getElementById("reviewButton");
const clearLogBtn  = document.getElementById("clearLogBtn");

const safeInput    = document.getElementById("safeinput");
const safeSection  = document.getElementById("safeSection");
const inventoryList = document.getElementById("inventoryList");
const logArea      = document.getElementById("logArea");
const healthSpan   = document.getElementById("healthSpan");
const creditsSpan  = document.getElementById("creditsSpan");
const healthBar    = document.getElementById("healthBar");

// State variables
let currentScene = "town_entrance";
let hasRealCode  = false;   // found real safe combo upstairs
let hasFakeCode  = false;   // bought fake combo from the shady guy
let inventory    = [];
let credits      = 500;
let health       = 100;

const REAL_CODE  = "7421";  // the actual vault combination
const FAKE_CODE  = "1234";  // the combination sold by the shady guy

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


