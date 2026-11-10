"use strict";

/* =====================================================
   RUMAH TERAKHIR
   MAIN GAME CONTROLLER
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const Story = window.GameStory;
  const Effects = window.GameEffects;

  if (!Story || !Story.scenes) {
    console.error("GameStory tidak ditemukan. Periksa story.js.");
    return;
  }

  if (!Effects) {
    console.error("GameEffects tidak ditemukan. Periksa effects.js.");
    return;
  }

  /* ================================================
       DOM ELEMENTS
    ================================================ */

  const $ = (id) => document.getElementById(id);

  const ui = {
    mainMenu: $("mainMenu"),
    gameScreen: $("gameScreen"),
    sceneBackground: $("sceneBackground"),
    sceneLighting: $("sceneLighting"),
    sceneOverlay: $("sceneOverlay"),
    locationName: $("locationName"),
    gameTime: $("gameTime"),
    healthBar: $("healthBar"),
    sanityBar: $("sanityBar"),
    narrationText: $("narrationText"),
    typingIndicator: $("typingIndicator"),
    dialogueBox: $("dialogueBox"),
    characterName: $("characterName"),
    dialogueText: $("dialogueText"),
    interactionOptions: $("interactionOptions"),
    inventoryButton: $("inventoryButton"),
    journalButton: $("journalButton"),
    mapButton: $("mapButton"),
    menuButton: $("menuButton"),
    inventoryScreen: $("inventoryScreen"),
    journalScreen: $("journalScreen"),
    mapScreen: $("mapScreen"),
    settingsScreen: $("settingsScreen"),
    creditsScreen: $("creditsScreen"),
    jumpscareScreen: $("jumpscareScreen"),
    jumpscareContent: $("jumpscareContent"),
    notification: $("notification"),
    screenFlash: $("screenFlash"),
    screenVignette: $("screenVignette"),
    screenGrain: $("screenGrain"),
  };

  /* ================================================
       GAME CONFIGURATION
    ================================================ */

  const SAVE_KEY = "rumahTerakhir_save";

  const DEFAULT_STATE = {
    currentScene: Story.start,
    inventory: [],
    journal: [],
    flags: {},
    health: 100,
    sanity: 100,
    gameTime: "23:47",
    currentDay: 1,
    visitedScenes: [],
    choicesMade: [],
    ending: null,
    settings: {
      textSpeed: 28,
      animations: true,
    },
  };

  let state = structuredClone(DEFAULT_STATE);

  let narrationIndex = 0;
  let narrationLines = [];
  let currentPhase = "idle";
  let isTyping = false;
  let notificationTimer = null;
  let activePanel = null;
  let gameStarted = false;

  /* ================================================
       UTILITY
    ================================================ */

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function getScene(sceneId) {
    return Story.scenes[sceneId] || null;
  }

  function normalizeText(value) {
    if (typeof value === "string") return value;
    if (value && typeof value === "object") {
      return value.name || value.text || value.id || "Benda misterius";
    }
    return String(value ?? "");
  }

  function showElement(element) {
    if (!element) return;
    element.classList.remove("hidden");
    element.classList.add("active");
  }

  function hideElement(element) {
    if (!element) return;
    element.classList.remove("active");
    element.classList.add("hidden");
  }

  function setText(element, value) {
    if (element) element.textContent = value ?? "";
  }

  function clamp(value, min = 0, max = 100) {
    return Math.max(min, Math.min(max, value));
  }

  function randomId() {
    return Date.now() + Math.floor(Math.random() * 1000);
  }

  /* ================================================
       SAVE SYSTEM
    ================================================ */

  function saveGame() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
      showNotification("Permainan berhasil disimpan.");
    } catch (error) {
      console.error("Gagal menyimpan permainan:", error);
      showNotification("Permainan gagal disimpan.");
    }
  }

  function loadGame() {
    try {
      const saved = localStorage.getItem(SAVE_KEY);

      if (!saved) {
        showNotification("Belum ada data permainan.");
        return false;
      }

      const parsed = JSON.parse(saved);

      if (!parsed || !getScene(parsed.currentScene)) {
        showNotification("Data permainan tidak valid.");
        return false;
      }

      state = {
        ...clone(DEFAULT_STATE),
        ...parsed,
        settings: {
          ...DEFAULT_STATE.settings,
          ...(parsed.settings || {}),
        },
      };

      startGame(false);
      showNotification("Permainan berhasil dilanjutkan.");

      return true;
    } catch (error) {
      console.error("Gagal memuat permainan:", error);
      showNotification("Data permainan tidak dapat dibaca.");
      return false;
    }
  }

  function resetGame() {
    if (!confirm("Mulai permainan baru? Progres sebelumnya akan dihapus.")) {
      return;
    }

    localStorage.removeItem(SAVE_KEY);
    state = clone(DEFAULT_STATE);
    startGame(true);
  }

  /* ================================================
       GAME INITIALIZATION
    ================================================ */

  function startGame(isNewGame = true) {
    if (isNewGame) {
      state = clone(DEFAULT_STATE);
    }

    if (!getScene(state.currentScene)) {
      state.currentScene = Story.start;
    }

    gameStarted = true;

    hideElement(ui.mainMenu);
    showElement(ui.gameScreen);

    closeAllPanels();

    Effects.init();
    updateStatus();
    renderScene(state.currentScene);
  }

  /* ================================================
       MAIN MENU
    ================================================ */

  function bindMenu() {
    const startButtons = [
      $("startButton"),
      $("newGameButton"),
      $("playButton"),
    ];

    startButtons.forEach((button) => {
      button?.addEventListener("click", () => {
        resetGameFromMenu();
      });
    });

    const continueButtons = [$("continueButton"), $("loadGameButton")];

    continueButtons.forEach((button) => {
      button?.addEventListener("click", () => {
        if (!loadGame()) {
          showNotification("Tidak ditemukan permainan tersimpan.");
        }
      });
    });

    $("creditsButton")?.addEventListener("click", () => {
      openPanel(ui.creditsScreen);
    });
  }

  function resetGameFromMenu() {
    localStorage.removeItem(SAVE_KEY);
    state = clone(DEFAULT_STATE);
    startGame(true);
  }

  /* ================================================
       SCENE RENDERING
    ================================================ */

  async function renderScene(sceneId) {
    const scene = getScene(sceneId);

    if (!scene) {
      console.error("Adegan tidak ditemukan:", sceneId);
      showNotification("Terjadi kesalahan saat memuat adegan.");
      return;
    }

    Effects.skipTyping();

    state.currentScene = sceneId;

    if (!state.visitedScenes.includes(sceneId)) {
      state.visitedScenes.push(sceneId);
    }

    narrationIndex = 0;
    narrationLines = Array.isArray(scene.narration)
      ? scene.narration
      : scene.narration
        ? [scene.narration]
        : [];

    currentPhase = "narration";
    isTyping = false;

    clearSceneUI();
    updateStatus();
    updateLocation(scene);
    updateSceneAppearance(scene);

    if (scene.effects) {
      const effects = Array.isArray(scene.effects)
        ? scene.effects
        : [scene.effects];

      effects.forEach((effect) => {
        Effects.playSceneEffect(effect);
      });
    }

    if (scene.ending) {
      state.ending = scene.ending;
    }

    if (state.ending) {
      saveGameSilently();
    }

    saveGameSilently();

    if (narrationLines.length > 0) {
      await showNarration();
    } else {
      await showDialogueOrOptions();
    }
  }

  function clearSceneUI() {
    setText(ui.narrationText, "");
    setText(ui.characterName, "");
    setText(ui.dialogueText, "");

    hideElement(ui.dialogueBox);

    if (ui.interactionOptions) {
      ui.interactionOptions.innerHTML = "";
    }
  }

  function updateLocation(scene) {
    setText(ui.locationName, scene.location || "Lokasi tidak diketahui");

    if (scene.time) {
      state.gameTime = scene.time;
    }

    setText(ui.gameTime, state.gameTime);
  }

  function updateSceneAppearance(scene) {
    const location = scene.location || "";

    if (ui.sceneBackground) {
      ui.sceneBackground.dataset.location = location;
    }

    if (ui.sceneLighting) {
      ui.sceneLighting.dataset.location = location;
    }

    if (ui.sceneOverlay) {
      ui.sceneOverlay.dataset.scene = state.currentScene;
    }

    Effects.animateScene(ui.sceneBackground);
  }

  /* ================================================
       NARRATION SYSTEM
    ================================================ */

  async function showNarration() {
    if (narrationIndex >= narrationLines.length) {
      await showDialogueOrOptions();
      return;
    }

    currentPhase = "narration";
    isTyping = true;

    const text = normalizeText(narrationLines[narrationIndex]);

    if (ui.typingIndicator) {
      showElement(ui.typingIndicator);
    }

    await Effects.typeText(ui.narrationText, text, {
      speed: state.settings.textSpeed,
      mode: "narration",
    });

    isTyping = false;

    if (ui.typingIndicator) {
      hideElement(ui.typingIndicator);
    }

    currentPhase = "narration-ready";
  }

  async function advanceNarration() {
    if (isTyping) {
      Effects.skipTyping();
      isTyping = false;

      if (ui.typingIndicator) {
        hideElement(ui.typingIndicator);
      }

      return;
    }

    if (currentPhase === "narration-ready") {
      narrationIndex++;
      await showNarration();
    }
  }

  /* ================================================
       DIALOGUE SYSTEM
    ================================================ */

  async function showDialogueOrOptions() {
    const scene = getScene(state.currentScene);

    if (!scene) return;

    if (scene.dialogue) {
      await showDialogue(scene.dialogue);
      return;
    }

    renderOptions(scene);
  }

  async function showDialogue(dialogue) {
    currentPhase = "dialogue";
    isTyping = true;

    showElement(ui.dialogueBox);

    setText(ui.characterName, dialogue.character || "Seseorang");

    if (ui.dialogueText) {
      ui.dialogueText.classList.add("dialogue-text");
    }

    await Effects.typeText(ui.dialogueText, dialogue.text || "", {
      speed: state.settings.textSpeed,
      mode: "dialogue",
    });

    isTyping = false;
    currentPhase = "dialogue-ready";
  }

  async function advanceDialogue() {
    if (isTyping) {
      Effects.skipTyping();
      isTyping = false;
      return;
    }

    if (currentPhase === "dialogue-ready") {
      hideElement(ui.dialogueBox);

      const scene = getScene(state.currentScene);
      renderOptions(scene);
    }
  }

  /* ================================================
       OPTION CONDITIONS
    ================================================ */

  function hasItem(itemId) {
    return state.inventory.some((item) => {
      if (typeof item === "string") return item === itemId;
      return item.id === itemId;
    });
  }

  function checkCondition(condition) {
    if (!condition) return true;

    if (condition.hasItem && !hasItem(condition.hasItem)) {
      return false;
    }

    if (condition.notItem && hasItem(condition.notItem)) {
      return false;
    }

    if (condition.flag) {
      const flagName =
        typeof condition.flag === "string"
          ? condition.flag
          : condition.flag.name;

      const expected =
        typeof condition.flag === "object" ? condition.flag.value : true;

      if (state.flags[flagName] !== expected) {
        return false;
      }
    }

    if (condition.notFlag && state.flags[condition.notFlag]) {
      return false;
    }

    if (
      condition.minHealth !== undefined &&
      state.health < condition.minHealth
    ) {
      return false;
    }

    if (
      condition.minSanity !== undefined &&
      state.sanity < condition.minSanity
    ) {
      return false;
    }

    if (
      condition.maxSanity !== undefined &&
      state.sanity > condition.maxSanity
    ) {
      return false;
    }

    if (condition.visited && !state.visitedScenes.includes(condition.visited)) {
      return false;
    }

    if (
      condition.notVisited &&
      state.visitedScenes.includes(condition.notVisited)
    ) {
      return false;
    }

    return true;
  }

  /* ================================================
       OPTIONS RENDERING
    ================================================ */

  function renderOptions(scene) {
    currentPhase = "options";

    if (!ui.interactionOptions) return;

    ui.interactionOptions.innerHTML = "";

    const options = (scene.options || []).filter((option) => {
      return checkCondition(option.condition);
    });

    if (options.length === 0) {
      const message = document.createElement("p");
      message.className = "no-options";
      message.textContent = "Tidak ada hal lain yang bisa dilakukan di sini.";
      ui.interactionOptions.appendChild(message);
      return;
    }

    options.forEach((option, index) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "interaction-option";
      button.textContent = option.text || `Pilihan ${index + 1}`;

      button.addEventListener("click", () => {
        if (currentPhase !== "options") return;
        chooseOption(option);
      });

      ui.interactionOptions.appendChild(button);
    });
  }

  /* ================================================
       CHOICE PROCESSING
    ================================================ */

  async function chooseOption(option) {
    if (!option || currentPhase !== "options") return;

    currentPhase = "processing";

    const sceneId = state.currentScene;

    state.choicesMade.push({
      scene: sceneId,
      choice: option.text,
      time: state.gameTime,
    });

    applyEffects(option.effects);

    if (option.next) {
      await Effects.transition(async () => {
        await renderScene(option.next);
      });
    } else {
      currentPhase = "options";
      renderOptions(getScene(state.currentScene));
    }

    updateStatus();
    saveGameSilently();
  }

  /* ================================================
       APPLY STORY EFFECTS
    ================================================ */

  function applyEffects(effects) {
    if (!effects) return;

    if (effects.flags) {
      Object.entries(effects.flags).forEach(([key, value]) => {
        state.flags[key] = value;
      });
    }

    if (effects.addItem) {
      addItem(effects.addItem);
    }

    if (effects.removeItem) {
      removeItem(effects.removeItem);
    }

    if (effects.addJournal) {
      addJournal(effects.addJournal);
    }

    if (effects.health !== undefined) {
      state.health = clamp(state.health + effects.health);

      if (effects.health < 0) {
        showNotification("Kesehatanmu menurun.");
      }
    }

    if (effects.sanity !== undefined) {
      state.sanity = clamp(state.sanity + effects.sanity);

      if (effects.sanity < 0) {
        showNotification("Kewajaranmu mulai terganggu...");
      }
    }

    if (effects.time) {
      state.gameTime = effects.time;
    }

    if (effects.day) {
      state.currentDay = effects.day;
    }

    if (effects.notification) {
      showNotification(effects.notification);
    }

    if (effects.effect) {
      Effects.playSceneEffect(effects.effect);
    }

    updateStatus();
  }

  /* ================================================
       INVENTORY
    ================================================ */

  function addItem(item) {
    const itemData =
      typeof item === "string"
        ? { id: item, name: item, description: "Benda yang ditemukan." }
        : {
            id: item.id || item.name,
            name: item.name || item.id,
            description: item.description || "Benda yang ditemukan.",
          };

    if (!itemData.id || hasItem(itemData.id)) return;

    state.inventory.push(itemData);

    showNotification(`Benda ditemukan: ${itemData.name}`);
    renderInventory();
  }

  function removeItem(itemId) {
    state.inventory = state.inventory.filter((item) => {
      return typeof item === "string" ? item !== itemId : item.id !== itemId;
    });

    renderInventory();
  }

  function renderInventory() {
    const container = $("inventoryItems");
    if (!container) return;

    container.innerHTML = "";

    if (state.inventory.length === 0) {
      container.textContent = "Tasmu masih kosong.";
      return;
    }

    state.inventory.forEach((item) => {
      const data =
        typeof item === "string"
          ? { name: item, description: "Benda yang ditemukan." }
          : item;

      const element = document.createElement("div");
      element.className = "inventory-item";

      const title = document.createElement("h3");
      title.textContent = data.name;

      const description = document.createElement("p");
      description.textContent = data.description;

      element.append(title, description);
      container.appendChild(element);
    });
  }

  /* ================================================
       JOURNAL
    ================================================ */

  function addJournal(entry) {
    const entryData =
      typeof entry === "string"
        ? {
            title: "Catatan baru",
            text: entry,
          }
        : {
            title: entry.title || "Catatan baru",
            text: entry.text || entry.description || "",
          };

    const duplicate = state.journal.some((item) => {
      return item.title === entryData.title && item.text === entryData.text;
    });

    if (duplicate) return;

    state.journal.push({
      ...entryData,
      id: randomId(),
      scene: state.currentScene,
    });

    renderJournal();
  }

  function renderJournal() {
    const container = $("journalEntries");
    if (!container) return;

    container.innerHTML = "";

    if (state.journal.length === 0) {
      container.textContent = "Belum ada catatan.";
      return;
    }

    state.journal.forEach((entry) => {
      const element = document.createElement("div");
      element.className = "journal-entry";

      const title = document.createElement("h3");
      title.textContent = entry.title;

      const description = document.createElement("p");
      description.textContent = entry.text;

      element.append(title, description);
      container.appendChild(element);
    });
  }

  /* ================================================
       STATUS BARS
    ================================================ */

  function updateStatus() {
    updateBar(ui.healthBar, state.health);
    updateBar(ui.sanityBar, state.sanity);

    setText(ui.gameTime, state.gameTime);
  }

  function updateBar(element, value) {
    if (!element) return;

    const percentage = clamp(value);

    if (element.tagName === "PROGRESS") {
      element.value = percentage;
      element.max = 100;
    } else {
      element.style.width = `${percentage}%`;
      element.setAttribute("aria-valuenow", percentage);
    }

    element.dataset.value = percentage;
  }

  /* ================================================
       MAP
    ================================================ */

  function renderMap() {
    const container = $("mapLocations");
    if (!container) return;

    container.innerHTML = "";

    const locations = [
      { id: "gate", name: "Gerbang Rumah" },
      { id: "garden", name: "Halaman" },
      { id: "well", name: "Sumur Tua" },
      { id: "kitchen", name: "Dapur" },
      { id: "living_room", name: "Ruang Keluarga" },
      { id: "upstairs", name: "Lantai Atas" },
      { id: "aruna_room", name: "Kamar Aruna" },
      { id: "parents_bedroom", name: "Kamar Orang Tua" },
      { id: "locked_room", name: "Kamar Terkunci" },
      { id: "basement", name: "Ruang Bawah Tanah" },
    ];

    locations.forEach((location) => {
      const visited = state.visitedScenes.includes(location.id);
      const button = document.createElement("button");

      button.type = "button";
      button.className = "map-room";

      if (visited) {
        button.classList.add("visited");
      }

      if (state.currentScene === location.id) {
        button.classList.add("current");
      }

      button.textContent = visited ? location.name : "?????";

      button.disabled = !visited;

      button.addEventListener("click", () => {
        if (visited) {
          showNotification("Kamu hanya bisa berpindah melalui pilihan cerita.");
        }
      });

      container.appendChild(button);
    });
  }

  /* ================================================
       PANELS
    ================================================ */

  function openPanel(panel) {
    if (!panel) return;

    closeAllPanels();

    activePanel = panel;
    showElement(panel);

    if (panel === ui.inventoryScreen) renderInventory();
    if (panel === ui.journalScreen) renderJournal();
    if (panel === ui.mapScreen) renderMap();
  }

  function closeAllPanels() {
    const panels = [
      ui.inventoryScreen,
      ui.journalScreen,
      ui.mapScreen,
      ui.settingsScreen,
      ui.creditsScreen,
      $("menuPanel"),
    ];

    panels.forEach((panel) => {
      if (panel) {
        panel.classList.remove("active");
        panel.classList.add("hidden");
      }
    });

    activePanel = null;
  }

  function bindPanels() {
    ui.inventoryButton?.addEventListener("click", () => {
      openPanel(ui.inventoryScreen);
    });

    ui.journalButton?.addEventListener("click", () => {
      openPanel(ui.journalScreen);
    });

    ui.mapButton?.addEventListener("click", () => {
      openPanel(ui.mapScreen);
    });

    // Tombol kembali untuk semua panel
    document.addEventListener("click", (event) => {
      const backButton = event.target.closest(".backButton");

      if (!backButton) return;

      event.preventDefault();
      event.stopPropagation();

      closeAllPanels();
    });

    $("settingsButton")?.addEventListener("click", () => {
      openPanel(ui.settingsScreen);
    });

    $("saveButton")?.addEventListener("click", saveGame);

    $("exitButton")?.addEventListener("click", () => {
      saveGameSilently();
      closeAllPanels();
      hideElement(ui.gameScreen);
      showElement(ui.mainMenu);
      gameStarted = false;
    });

    ui.menuButton?.addEventListener("click", () => {
      openPanel($("menuPanel") || ui.settingsScreen);
    });

    $("closeMenu")?.addEventListener("click", closeAllPanels);
  }

  /* ================================================
       SETTINGS
    ================================================ */

  function bindSettings() {
    const speedControl = $("textSpeed");
    const animationControl = $("animationToggle");

    if (speedControl) {
      speedControl.value = state.settings.textSpeed;

      speedControl.addEventListener("input", () => {
        state.settings.textSpeed = Number(speedControl.value);
        saveGameSilently();
      });
    }

    if (animationControl) {
      animationControl.checked = state.settings.animations;

      animationControl.addEventListener("change", () => {
        state.settings.animations = animationControl.checked;
        saveGameSilently();
      });
    }
  }

  /* ================================================
       NOTIFICATION
    ================================================ */

  function showNotification(message) {
    if (!ui.notification) {
      console.log(message);
      return;
    }

    clearTimeout(notificationTimer);

    ui.notification.textContent = message;
    showElement(ui.notification);

    notificationTimer = setTimeout(() => {
      hideElement(ui.notification);
    }, 2800);
  }

  /* ================================================
       INPUT HANDLING
    ================================================ */

  function bindNarrationInput() {
    const narrationArea = ui.narrationText;

    narrationArea?.addEventListener("click", () => {
      if (activePanel) return;
      advanceNarration();
    });

    ui.dialogueBox?.addEventListener("click", () => {
      if (activePanel) return;
      advanceDialogue();
    });

    document.addEventListener("keydown", (event) => {
      if (!gameStarted) return;

      if (event.key === "Escape") {
        if (activePanel) {
          closeAllPanels();
        }
        return;
      }

      if (activePanel) return;

      if (event.code === "Space" || event.key === "Enter") {
        const tag = document.activeElement?.tagName;

        if (tag === "BUTTON" || tag === "INPUT") return;

        event.preventDefault();

        if (
          currentPhase === "narration-ready" ||
          currentPhase === "narration"
        ) {
          advanceNarration();
        } else if (
          currentPhase === "dialogue-ready" ||
          currentPhase === "dialogue"
        ) {
          advanceDialogue();
        }
      }
    });
  }

  /* ================================================
       SAVE WITHOUT NOTIFICATION
    ================================================ */

  function saveGameSilently() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Gagal menyimpan progres:", error);
    }
  }

  /* ================================================
       ENDING SYSTEM
    ================================================ */

  function showEnding() {
    const scene = getScene(state.currentScene);

    if (!scene || !scene.ending) return;

    state.ending = scene.ending;
    saveGameSilently();

    const endingScreen = $("endingScreen");
    const endingTitle = $("endingTitle");
    const endingDescription = $("endingDescription");

    if (endingScreen) {
      showElement(endingScreen);
    }

    setText(endingTitle, scene.endingTitle || "Akhir Cerita");
    setText(
      endingDescription,
      scene.endingDescription || "Perjalanan Aruna telah mencapai akhirnya.",
    );

    $("endingRestart")?.addEventListener("click", () => {
      localStorage.removeItem(SAVE_KEY);
      location.reload();
    });

    $("endingMainMenu")?.addEventListener("click", () => {
      hideElement(endingScreen);
      hideElement(ui.gameScreen);
      showElement(ui.mainMenu);
      gameStarted = false;
    });
  }

  /* ================================================
       ENDING DETECTION
    ================================================ */

  function checkEnding(scene) {
    if (scene?.ending) {
      showEnding();
      return true;
    }

    return false;
  }

  /* ================================================
       PATCH SCENE ENDING FLOW
    ================================================ */

  const originalRenderScene = renderScene;

  async function loadScene(sceneId) {
    await originalRenderScene(sceneId);

    const scene = getScene(sceneId);

    if (scene?.ending) {
      showEnding();
    }
  }

  /* ================================================
       BUTTON EVENTS
    ================================================ */

  function bindGlobalButtons() {
    $("restartButton")?.addEventListener("click", resetGame);

    $("saveGameButton")?.addEventListener("click", saveGame);

    $("loadGameButton")?.addEventListener("click", loadGame);
  }

  /* ================================================
       INITIALIZE GAME
    ================================================ */

  function initialize() {
    Effects.init();

    bindMenu();
    bindPanels();
    bindSettings();
    bindNarrationInput();
    bindGlobalButtons();

    const hasSave = Boolean(localStorage.getItem(SAVE_KEY));

    const continueButton = $("continueButton");

    if (continueButton) {
      continueButton.disabled = !hasSave;
    }

    closeAllPanels();

    if (ui.mainMenu) {
      showElement(ui.mainMenu);
    }

    if (ui.gameScreen) {
      hideElement(ui.gameScreen);
    }
  }

  initialize();

  /* ================================================
       PUBLIC GAME API
    ================================================ */

  window.RumahTerakhir = {
    getState: () => clone(state),
    start: () => startGame(true),
    continue: loadGame,
    save: saveGame,
    reset: resetGame,
    goTo: loadScene,
    addItem,
    removeItem,
    addJournal,
    showNotification,
    checkCondition,
    applyEffects,
  };
});
