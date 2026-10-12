"use strict";

/* =========================================
   CINEMATIC INTRO CONTROLLER
========================================= */

const cinematicIntro = document.getElementById("cinematicIntro");
const cinematicStars = document.getElementById("cinematicStars");

const introOpening = document.getElementById("introOpening");
const openingLine = document.getElementById("openingLine");

const introNameReveal = document.getElementById("introNameReveal");
const enterLoveWebsite = document.getElementById("enterLoveWebsite");


/* Create cinematic stars */

function createCinematicStars() {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 90; i++) {
        const star = document.createElement("span");

        star.className = "cinematic-star";

        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        const size = Math.random() * 2 + 1;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        star.style.animationDuration =
            `${Math.random() * 3 + 2}s`;

        star.style.animationDelay =
            `${Math.random() * 4}s`;

        fragment.appendChild(star);
    }

    cinematicStars.appendChild(fragment);
}


/* Opening lines */

const introLines = [
    "Some people make the world more beautiful just by being in it...",

    "Some people deserve more than ordinary words can express...",

    "And sometimes, the smallest things carry the biggest feelings."
];

let currentLine = 0;
let currentCharacter = 0;

let introTypingTimer = null;
let introSequenceTimer = null;

let introFinished = false;


/* Type each cinematic line */

function typeIntroLine() {
    clearTimeout(introTypingTimer);

    if (introFinished) {
        return;
    }

    const line = introLines[currentLine];

    if (currentCharacter < line.length) {
        openingLine.textContent += line.charAt(currentCharacter);

        currentCharacter++;

        introTypingTimer = setTimeout(typeIntroLine, 55);

        return;
    }

    // Allow the viewer to read the completed sentence.
    introSequenceTimer = setTimeout(() => {

        currentLine++;
        currentCharacter = 0;

        if (currentLine < introLines.length) {
            openingLine.textContent = "";
            typeIntroLine();
        } else {
            revealAishaName();
        }

    }, 2200);
}


/* Reveal her full name */

function revealAishaName() {
    introOpening.classList.add("d-none");

    introNameReveal.classList.remove("d-none");

    introNameReveal.classList.add("reveal-animation");
}


/* Enter the main website */

