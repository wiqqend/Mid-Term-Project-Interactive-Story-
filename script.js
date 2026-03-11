
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

    upstairs_hall: {
        texts: [
            "You creak up the staircase, hand resting on your revolver",
            "At the end of the hall a door flickers with pale amber light. Something shuffles behind it.",
            "Do you open it?"
        ],
        image:   "saloon1.png",   // swap to upstairs1.png 
        tooltip: "Upstairs Hall — Something is up here",
        north:   "Open the Door",
        south:   null,
        east:    null,
        back:    "Head Back Downstairs"    },

    upstairs_room: {
        texts: [
            "You ease the door open. Empty.",
            "A used bed, a flickering lamp, and a desk with a drawer left ajar.",
            "You could rent the room officially... or just search the desk now."
        ],
        image:   "saloon1.png",   // swap to upstairs1.png when you have it
        tooltip: "Empty Room, or is it?",
        north:   "Ask the Bartender for the Room (50 Credits)",
        south:   "Open the Drawer",
        east:    null,
        back:    "Back to the Hall"
    },

    ask_room: {
        texts: [
            "The bartender squints. 'Fifty credits a night. Don't make a mess.'",
            "You pay, head upstairs, and close the door behind you.",
            "Time to search that desk."
        ],
        image:   "saloon1.png",
        tooltip: "Your Room for now",
        north:   "Open the Drawer",
        south:   null,
        east:    null,
        back:    "Head Back Down"
    },

    found_real_code: {
        texts: [
            "You pull the drawer open and dig through papers.",
            "A handwritten note. 'Safe combo  7-4-2-1.  Deputy Alex Freiders'",
            "I wonder what I can use this on?"
        ],
        image:   "saloon1.png",   // swap to drawer1.png 
        tooltip: "I wonder what this is for",
        north:   "Head to the Bank",
        south:   null,
        east:    null,
        back:    "Back to the Room"
    },

    ride_past: {
        texts: [
            "You kick your stallion past the town limits.",
            "Emptyness in front of you.",
            "What do you do?"
        ],
        image:   "exit1.png",
        tooltip: "Open Road.",
        north:   "Camp for the Night",
        south:   null,
        east:    "Keep Riding",
        back:    "Ride Back to Town"
    },

    keep_riding: {
        texts: [
            "You ride through the night.",
            "You can't seem to escape this place.",
            "You ride back in."
        ],
        image:   "exit1.png",
        tooltip: "Back Again. The town pulls you in",
        north:   "Head into the Saloon",
        south:   null,
        east:    null,
        back:    null
    },


// ENDINGS DATA

    ending_robbed_teller: {
        isEnding: true,
        endingType: "bad",
        texts: [
            "You slide your chips across the counter. Filling out a deposit form",
            "CRACK... Something cold and hard hits the back of your skull.",
            "GAME OVER: Robbed and killed while depositing credits"
        ],
        image:   "Bank2.png",
        tooltip: "Ending 1, Robbed at Gunpoint"
    },

    ending_shot_safe: {
        isEnding: true,
        endingType: "bad",
        texts: [
            "The wrong code triggers a silent alarm.",
            "Three laser sights appear on your chest.",
            "GAME OVER: Deputies shot you from behind the filing cabinets."
        ],
        image:   "bank2.jpg",
        tooltip: "Ending 2. Shot at the Safe"
    },
    ending_escaped: {
        isEnding: true,
        endingType: "good",
        texts: [
            "The vault swings open. Inside: stacks of quantum credits.",
            "You fill your bag, and walk out the back.",
            "ENDING UNLOCKED: THE HEIST. You escaped Neon Rust"
        ],
        image:   "bank3.jpg",
        tooltip: "Ending 3, The Heist"
    },

    ending_drunk_robbed: {
        isEnding: true,
        endingType: "bad",
        texts: [
            "Three glasses of moonshine later...",
            "You slump against the counter and close your eyes ",
            "GAME OVER: You wake up in an alley. Credits, horse, and revolver gone. Robbed while passed out drunk."
        ],
        image:   "saloon1.png",
        tooltip: "Ending 4, Robbed While Drunk"
    },

    ending_shot_back: {
        isEnding: true,
        endingType: "bad",
        texts: [
            "You turn to leave. The shady figure watches you go.",
            "A laser bolt hits you between the shoulder blades.",
            "GAME OVER: You should never have gone back. Shot in the back."
        ],
        image:   "saloon1.png",
        tooltip: "Ending 5, Shot in the Back"
    },
    ending_bear: {
        isEnding: true,
        endingType: "bad",
        texts: [
            "You make camp in a dry ravine.",
            "A bear comes out of the darkness.",
            "GAME OVER: The last thing you hear is jaws snapping shut."
        ],
        image:   "exit1.png",
        tooltip: "Ending 6, Eaten by a Bear"
    }
};


