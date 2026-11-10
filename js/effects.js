
"use strict";

/* =====================================================
   RUMAH TERAKHIR
   VISUAL EFFECTS ENGINE
   No external audio required
===================================================== */

window.GameEffects = (() => {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const random = (min, max) => Math.random() * (max - min) + min;

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    let typingController = null;
    let ambientInterval = null;
    let isTransitioning = false;

    /* ================================================
       INITIALIZE EFFECT ELEMENTS
    ================================================ */

    function init() {
        if (document.getElementById("horrorEffects")) return;

        const container = document.createElement("div");
        container.id = "horrorEffects";
        container.innerHTML = `
            <div class="effect-vignette"></div>
            <div class="effect-grain"></div>
            <div class="effect-scanlines"></div>
            <div class="effect-flash"></div>
            <div class="effect-glitch"></div>
            <div class="effect-shadow"></div>
            <div class="effect-transition"></div>
            <div class="effect-jumpscare"></div>
            <div class="effect-whisper"></div>
        `;

        document.body.appendChild(container);

        injectStyles();
        startAtmosphere();
    }

    /* ================================================
       INJECT VISUAL STYLES
    ================================================ */

    function injectStyles() {
        if (document.getElementById("horrorEffectStyles")) return;

        const style = document.createElement("style");
        style.id = "horrorEffectStyles";

        style.textContent = `
            #horrorEffects {
                position: fixed;
                inset: 0;
                z-index: 9000;
                pointer-events: none;
                overflow: hidden;
            }

            .effect-vignette {
                position: absolute;
                inset: 0;
                background: radial-gradient(
                    ellipse at center,
                    transparent 35%,
                    rgba(0, 0, 0, .25) 75%,
                    rgba(0, 0, 0, .8) 100%
                );
                opacity: .85;
            }

            .effect-grain {
                position: absolute;
                inset: -50%;
                opacity: .09;
                background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E");
                animation: grainMove .2s steps(3) infinite;
            }

            .effect-scanlines {
                position: absolute;
                inset: 0;
                opacity: .08;
                background: repeating-linear-gradient(
                    to bottom,
                    transparent 0px,
                    transparent 2px,
                    rgba(0, 0, 0, .5) 3px
                );
            }

            .effect-flash {
                position: absolute;
                inset: 0;
                background: #fff;
                opacity: 0;
            }

            .effect-flash.active {
                animation: flashEffect .35s ease-out;
            }

            .effect-glitch {
                position: absolute;
                inset: 0;
                opacity: 0;
                background: rgba(130, 0, 0, .12);
            }

            .effect-glitch.active {
                animation: glitchEffect .45s steps(2);
            }

            .effect-shadow {
                position: absolute;
                inset: 0;
                opacity: 0;
                background:
                    radial-gradient(
                        ellipse at 80% 50%,
                        rgba(0, 0, 0, .95) 0%,
                        rgba(0, 0, 0, .65) 12%,
                        transparent 40%
                    );
            }

            .effect-shadow.active {
                animation: shadowAppear 3s ease-in-out;
            }

            .effect-transition {
                position: absolute;
                inset: 0;
                background: #000;
                opacity: 0;
                transition: opacity .65s ease;
            }

            .effect-transition.active {
                opacity: 1;
            }

            .effect-jumpscare {
                position: absolute;
                inset: 0;
                display: grid;
                place-items: center;
                background: #000;
                opacity: 0;
                visibility: hidden;
            }

            .effect-jumpscare.active {
                visibility: visible;
                animation: jumpscareEffect .9s ease-out;
            }

            .jumpscare-face {
                width: min(75vw, 550px);
                aspect-ratio: 1;
                border-radius: 50%;
                position: relative;
                background:
                    radial-gradient(ellipse at 35% 38%, #000 0 7%, transparent 8%),
                    radial-gradient(ellipse at 65% 38%, #000 0 7%, transparent 8%),
                    radial-gradient(ellipse at 50% 75%, #050505 0 18%, transparent 19%),
                    radial-gradient(ellipse at center, #aaa 0%, #555 35%, #090909 75%);
                filter: contrast(1.5);
                box-shadow: 0 0 100px #600;
                transform: scale(.3);
            }

            .effect-jumpscare.active .jumpscare-face {
                animation: faceZoom .9s cubic-bezier(.1, .8, .3, 1);
            }

            .effect-whisper {
                position: absolute;
                inset: 0;
                display: grid;
                place-items: center;
                opacity: 0;
                color: rgba(210, 210, 210, .8);
                font: italic 20px Georgia, serif;
                text-shadow: 0 0 12px #900;
                letter-spacing: 4px;
                text-align: center;
                padding: 30px;
            }

            .effect-whisper.active {
                animation: whisperEffect 3s ease-in-out;
            }

            .typewriter-cursor::after {
                content: "▌";
                margin-left: 3px;
                animation: cursorBlink .8s steps(2) infinite;
            }

            .dialogue-text {
                animation: dialogueAppear .4s ease;
            }

            .scene-enter {
                animation: sceneEnter .8s ease both;
            }

            .scene-exit {
                animation: sceneExit .55s ease both;
            }

            @keyframes grainMove {
                0% { transform: translate(0, 0); }
                25% { transform: translate(2%, -1%); }
                50% { transform: translate(-1%, 2%); }
                75% { transform: translate(1%, 1%); }
                100% { transform: translate(-2%, -1%); }
            }

            @keyframes flashEffect {
                0% { opacity: .8; }
                20% { opacity: .1; }
                45% { opacity: .7; }
                100% { opacity: 0; }
            }

            @keyframes glitchEffect {
                0% { opacity: 0; transform: translateX(0); }
                15% { opacity: .8; transform: translateX(-8px); }
                30% { opacity: .2; transform: translateX(10px); }
                50% { opacity: .7; transform: translateX(-4px); }
                100% { opacity: 0; transform: translateX(0); }
            }

            @keyframes shadowAppear {
                0%, 100% { opacity: 0; }
                20%, 75% { opacity: .9; }
            }

            @keyframes jumpscareEffect {
                0% { opacity: 0; }
                10%, 35% { opacity: 1; }
                100% { opacity: 0; }
            }

            @keyframes faceZoom {
                0% { transform: scale(.15) rotate(-10deg); }
                20% { transform: scale(1.2) rotate(3deg); }
                45% { transform: scale(1) rotate(-2deg); }
                100% { transform: scale(1.4); }
            }

            @keyframes whisperEffect {
                0%, 100% { opacity: 0; transform: translateY(10px); }
                20%, 75% { opacity: 1; transform: translateY(0); }
            }

            @keyframes cursorBlink {
                0%, 49% { opacity: 1; }
                50%, 100% { opacity: 0; }
            }

            @keyframes dialogueAppear {
                from { opacity: 0; transform: translateY(8px); }
                to { opacity: 1; transform: translateY(0); }
            }

            @keyframes sceneEnter {
                from { opacity: 0; transform: translateY(12px); filter: blur(5px); }
                to { opacity: 1; transform: translateY(0); filter: blur(0); }
            }

            @keyframes sceneExit {
                from { opacity: 1; filter: blur(0); }
                to { opacity: 0; filter: blur(5px); }
            }

            @media (prefers-reduced-motion: reduce) {
                .effect-grain,
                .typewriter-cursor::after {
                    animation: none !important;
                }

                * {
                    scroll-behavior: auto !important;
                }
            }
        `;

        document.head.appendChild(style);
    }

    /* ================================================
       TYPEWRITER EFFECT
    ================================================ */

    async function typeText(element, text, options = {}) {
        if (!element) return;

        if (typingController) {
            typingController.cancelled = true;
        }

        const controller = { cancelled: false };
        typingController = controller;

        const speed = options.speed ?? 28;
        const mode = options.mode ?? "narration";
        const instant = options.instant ?? false;

        element.textContent = "";
        element.classList.add("typewriter-cursor");

        if (instant || prefersReducedMotion) {
            element.textContent = text;
            element.classList.remove("typewriter-cursor");
            return;
        }

        for (let i = 0; i < text.length; i++) {
            if (controller.cancelled) return;

            element.textContent += text[i];

            let delay = speed;

            if (text[i] === "," || text[i] === "，") delay *= 3;
            if (text[i] === "." || text[i] === "?" || text[i] === "!") delay *= 5;
            if (text[i] === "\n") delay *= 5;

            if (mode === "dialogue") {
                delay = Math.max(12, delay * .65);
            }

            await sleep(delay);
        }

        element.classList.remove("typewriter-cursor");

        if (typingController === controller) {
            typingController = null;
        }
    }

    function skipTyping() {
        if (typingController) {
            typingController.cancelled = true;
            typingController = null;
        }

        document.querySelectorAll(".typewriter-cursor").forEach(element => {
            element.classList.remove("typewriter-cursor");
        });
    }

    /* ================================================
       SCREEN EFFECTS
    ================================================ */

    function triggerEffect(className, duration = 800) {
        const element = document.querySelector(`.effect-${className}`);
        if (!element) return;

        element.classList.remove("active");
        void element.offsetWidth;
        element.classList.add("active");

        setTimeout(() => {
            element.classList.remove("active");
        }, duration);
    }

    function flash(duration = 400) {
        triggerEffect("flash", duration);
    }

    function glitch(duration = 500) {
        triggerEffect("glitch", duration);
    }

    function shadow(duration = 3000) {
        triggerEffect("shadow", duration);
    }

    /* ================================================
       JUMPSCARE
    ================================================ */

    async function jumpscare(options = {}) {
        const container = document.querySelector(".effect-jumpscare");
        if (!container) return;

        const message = options.message || "";
        const duration = options.duration || 1000;

        container.innerHTML = `
            <div class="jumpscare-face"></div>
        `;

        container.classList.remove("active");
        void container.offsetWidth;
        container.classList.add("active");

        if (message) {
            whisper(message, Math.min(duration, 2500));
        }

        await sleep(duration);

        container.classList.remove("active");
        container.innerHTML = "";
    }

    /* ================================================
       WHISPER TEXT
    ================================================ */

    async function whisper(message, duration = 3000) {
        const element = document.querySelector(".effect-whisper");
        if (!element) return;

        element.textContent = message;
        element.classList.remove("active");
        void element.offsetWidth;
        element.classList.add("active");

        await sleep(duration);

        element.classList.remove("active");
        element.textContent = "";
    }

    /* ================================================
       SCENE TRANSITIONS
    ================================================ */

    async function transition(callback) {
        if (isTransitioning) return;

        isTransitioning = true;

        const overlay = document.querySelector(".effect-transition");

        if (overlay) {
            overlay.classList.add("active");
        }

        await sleep(650);

        if (typeof callback === "function") {
            await callback();
        }

        await sleep(250);

        if (overlay) {
            overlay.classList.remove("active");
        }

        isTransitioning = false;
    }

    function animateScene(element) {
        if (!element) return;

        element.classList.remove("scene-enter");
        void element.offsetWidth;
        element.classList.add("scene-enter");
    }

    /* ================================================
       ATMOSPHERE
    ================================================ */

    function startAtmosphere() {
        stopAtmosphere();

        if (prefersReducedMotion) return;

        ambientInterval = setInterval(() => {
            const chance = Math.random();

            if (chance < .08) {
                glitch(350);
            } else if (chance < .14) {
                flash(250);
            }
        }, 9000);
    }

    function stopAtmosphere() {
        if (ambientInterval) {
            clearInterval(ambientInterval);
            ambientInterval = null;
        }
    }

    /* ================================================
       STORY-BASED EFFECTS
    ================================================ */

    function playSceneEffect(effect) {
        switch (effect) {
            case "flicker":
                flash();
                glitch();
                break;

            case "shadow":
                shadow();
                break;

            case "glitch":
                glitch();
                break;

            case "jumpscare":
                jumpscare();
                break;

            case "whisper":
                whisper("Aku tahu kau ada di sana...");
                break;

            case "darkness":
                transition();
                break;

            default:
                break;
        }
    }

    /* ================================================
       CLEANUP
    ================================================ */

    function destroy() {
        skipTyping();
        stopAtmosphere();

        const container = document.getElementById("horrorEffects");
        if (container) container.remove();

        const styles = document.getElementById("horrorEffectStyles");
        if (styles) styles.remove();
    }

    /* ================================================
       PUBLIC API
    ================================================ */

    return {
        init,
        sleep,
        typeText,
        skipTyping,
        flash,
        glitch,
        shadow,
        jumpscare,
        whisper,
        transition,
        animateScene,
        startAtmosphere,
        stopAtmosphere,
        playSceneEffect,
        destroy
    };
})();

/* =====================================================
   AUTO INITIALIZATION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    window.GameEffects.init();
});
