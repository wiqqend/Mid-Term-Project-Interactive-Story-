
// element references
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

// variables
let currentScene = "town_entrance";
let hasRealCode  = false;   // found real safe combo upstairs
let hasFakeCode  = false;   // bought fake combo from the shady guy
let inventory    = [];
let credits      = 500;
let health       = 100;

const REAL_CODE  = "7421";  // the actual vault combination
const FAKE_CODE  = "1234";  // the combination sold by the shady guy


//  SCENE DATA (null = no button)
const scenes = {

    // TOWN ENTRANCE
    town_entrance: {
        texts: [
            "You drift into town, neon signs flickering above dusty wood walls.",
            "Wanted posters glitch in the wind. Your laser revolver at your hip.",
            "The town is infront, Where do you head?"
        ],
        image:   "townentrance.png",
        tooltip: "Neon Rust, Population: 347",
        north:   "Go to the Bank",
        south:   "Go to the Saloon",
        east:    "Ride Past the Town",
        back:    null
    },

    bank: {
        texts: [
            "The bank hums of machines and old coin sorters.",
            "A teller counts quantum chips behind the counter.",
            "A small crater near the safe."
        ],
        image:   "Bank1.png",
        tooltip: "Bank of Neon Rust",
        north:   "Talk to the Teller",
        south:   null,
        east:    null,
        back:    "Leave the Bank"
    },
    talk_teller: {
        texts: [
            "'What you need, stranger?' the teller asks.",
            "Behind her, the safe is made of thick steel with a 4-digit combination lock.",
            "Deposit your credits citizen... or make this more interesting."
        ],
        image:   "Bank1.png",
        tooltip: "The Safe, one wrong move...",
        north:   "Deposit Some Cash",
        south:   "Hold the Teller Hostage",
        east:    null,
        back:    "Step Back"
    },
    bank_hostage: {
        texts: [
            "You draw your laser revolver. 'Everyone on the floor NOW!'",
            "",  // filled in by go to scene function
            "Enter the 4-digit vault combination and crack the safe."
        ],
        image:   "bank2.jpg",
        tooltip: "The safe. This is your one shot",
        north:   null,
        south:   null,
        east:    null,
        back:    "Abort the Robbery",
        showSafe: true
    },  
    saloon: {
        texts: [
            "The Saloon reeks of whiskey and old leather.",
            "A piano plays in the corner. A shady figure nurses a drink and watches you.",
            "What do you do?"
        ],
        image:   "saloon1.png",
        tooltip: "The Dusty Saloon",
        north:   "Get a Drink",
        south:   "Talk to the Guy in the Corner",
        east:    "Investigate a Noise Upstairs",
        back:    "Head Back Outside"
    },

    corner_guy: {
        texts: [
            "The figure leans close. Augmented eye looking at you",
            "'I know the bank vault combination,' he rasps. 'Two hundred and it's yours.'",
            "Do you trust him?"
        ],
        image:   "saloon1.png",
        tooltip: "Shady Character, He knows something",
        north:   "Give Him 200 Credits",
        south:   "Run Away",
        east:    null,
        back:    "Back to the Bar"
    },

    after_fake_code: {
        texts: [
            "He takes your credits and slides a scrap of paper across the bar: 1-2-3-4.",
            "'Trust me, pardner,' he winks.",
            "What now?"
        ],
        image:   "saloon1.png",
        tooltip: "That code looks familiar...",
        north:   "Head to the Bank",
        south:   "Ask Him About the Code Again",
        east:    null,
        back:    "Back to the Bar"
    },




}