//  FUNCTIONS

function updateStory(text1, text2, text3){
    paragraph1.textContent = text1 
    paragraph2.textContent = text2 
    paragraph3.textContent = text3 
    const area = document.querySelector(".story-text-area");
    area.style.animation = "none";
    area.style.animation = "";

}

function changeImage(src) {
    mainImage.style.opacity = "0";
    setTimeout(() => {
        mainImage.src = src;
        mainImage.style.opacity = "1";
    }, 250);
}


// add to inventory func
function addToInventory(item) {
    inventory.push(item);
    
    const emptyLi = inventoryList.querySelector(".inv-empty");
    if (emptyLi) emptyLi.remove();

    const li = document.createElement("li");
    li.textContent = " - " + item;
    li.className = "inventory-item";
    inventoryList.appendChild(li);
}

// func to add your actions to the log
function addToLog(entry) {
    const p = document.createElement("p");
    p.textContent = "› " + entry;
    p.className = "log-entry latest";
    logArea.appendChild(p);
}

function updateHealth(x) {
    health = Math.max(0, Math.min(100, health + x));
    healthSpan.textContent = health;
    healthBar.style.width = health + "%";

    if (health < 30) {
        healthBar.style.backgroundColor = "rgb(255, 0, 0)";
    } else if (health < 60) {
        healthBar.style.backgroundColor = "rgb(255, 255, 0)";
    } else {
        healthBar.style.backgroundColor = "rgb(0, 255, 0)";
    }
}

function updateCredits(x) {
    credits = Math.max(0, credits + x);
    creditsSpan.textContent = credits;
}



// Function For add/removing buttons
function showButtons(config) {
    // north
    if (config.north) {
        northButton.textContent = config.north;
        northButton.classList.remove("hidden");
    } else {
        northButton.classList.add("hidden");
    }
    // south
    if (config.south) {
        southButton.textContent = config.south;
        southButton.classList.remove("hidden");
    } else {
        southButton.classList.add("hidden");
    }
    // east
    if (config.east) {
        eastButton.textContent = config.east;
        eastButton.classList.remove("hidden");
    } else {
        eastButton.classList.add("hidden");
    }
    // back
    if (config.back) {
        backButton.textContent = config.back;
        backButton.classList.remove("hidden");
    } else if (config.showRestartBack) {
        backButton.textContent = "Play Again";
        backButton.classList.remove("hidden");
    } else {
        backButton.classList.add("hidden");
    }

    // safe input
    safeSection.style.display = config.showSafe ? "block" : "none";
    if (config.showSafe) safeInput.value = "";
}

function reviewInventory() {
    if (inventory.length === 0){
        updateStory("Your Bags are empty.",
            "You have not picked up anything.",
            "Explore to find items."
        );
    return;
    }
    let listText = "You have: ";
    for (let i = 0; i < inventory.length; i++){
        listText += inventory[i];
        if (i < inventory.length -1) listText += " - ";
    }
    updateStory(listText, "", "Press any to continue")
}