enterLoveWebsite.addEventListener("click", () => {
    clearTimeout(introTypingTimer);
    clearTimeout(introSequenceTimer);

    introFinished = true;

    cinematicIntro.classList.add("intro-exit");

    // Prevent the hidden intro from blocking the website.
    setTimeout(() => {
        cinematicIntro.style.display = "none";

        document.body.classList.remove("intro-active");

        document.getElementById("home").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 1250);
});


/* Start the cinematic sequence */

function startCinematicIntro() {
    createCinematicStars();

    document.body.classList.add("intro-active");

    // Give the heart a moment to appear first.
    setTimeout(() => {
        if (!introFinished) {
            typeIntroLine();
        }
    }, 1800);
}

startCinematicIntro();

/* =========================================
   1. SELECT ELEMENTS
========================================= */

const openSurpriseButton = document.getElementById("openSurprise");
const loveLetterSection = document.getElementById("loveLetter");
const revealReasonsButton = document.getElementById("revealReasons");
const reasonsSection = document.getElementById("reasons");
const openFinalButton = document.getElementById("openFinal");
const finalSurpriseSection = document.getElementById("finalSurprise");
const restartButton = document.getElementById("restart");

const letterBody = document.getElementById("letterBody");
const heartsContainer = document.getElementById("hearts-container");

const musicButton = document.getElementById("musicButton");
const musicLabel = document.getElementById("musicLabel");


/* =========================================
   2. LOVE LETTER
========================================= */

const loveLetter = `
Sometimes, I wonder how one person can become so special
and occupy such a beautiful place in someone's heart.

Darling Aisha Kabir Shehu, I created this little world
because I wanted to do something different for you.

I may not always find the perfect words to explain how
I feel, but I hope this little surprise brings a smile
to your beautiful face.

You deserve kindness, happiness, peace, and beautiful
moments that remind you how valuable you are.

I hope that whenever you visit this little corner of
the internet, you remember that someone took the time
to create something especially for you.

No expensive gift could replace the thought and effort
behind something made from the heart.

This website is my small way of saying that you are
special, Darling Aisha, and I wanted you to have
something beautiful that carries your name.

With love, today and always. ❤️
`;


/* =========================================
   3. FLOATING HEARTS
========================================= */

function createHeart() {
    const heart = document.createElement("span");

    heart.className = "floating-heart";
    heart.textContent = Math.random() > 0.5 ? "♥" : "♡";

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${Math.random() * 18 + 12}px`;

    const duration = Math.random() * 6 + 7;

    heart.style.animationDuration = `${duration}s`;

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

setInterval(createHeart, 700);


/* =========================================
   4. SHOW A SECTION
========================================= */

function showSection(section) {
    section.classList.remove("d-none");
    section.classList.remove("reveal-animation");

    // Restart the CSS animation.
    void section.offsetWidth;

    section.classList.add("reveal-animation");

    requestAnimationFrame(() => {
        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}


/* =========================================
   5. TYPEWRITER EFFECT
========================================= */

let typingTimer = null;

function typeLoveLetter() {
    clearTimeout(typingTimer);

    letterBody.textContent = "";

    let index = 0;
    const speed = 22;

    function typeCharacter() {
        if (index >= loveLetter.length) {
            return;
        }

        letterBody.textContent += loveLetter.charAt(index);

        index++;

        typingTimer = setTimeout(typeCharacter, speed);
    }

    typeCharacter();
}


/* =========================================
   6. OPEN THE LOVE LETTER
========================================= */

openSurpriseButton.addEventListener("click", () => {
    showSection(loveLetterSection);

    typeLoveLetter();
});


/* =========================================
   7. SHOW REASONS
========================================= */

revealReasonsButton.addEventListener("click", () => {
    showSection(reasonsSection);
});


/* =========================================
   8. FINAL SURPRISE
========================================= */

openFinalButton.addEventListener("click", () => {
    showSection(finalSurpriseSection);

    // A small burst of hearts.
    for (let i = 0; i < 20; i++) {
        setTimeout(createHeart, i * 100);
    }
});


/* =========================================
   9. RESTART EXPERIENCE
========================================= */

restartButton.addEventListener("click", () => {
    clearTimeout(typingTimer);

    loveLetterSection.classList.add("d-none");
    reasonsSection.classList.add("d-none");
    finalSurpriseSection.classList.add("d-none");

    letterBody.textContent = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* =========================================
   10. OPTIONAL BACKGROUND MUSIC
========================================= */

// Create a folder named "assets" and put your
// licensed music file inside it as "love-song.mp3".
//
// Uncomment the next line to enable the player:
//
// const audio = new Audio("assets/love-song.mp3");

let audio = null;
let musicPlaying = false;

musicButton.addEventListener("click", async () => {

    if (!audio) {
        musicLabel.textContent = "Add music first";
        return;
    }

    try {
        if (musicPlaying) {
            audio.pause();

            musicPlaying = false;
            musicLabel.textContent = "Our Music";

            musicButton.classList.remove("active");

        } else {
            await audio.play();

            musicPlaying = true;
            musicLabel.textContent = "Pause Music";

            musicButton.classList.add("active");
        }

    } catch (error) {
        console.error("Music playback failed:", error);

        musicLabel.textContent = "Try Again";
    }
});


/* =========================================
   11. INITIALIZE
========================================= */

console.log("A little world for Darling Aisha is ready. ❤️");


/* =========================================
   AISHA'S SECRET LOVE GARDEN
========================================= */

const gardenStage = document.getElementById("gardenStage");
const gardenFlowers = document.getElementById("gardenFlowers");
const bloomGardenBtn = document.getElementById("bloomGardenBtn");
const gardenHint = document.getElementById("gardenHint");
const gardenSurprise = document.getElementById("gardenSurprise");
const gardenAgainBtn = document.getElementById("gardenAgainBtn");

let gardenHasBloomed = false;


/* Create floating hearts */

function createGardenHearts() {
    for (let i = 0; i < 22; i++) {
        const heart = document.createElement("span");

        heart.textContent = ["♥", "♡", "❤"][Math.floor(Math.random() * 3)];

        heart.style.position = "absolute";
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.bottom = "0";
        heart.style.zIndex = "4";
        heart.style.pointerEvents = "none";
        heart.style.color = ["#ff8eb5", "#ffd5e3", "#e8c58c"][
            Math.floor(Math.random() * 3)
        ];

        heart.style.fontSize = `${Math.random() * 18 + 12}px`;
        heart.style.opacity = "0";

        heart.animate(
            [
                {
                    transform: "translateY(0) scale(0.5)",
                    opacity: 0
                },
                {
                    opacity: 1,
                    offset: 0.2
                },
                {
                    transform: `translateY(-${200 + Math.random() * 180}px) scale(1.2)`,
                    opacity: 0
                }
            ],
            {
                duration: 2200 + Math.random() * 1800,
                delay: Math.random() * 800,
                easing: "ease-out"
            }
        );

        gardenStage.appendChild(heart);

        setTimeout(() => heart.remove(), 5000);
    }
}


/* Bloom the garden */

function bloomLoveGarden() {
    if (gardenHasBloomed) return;

    gardenHasBloomed = true;

    gardenStage.classList.add("bloomed");

    bloomGardenBtn.innerHTML =
        '<i class="bi bi-heart-fill me-2"></i>Garden in Bloom ❤️';

    gardenHint.textContent =
        "Look what happens when a little love finds its way here...";

    createGardenHearts();

    // Reveal the surprise message after the flowers bloom.
    setTimeout(() => {
        gardenSurprise.classList.add("show-surprise");

        gardenHint.textContent =
            "This little garden was created just for you, Aisha. ❤️";

        gardenSurprise.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, 1800);
}


/* Bloom button */

bloomGardenBtn.addEventListener("click", bloomLoveGarden);


/* Start again */

gardenAgainBtn.addEventListener("click", () => {
    gardenHasBloomed = false;

    gardenStage.classList.remove("bloomed");

    gardenSurprise.classList.remove("show-surprise");

    bloomGardenBtn.innerHTML =
        '<i class="bi bi-flower1 me-2"></i>Bloom My Garden';

    gardenHint.textContent =
        "A little surprise is waiting for you 🌷";

    gardenStage.querySelectorAll("span").forEach((element) => {
        if (
            element.style.position === "absolute" &&
            element.style.pointerEvents === "none"
        ) {
            element.remove();
        }
    });

    document.getElementById("loveGarden").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});