function checkSafe() {
    const entered = safeInput.value.trim();

    if (entered === "") {
        updateStory("You hesitate.", "Enter the 4-digit code.", "");
        return;
    }

    if (entered === REAL_CODE) {
        // SUCCESS 
        addToLog("Vault opened with correct code: " + entered);
        updateCredits(10000);
        addToInventory("10,000 Quantum Credits");
        updateStory(
            "KA-CHUNK.",
            "The vault door swings open.",
            "Hang on, this is actually happening..."
        );
        setTimeout(() => goToScene("ending_escaped"), 2000);

    } else {
        // WRONG CODE 
        updateHealth(-50);
        addToLog("Wrong vault code entered: " + entered);
        updateStory(
            "INVALID COMBINATION.",
            "A siren wails.",
            "You hear something behind you..."
        );
        setTimeout(() => goToScene("ending_shot_safe"), 1800);
    }
}

function goToScene(sceneName) {
    const scene = scenes[sceneName];
    if (!scene) { console.warn("Unknown scene:", sceneName); return; }

    currentScene = sceneName;

   
    if (sceneName === "bank_hostage") {
        if (hasRealCode) {
            scene.texts[1] = "You have the real combination: " + REAL_CODE;
        } else if (hasFakeCode) {
            scene.texts[1] = "You have a code you bought: " + FAKE_CODE;
        } else {
            scene.texts[1] = "You don't have the combination.";
        }
    }

   
    if (sceneName === "ask_room" && credits >= 50) {
        updateCredits(-50);
        addToLog("Paid 50 credits for a room at the saloon.");
    }

    updateStory(...scene.texts);
    changeImage(scene.image);
    tooltip.textContent = scene.tooltip;

    // Handle endings
    if (scene.isEnding) {
        showButtons({ showRestartBack: true });
        document.body.className = scene.endingType === "good" ? "ending-good" : "ending-bad";
        addToLog((scene.endingType === "good" ? "Winner" : "Dead") + " " + scene.tooltip);
        return;
    }

    // Reset body class for non-endings
    document.body.className = "";

    showButtons({
        north:    scene.north,
        south:    scene.south,
        east:     scene.east,
        back:     scene.back,
        showSafe: scene.showSafe || false
    });

    addToLog("Entered: " + sceneName.replace(/_/g, " "));
}

function resetGame() {
    currentScene = "town_entrance";
    hasRealCode  = false;
    hasFakeCode  = false;
    inventory    = [];
    credits      = 500;
    health       = 100;

    inventoryList.innerHTML = "";
    logArea.innerHTML = "";
    creditsSpan.textContent = "500";
    updateHealth(0)

    goToScene("town_entrance")
    addToLog("New game started. Welcome Back")

}

//  EVENT LISTENERS 

northButton.addEventListener("click", function() {
    if (currentScene === "town_entrance")    goToScene("bank");
    else if (currentScene === "bank")        goToScene("talk_teller");
    else if (currentScene === "talk_teller") goToScene("ending_robbed_teller");
    else if (currentScene === "saloon")      goToScene("ending_drunk_robbed");
    else if (currentScene === "corner_guy") {
        if (credits < 200) {
            updateStory("You don't have enough credits.", "You need at least 200.", "");
            return;
        }
        updateCredits(-200);
        hasFakeCode = true;
        addToInventory("Crumpled Note (Code: 1-2-3-4?)");
        addToLog("Paid 200 credits to the shady guy.");
        goToScene("after_fake_code");
    }
    else if (currentScene === "after_fake_code") goToScene("bank_hostage");
    else if (currentScene === "upstairs_hall")   goToScene("upstairs_room");
    else if (currentScene === "upstairs_room")   goToScene("ask_room");
    else if (currentScene === "ask_room")         goToScene("found_real_code");
    else if (currentScene === "found_real_code")  goToScene("bank_hostage");
    else if (currentScene === "ride_past")        goToScene("ending_bear");
    else if (currentScene === "keep_riding")      goToScene("saloon");
});

southButton.addEventListener("click", function() {
    if (currentScene === "town_entrance")    goToScene("saloon");
    else if (currentScene === "talk_teller") {
        goToScene("bank_hostage");
    }
    else if (currentScene === "saloon")       goToScene("corner_guy");
    else if (currentScene === "corner_guy")   goToScene("saloon");      // run away
    else if (currentScene === "after_fake_code") {
        addToLog("Went back to ask the corner guy again...");
        goToScene("ending_shot_back");
    }
    else if (currentScene === "upstairs_room") {
        // open the drawer without paying for the room
        hasRealCode = true;
        addToInventory("Deputy's Note (Vault Combo: 7-4-2-1)");
        addToLog("Found the vault combination in the drawer!");
        goToScene("found_real_code");
    }
});

eastButton.addEventListener("click", function() {
    if (currentScene === "town_entrance") goToScene("ride_past");
    else if (currentScene === "saloon")   goToScene("upstairs_hall");
    else if (currentScene === "ride_past") goToScene("keep_riding");
});

backButton.addEventListener("click", function() {
    if (currentScene === "game_over" || document.body.classList.contains("ending-bad") || document.body.classList.contains("ending-good")) {
        resetGame();
        return;
    }
    const backMap = {
        bank:            "town_entrance",
        talk_teller:     "bank",
        bank_hostage:    "bank",
        saloon:          "town_entrance",
        corner_guy:      "saloon",
        after_fake_code: "saloon",
        upstairs_hall:   "saloon",
        upstairs_room:   "upstairs_hall",
        ask_room:        "upstairs_room",
        found_real_code: "upstairs_room",
        ride_past:       "town_entrance",
        keep_riding:     "town_entrance"
    };
    const dest = backMap[currentScene];
    if (dest) goToScene(dest);
    else resetGame(); 
});

submitButton.addEventListener("click", function() {
    checkSafe();
});

reviewButton.addEventListener("click", function() {
    reviewInventory();
});

mainImage.addEventListener("mouseover", function() {
    tooltip.style.display = "block";
});

mainImage.addEventListener("mouseout", function() {
    tooltip.style.display = "none";
});

document.addEventListener("keydown", function(event) {
    switch (event.key) {
        case "ArrowUp":
            event.preventDefault();
            if (!northButton.classList.contains("hidden")) northButton.click();
            break;
        case "ArrowDown":
            event.preventDefault();
            if (!southButton.classList.contains("hidden")) southButton.click();
            break;
        case "ArrowRight":
            event.preventDefault();
            if (!eastButton.classList.contains("hidden")) eastButton.click();
            break;
        case "ArrowLeft":
            event.preventDefault();
            if (!backButton.classList.contains("hidden")) backButton.click();
            break;
        case "i":
        case "I":
            reviewInventory();
            break;
        case "Enter":
            if (currentScene === "bank_hostage") checkSafe();
            break;
    }
});

safeInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") checkSafe();
});


paragraph1.addEventListener("click", function() {
    if (paragraph1.textContent) {
        paragraph1.style.color = "#f0c060";
        setTimeout(function() { paragraph1.style.color = ""; }, 800);
    }
});

paragraph2.addEventListener("click", function() {
    if (paragraph2.textContent) {
        paragraph2.style.color = "#f0c060";
        setTimeout(function() { paragraph2.style.color = ""; }, 800);
    }
});

paragraph3.addEventListener("click", function() {
    if (paragraph3.textContent) {
        paragraph3.style.color = "#f0c060";
        setTimeout(function() { paragraph3.style.color = ""; }, 800);
    }
});


gameTitle.addEventListener("click", function() {
    const hints = [
        "HINT: Look upstairs at the saloon.",
        "HINT: The shady guy in the corner might not be trustworthy.",
        "HINT: You need a 4-digit code to crack the vault.",
        "HINT: Use arrow keys to navigate. Press [I] to check inventory.",
        "HINT: There are 6 different endings"
    ];
    const hint = hints[Math.floor(Math.random() * hints.length)];
    updateStory(hint, "", "(Click for another hint)");
    addToLog("Used a hint");
});

clearLogBtn.addEventListener("click", function() {
    logArea.innerHTML = "";
    addToLog("Log cleared.");
});


window.addEventListener("load", function() {
    gameTitle.style.transform = "scale(0.9)";
    gameTitle.style.opacity = "0";
    gameTitle.style.transition = "transform 0.8s ease, opacity 0.8s ease";
    setTimeout(function() {
        gameTitle.style.transform = "scale(1)";
        gameTitle.style.opacity = "1";
    }, 100);
});


//  INITIALIZE GAME

goToScene("town_entrance");
addToLog("You arrived in Neon Rust. Population: 347.");