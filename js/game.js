
"use strict";

/* =====================================================
   OCEAN BITES
   SEAFOOD RESTAURANT SIMULATOR
===================================================== */

/* =====================================================
   1. GAME DATA
===================================================== */

const menuItems = [
    {
        id: "crab",
        name: "Grilled Crab",
        emoji: "🦀",
        description: "Fresh crab grilled with special seasoning.",
        price: 85,
        unlock: 1,
        cookTime: 5,
        ingredients: { crab: 1, spice: 1 }
    },
    {
        id: "shrimp",
        name: "Butter Shrimp",
        emoji: "🍤",
        description: "Juicy shrimp cooked in creamy butter.",
        price: 75,
        unlock: 1,
        cookTime: 4,
        ingredients: { shrimp: 2, butter: 1 }
    },
    {
        id: "fish",
        name: "Grilled Fish",
        emoji: "🐟",
        description: "Fresh fish with aromatic herbs.",
        price: 95,
        unlock: 1,
        cookTime: 6,
        ingredients: { fish: 1, spice: 1 }
    },
    {
        id: "rice",
        name: "Seafood Rice Bowl",
        emoji: "🍚",
        description: "A delicious bowl of rice with seafood.",
        price: 120,
        unlock: 2,
        cookTime: 7,
        ingredients: { shrimp: 1, fish: 1, rice: 1 }
    },
    {
        id: "lobster",
        name: "Lobster Grill",
        emoji: "🦞",
        description: "Premium lobster with melted butter.",
        price: 180,
        unlock: 3,
        cookTime: 9,
        ingredients: { lobster: 1, butter: 1 }
    },
    {
        id: "soup",
        name: "Seafood Soup",
        emoji: "🍲",
        description: "Warm soup with fresh seafood.",
        price: 150,
        unlock: 4,
        cookTime: 8,
        ingredients: { fish: 2, shrimp: 1, spice: 1 }
    },
    {
        id: "platter",
        name: "Seafood Platter",
        emoji: "🦐",
        description: "A feast of the ocean's finest seafood.",
        price: 250,
        unlock: 5,
        cookTime: 12,
        ingredients: { shrimp: 3, crab: 1, fish: 1 }
    },
    {
        id: "sushi",
        name: "Sushi Seafood",
        emoji: "🍣",
        description: "Fresh seafood sushi with rice.",
        price: 210,
        unlock: 6,
        cookTime: 10,
        ingredients: { fish: 2, rice: 2 }
    },
    {
        id: "oyster",
        name: "Premium Oyster",
        emoji: "🦪",
        description: "Fresh oysters with a special sauce.",
        price: 280,
        unlock: 7,
        cookTime: 11,
        ingredients: { oyster: 2, spice: 1 }
    },
    {
        id: "royal",
        name: "Royal Seafood Tower",
        emoji: "🦀",
        description: "An extravagant seafood masterpiece.",
        price: 450,
        unlock: 8,
        cookTime: 15,
        ingredients: {
            lobster: 2,
            shrimp: 3,
            crab: 2
        }
    }
];

const ingredientData = {
    crab: {
        name: "Fresh Crab",
        emoji: "🦀",
        price: 20
    },
    shrimp: {
        name: "Fresh Shrimp",
        emoji: "🍤",
        price: 15
    },
    fish: {
        name: "Fresh Fish",
        emoji: "🐟",
        price: 18
    },
    butter: {
        name: "Butter",
        emoji: "🧈",
        price: 10
    },
    spice: {
        name: "Spices",
        emoji: "🌶️",
        price: 8
    },
    rice: {
        name: "Rice",
        emoji: "🍚",
        price: 7
    },
    lobster: {
        name: "Lobster",
        emoji: "🦞",
        price: 45
    },
    oyster: {
        name: "Oyster",
        emoji: "🦪",
        price: 30
    }
};

const customerCharacters = [
    "👩🏻", "👨🏻", "👩🏽", "👨🏽",
    "👩🏼", "👨🏼", "👵🏻", "👴🏻",
    "👩🏾", "👨🏾", "🧑🏻", "👩🏼‍🦰"
];

const customerNames = [
    "Mia", "Oliver", "Luna", "Noah",
    "Ava", "Leo", "Sophie", "Ethan",
    "Chloe", "Lucas", "Emma", "Mason"
];

const levelNames = {
    1: "Little Seafood Shop",
    2: "Growing Seafood Cafe",
    3: "Coastal Restaurant",
    4: "Ocean Kitchen",
    5: "Seafood Paradise",
    6: "Ocean Dining House",
    7: "Premium Seafood",
    8: "Royal Ocean Restaurant"
};

const upgrades = [
    {
        id: "table",
        name: "Extra Dining Table",
        emoji: "🪑",
        description: "Add one more table to serve more guests.",
        price: 350,
        max: 8
    },
    {
        id: "speed",
        name: "Faster Cooking",
        emoji: "🔥",
        description: "Increase cooking speed by 15%.",
        price: 500,
        max: 5
    },
    {
        id: "patience",
        name: "Customer Comfort",
        emoji: "💖",
        description: "Customers become more patient.",
        price: 400,
        max: 5
    },
    {
        id: "decor",
        name: "Ocean Decoration",
        emoji: "🌴",
        description: "Improve the restaurant atmosphere and rating.",
        price: 600,
        max: 5
    }
];

/* =====================================================
   2. GAME STATE
===================================================== */

const state = {
    money: 1000,
    gems: 5,
    totalRevenue: 0,
    dailyRevenue: 0,

    level: 1,
    xp: 0,
    xpNeeded: 100,

    day: 1,
    customersServed: 0,
    rating: 5,

    tables: [
        { id: 1, customerId: null },
        { id: 2, customerId: null }
    ],

    queue: [],
    customers: [],
    orders: [],

    nextCustomerId: 1,
    nextOrderId: 1,

    inventory: {
        crab: 10,
        shrimp: 15,
        fish: 12,
        butter: 10,
        spice: 15,
        rice: 10,
        lobster: 3,
        oyster: 3
    },

    upgrades: {
        table: 0,
        speed: 0,
        patience: 0,
        decor: 0
    },

    stoves: [
        {
            id: 1,
            orderId: null,
            progress: 0,
            interval: null
        }
    ],

    challengeCompleted: false,
    sound: true,
    gameStarted: false,
    filter: "all",
    customerTimer: null,
    gameTimer: null,
    dayServed: 0
};

/* =====================================================
   3. DOM HELPERS
===================================================== */

const $ = id => document.getElementById(id);

const moneyFormat = value =>
    Math.floor(value).toLocaleString("en-US");

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMenu(id) {
    return menuItems.find(item => item.id === id);
}

function getOrder(id) {
    return state.orders.find(order => order.id === id);
}

function getCustomer(id) {
    return state.customers.find(customer => customer.id === id);
}

function getFreeTable() {
    return state.tables.find(table => !table.customerId);
}

function getFreeStove() {
    return state.stoves.find(stove => !stove.orderId);
}

function getFreeCustomer() {
    return state.customers.find(customer => !customer.orderId);
}

function getCustomerPatience() {
    return 30 + state.upgrades.patience * 8;
}

/* =====================================================
   4. NOTIFICATION
===================================================== */

function notify(message, type = "success") {
    const container = $("notificationContainer");
    if (!container) return;

    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    container.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("leaving");

        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2800);
}

/* =====================================================
   5. SOUND EFFECTS
===================================================== */

let audioContext = null;

function playSound(type = "click") {
    if (!state.sound) return;

    try {
        audioContext ||= new (
            window.AudioContext || window.webkitAudioContext
        )();

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        const sounds = {
            click: [440, 0.06],
            success: [660, 0.13],
            coin: [880, 0.09],
            level: [990, 0.25],
            error: [180, 0.15]
        };

        const [frequency, duration] = sounds[type] || sounds.click;

        oscillator.frequency.value = frequency;
        oscillator.type = "sine";

        gain.gain.setValueAtTime(.08, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
            .001,
            audioContext.currentTime + duration
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
        console.warn("Audio unavailable:", error);
    }
}

/* =====================================================
   6. ACTIVITY LOG
===================================================== */

function addActivity(icon, title, description) {
    const list = $("activityList");
    if (!list) return;

    const empty = list.querySelector(".empty-state");
    if (empty) empty.remove();

    const item = document.createElement("div");
    item.className = "activity-item";

    const iconElement = document.createElement("div");
    iconElement.className = "activity-icon";
    iconElement.textContent = icon;

    const content = document.createElement("div");
    const strong = document.createElement("strong");
    const small = document.createElement("small");

    strong.textContent = title;
    small.textContent = description;

    content.append(strong, small);
    item.append(iconElement, content);

    list.prepend(item);

    while (list.children.length > 8) {
        list.lastElementChild.remove();
    }
}

/* =====================================================
   7. NAVIGATION
===================================================== */

const pageInformation = {
    dashboard: {
        title: "Dashboard",
        subtitle: "Welcome back, Chef! Let's serve something delicious."
    },
    restaurant: {
        title: "Restaurant",
        subtitle: "Welcome your guests and take their orders."
    },
    kitchen: {
        title: "Kitchen",
        subtitle: "Prepare delicious seafood dishes."
    },
    menu: {
        title: "Menu & Recipes",
        subtitle: "Discover new seafood recipes."
    },
    inventory: {
        title: "Inventory",
        subtitle: "Manage your fresh ingredients."
    },
    upgrades: {
        title: "Upgrades",
        subtitle: "Make your restaurant bigger and better."
    }
};

function navigateTo(page) {
    if (!pageInformation[page]) return;

    document.querySelectorAll(".page").forEach(element => {
        element.classList.remove("active");
    });

    document.querySelectorAll(".nav-item[data-page]").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.page === page
        );
    });

    $(page)?.classList.add("active");

    $("pageTitle").textContent = pageInformation[page].title;
    $("pageSubtitle").textContent = pageInformation[page].subtitle;

    $("sidebar")?.classList.remove("open");

    playSound("click");
}

function bindNavigation() {
    document.querySelectorAll(".nav-item[data-page]").forEach(button => {
        button.addEventListener("click", () => {
            navigateTo(button.dataset.page);
        });
    });

    document.querySelectorAll("[data-goto]").forEach(button => {
        button.addEventListener("click", () => {
            navigateTo(button.dataset.goto);
        });
    });

    $("mobileMenu")?.addEventListener("click", () => {
        $("sidebar")?.classList.toggle("open");
    });
}

/* =====================================================
   8. LEVEL SYSTEM
===================================================== */

function addXP(amount) {
    state.xp += amount;

    while (state.xp >= state.xpNeeded) {
        state.xp -= state.xpNeeded;
        levelUp();
    }

    renderProgress();
}

function levelUp() {
    state.level++;
    state.xpNeeded = 100 + (state.level - 1) * 50;

    const newStove = {
        id: state.stoves.length + 1,
        orderId: null,
        progress: 0,
        interval: null
    };

    state.stoves.push(newStove);

    const newlyUnlocked = menuItems.filter(
        item => item.unlock === state.level
    );

    const rewards = [
        `🔥 New Cooking Station #${newStove.id}!`,
        "🍽️ New Restaurant Level!",
        ...newlyUnlocked.map(item => `${item.emoji} ${item.name} unlocked!`)
    ];

    state.money += 150;

    $("levelupReward").innerHTML = "";

    rewards.forEach(reward => {
        const line = document.createElement("div");
        line.textContent = reward;
        line.style.margin = "5px";
        $("levelupReward").appendChild(line);
    });

    $("levelupOverlay")?.classList.add("active");

    playSound("level");
    createConfetti();

    addActivity(
        "🎉",
        `Reached Level ${state.level}!`,
        "Your restaurant has grown and gained a new stove."
    );

    notify(`Congratulations! You reached Level ${state.level}!`);
    renderAll();
}

$("levelupContinue")?.addEventListener("click", () => {
    $("levelupOverlay")?.classList.remove("active");
    playSound("click");
});

/* =====================================================
   9. CONFETTI
===================================================== */

function createConfetti() {
    const container = $("confettiContainer");
    if (!container) return;

    const colors = [
        "#ffd166", "#65c99b", "#68d5df",
        "#ff985e", "#a78bfa", "#f07878"
    ];

    for (let i = 0; i < 45; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti";

        piece.style.left = `${Math.random() * 100}%`;
        piece.style.background = randomItem(colors);
        piece.style.animationDelay = `${Math.random() * 1.2}s`;
        piece.style.animationDuration = `${2 + Math.random() * 2}s`;
        piece.style.borderRadius = Math.random() > .5 ? "50%" : "2px";

        container.appendChild(piece);

        setTimeout(() => piece.remove(), 5000);
    }
}

/* =====================================================
   10. CUSTOMER SYSTEM
===================================================== */

function createCustomer() {
    const customer = {
        id: state.nextCustomerId++,
        name: randomItem(customerNames),
        emoji: randomItem(customerCharacters),
        patience: getCustomerPatience(),
        maxPatience: getCustomerPatience(),
        tableId: null,
        orderId: null,
        vip: Math.random() < .08,
        mood: "😊"
    };

    if (customer.vip) {
        customer.patience += 15;
        customer.maxPatience += 15;
    }

    state.customers.push(customer);
    state.queue.push(customer.id);

    addActivity(
        "👋",
        `${customer.name} arrived!`,
        customer.vip ? "A VIP customer has arrived!" : "A new guest is waiting."
    );

    notify(
        customer.vip
            ? "🌟 A VIP customer has arrived!"
            : `${customer.name} is waiting for a table!`
    );

    seatWaitingCustomers();
    renderAll();
}

function seatWaitingCustomers() {
    while (state.queue.length > 0) {
        const table = getFreeTable();
        if (!table) break;

        const customerId = state.queue.shift();
        const customer = getCustomer(customerId);

        if (!customer) continue;

        table.customerId = customer.id;
        customer.tableId = table.id;

        createOrder(customer);

        notify(`${customer.name} has been seated!`);
    }

    renderRestaurant();
}

function createOrder(customer) {
    const availableMenu = menuItems.filter(
        item => item.unlock <= state.level
    );

    const menu = randomItem(availableMenu);

    const order = {
        id: state.nextOrderId++,
        customerId: customer.id,
        menuId: menu.id,
        status: "pending",
        stoveId: null
    };

    customer.orderId = order.id;
    state.orders.push(order);

    addActivity(
        "🧾",
        `${customer.name} ordered ${menu.name}`,
        "A new order has been sent to the kitchen."
    );
}

function updateCustomerPatience() {
    let changed = false;

    state.customers.forEach(customer => {
        if (customer.tableId === null) {
            customer.patience--;
            changed = true;
        } else {
            const order = getOrder(customer.orderId);

            if (!order || order.status === "served") return;

            customer.patience--;

            if (customer.patience <= 0) {
                customer.mood = "😠";
            }

            if (customer.patience < -10) {
                customerLeaves(customer);
            }
        }
    });

    if (changed) renderRestaurant();
}

function customerLeaves(customer) {
    const table = state.tables.find(
        item => item.id === customer.tableId
    );

    if (table) table.customerId = null;

    state.queue = state.queue.filter(id => id !== customer.id);

    state.orders = state.orders.filter(order => {
        if (order.customerId !== customer.id) return true;

        const stove = state.stoves.find(
            item => item.orderId === order.id
        );

        if (stove) {
            clearInterval(stove.interval);
            stove.interval = null;
            stove.orderId = null;
            stove.progress = 0;
        }

        return false;
    });

    state.customers = state.customers.filter(
        item => item.id !== customer.id
    );

    state.rating = Math.max(1, state.rating - .1);

    notify(`${customer.name} left because of the long wait!`, "error");

    seatWaitingCustomers();
    renderAll();
}

/* =====================================================
   11. COOKING SYSTEM
===================================================== */

function hasIngredients(menu) {
    return Object.entries(menu.ingredients).every(
        ([ingredient, quantity]) =>
            state.inventory[ingredient] >= quantity
    );
}

function consumeIngredients(menu) {
    Object.entries(menu.ingredients).forEach(
        ([ingredient, quantity]) => {
            state.inventory[ingredient] -= quantity;
        }
    );
}

function cookOrder(orderId) {
    const order = getOrder(orderId);
    if (!order || order.status !== "pending") return;

    const stove = getFreeStove();

    if (!stove) {
        notify("All stoves are busy! Wait for one to finish.", "warning");
        playSound("error");
        return;
    }

    const menu = getMenu(order.menuId);

    if (!hasIngredients(menu)) {
        notify("Not enough ingredients! Restock your inventory.", "error");
        playSound("error");
        return;
    }

    consumeIngredients(menu);

    order.status = "cooking";
    order.stoveId = stove.id;

    stove.orderId = order.id;
    stove.progress = 0;

    const speedMultiplier = 1 + state.upgrades.speed * .15;
    const totalSteps = Math.max(
        20,
        Math.ceil(menu.cookTime * 10 / speedMultiplier)
    );

    let steps = 0;

    stove.interval = setInterval(() => {
        steps++;
        stove.progress = Math.min(100, steps / totalSteps * 100);

        renderStoves();

        if (steps >= totalSteps) {
            clearInterval(stove.interval);
            finishCooking(order, stove);
        }
    }, 100);

    playSound("click");
    notify(`${menu.name} is now cooking!`);
    renderAll();
}

function finishCooking(order, stove) {
    order.status = "ready";
    order.stoveId = null;

    stove.interval = null;
    stove.orderId = null;
    stove.progress = 0;

    playSound("success");

    notify(`${getMenu(order.menuId).emoji} ${getMenu(order.menuId).name} is ready!`);

    addActivity(
        "🍳",
        `${getMenu(order.menuId).name} is ready`,
        "The dish is ready to be served."
    );

    renderAll();
}

function renderStoves() {
    const container = $("stoveGrid");
    if (!container) return;

    container.innerHTML = "";

    state.stoves.forEach(stove => {
        const busy = Boolean(stove.orderId);
        const order = busy ? getOrder(stove.orderId) : null;
        const menu = order ? getMenu(order.menuId) : null;

        const card = document.createElement("div");
        card.className = `stove-card ${busy ? "stove-busy" : "stove-free"}`;

        const top = document.createElement("div");
        top.className = "stove-top";

        const number = document.createElement("span");
        number.className = "stove-number";
        number.textContent = `🔥 Stove ${stove.id}`;

        const status = document.createElement("span");
        status.className = "stove-status";
        status.textContent = busy ? "Cooking" : "Available";

        top.append(number, status);

        const visual = document.createElement("div");
        visual.className = "stove-visual";
        visual.textContent = busy ? (menu?.emoji || "🍳") : "🍳";

        const progress = document.createElement("div");
        progress.className = "stove-progress";

        const fill = document.createElement("div");
        fill.style.width = `${stove.progress}%`;

        progress.appendChild(fill);

        const detail = document.createElement("small");
        detail.textContent = busy
            ? `${menu?.name || "Cooking"} · ${Math.floor(stove.progress)}%`
            : "Ready for a new order";

        card.append(top, visual, progress, detail);
        container.appendChild(card);
    });

    $("stoveCount").textContent =
        `${state.stoves.length} ${state.stoves.length === 1 ? "Stove" : "Stoves"}`;

    $("kitchenLevel").textContent =
        `🔥 ${state.stoves.length} Active Stoves`;

    $("stoveTotal").textContent = state.stoves.length;
}

/* =====================================================
   12. SERVING SYSTEM
===================================================== */

function serveOrder(orderId) {
    const order = getOrder(orderId);

    if (!order || order.status !== "ready") return;

    const menu = getMenu(order.menuId);
    const customer = getCustomer(order.customerId);

    if (!customer) {
        state.orders = state.orders.filter(item => item.id !== orderId);
        renderAll();
        return;
    }

    const patienceBonus = Math.max(0, customer.patience);
    const tip = customer.vip ? 30 : Math.floor(patienceBonus / 3);

    const earnings = menu.price + tip;

    state.money += earnings;
    state.totalRevenue += earnings;
    state.dailyRevenue += earnings;

    state.customersServed++;
    state.dayServed++;

    customer.mood = "😍";
    order.status = "served";

    state.rating = Math.min(
        5,
        Number((state.rating + .02).toFixed(2))
    );

    addXP(20);

    addActivity(
        "💰",
        `${menu.name} served!`,
        `Earned ${moneyFormat(earnings)} coins including tip.`
    );

    notify(`+${moneyFormat(earnings)} coins! Great service!`);

    playSound("coin");

    const table = state.tables.find(
        item => item.id === customer.tableId
    );

    if (table) table.customerId = null;

    state.customers = state.customers.filter(
        item => item.id !== customer.id
    );

    state.orders = state.orders.filter(
        item => item.id !== orderId
    );

    checkChallenge();
    checkDailyGoal();
    seatWaitingCustomers();
    renderAll();
}

/* =====================================================
   13. CHALLENGE AND DAILY GOAL
===================================================== */

function checkChallenge() {
    const completed = state.dayServed >= 5;

    if (completed && !state.challengeCompleted) {
        state.challengeCompleted = true;
        state.money += 150;

        notify("🏆 Daily Challenge completed! +150 coins!");
        createConfetti();

        addActivity(
            "🏆",
            "Daily Challenge Completed!",
            "You received 150 bonus coins."
        );
    }

    $("challengeText").textContent =
        `${Math.min(state.dayServed, 5)} / 5 completed`;

    $("challengeProgress").style.width =
        `${Math.min(100, state.dayServed / 5 * 100)}%`;

    $("challengeStatus").textContent =
        state.challengeCompleted ? "Completed!" : "In Progress";
}

function checkDailyGoal() {
    $("goalProgressText").textContent =
        `${moneyFormat(state.dailyRevenue)}/500`;

    $("goalProgress").style.width =
        `${Math.min(100, state.dailyRevenue / 500 * 100)}%`;

    if (state.dailyRevenue >= 500) {
        notify("🎯 Daily revenue goal achieved!");
    }
}

/* =====================================================
   14. INVENTORY
===================================================== */

function restockIngredient(id) {
    const item = ingredientData[id];
    if (!item) return;

    const quantity = 5;
    const cost = item.price * quantity;

    if (state.money < cost) {
        notify("Not enough coins to restock!", "error");
        return;
    }

    state.money -= cost;
    state.inventory[id] += quantity;

    notify(`${item.name} restocked! +${quantity}`);
    playSound("success");

    renderAll();
}

function restockAll() {
    const cost = Object.entries(ingredientData).reduce(
        (total, [id, item]) => total + item.price * 5,
        0
    );

    if (state.money < cost) {
        notify(`You need ${moneyFormat(cost)} coins to restock everything.`, "error");
        return;
    }

    state.money -= cost;

    Object.keys(ingredientData).forEach(id => {
        state.inventory[id] += 5;
    });

    notify("📦 All ingredients have been restocked!");
    playSound("success");

    renderAll();
}

$("restockAll")?.addEventListener("click", restockAll);

/* =====================================================
   15. UPGRADES
===================================================== */

function purchaseUpgrade(id) {
    const upgrade = upgrades.find(item => item.id === id);
    if (!upgrade) return;

    const current = state.upgrades[id];

    if (current >= upgrade.max) {
        notify("This upgrade is already at maximum level!", "warning");
        return;
    }

    const price = upgrade.price * (current + 1);

    if (state.money < price) {
        notify("Not enough coins!", "error");
        return;
    }

    state.money -= price;
    state.upgrades[id]++;

    if (id === "table") {
        state.tables.push({
            id: state.tables.length + 1,
            customerId: null
        });
        seatWaitingCustomers();
    }

    if (id === "decor") {
        state.rating = Math.min(
            5,
            Number((state.rating + .15).toFixed(2))
        );
    }

    notify(`${upgrade.name} upgraded!`);
    playSound("success");

    addActivity(
        "⭐",
        `${upgrade.name} upgraded`,
        `Upgrade level ${state.upgrades[id]}`
    );

    renderAll();
}

/* =====================================================
   16. RESTAURANT RENDERING
===================================================== */

function renderRestaurant() {
    const tablesArea = $("tablesArea");
    const customerArea = $("customerArea");
    const management = $("tableManagement");
    const queueContainer = $("customerQueue");

    if (!tablesArea || !customerArea) return;

    tablesArea.innerHTML = "";
    customerArea.innerHTML = "";

    state.tables.forEach(table => {
        const occupied = Boolean(table.customerId);

        const element = document.createElement("div");
        element.className = `restaurant-table ${occupied ? "occupied" : ""}`;
        element.textContent = occupied ? "🍽️" : "🪑";
        element.title = `Table ${table.id}`;

        tablesArea.appendChild(element);
    });

    state.customers.forEach((customer, index) => {
        if (customer.tableId === null) return;

        const character = document.createElement("div");
        character.className = "customer-character";
        character.textContent = customer.mood === "😠"
            ? "😠"
            : customer.emoji;

        character.style.left =
            `${20 + (index % 5) * 17}%`;

        character.title = customer.name;

        customerArea.appendChild(character);
    });

    if (management) {
        management.innerHTML = "";

        state.tables.forEach(table => {
            const customer = getCustomer(table.customerId);

            const row = document.createElement("div");
            row.className = "table-row";

            const left = document.createElement("span");
            left.textContent = `🪑 Table ${table.id}`;

            const right = document.createElement("strong");
            right.textContent = customer
                ? `${customer.emoji} ${customer.name}`
                : "Available";

            row.append(left, right);
            management.appendChild(row);
        });
    }

    if (queueContainer) {
        queueContainer.innerHTML = "";

        if (!state.queue.length) {
            queueContainer.innerHTML =
                '<div class="empty-state">🌊 No customers waiting.</div>';
        }

        state.queue.forEach(id => {
            const customer = getCustomer(id);
            if (!customer) return;

            const row = document.createElement("div");
            row.className = "queue-row";

            const person = document.createElement("div");
            person.className = "queue-person";

            const avatar = document.createElement("span");
            avatar.className = "queue-avatar";
            avatar.textContent = customer.emoji;

            const name = document.createElement("strong");
            name.textContent = customer.name;

            person.append(avatar, name);

            const patience = document.createElement("span");
            patience.textContent = `⏳ ${Math.max(0, customer.patience)}s`;

            row.append(person, patience);
            queueContainer.appendChild(row);
        });
    }

    $("guestCount").textContent = state.customers.length;
    $("queueCount").textContent = `${state.queue.length} Waiting`;
    $("tableCapacity").textContent =
        `${state.tables.length} Tables`;
}

/* =====================================================
   17. KITCHEN RENDERING
===================================================== */

function renderKitchen() {
    const container = $("kitchenOrders");
    if (!container) return;

    container.innerHTML = "";

    const activeOrders = state.orders.filter(
        order => order.status !== "served"
    );

    $("orderCount").textContent =
        `${activeOrders.length} Orders`;

    if (!activeOrders.length) {
        container.innerHTML =
            '<div class="empty-state">🍳 No orders yet. Wait for customers!</div>';
    }

    activeOrders.forEach(order => {
        const menu = getMenu(order.menuId);
        const customer = getCustomer(order.customerId);

        const card = document.createElement("div");
        card.className = "order-card";

        const heading = document.createElement("h4");
        heading.textContent = `${menu.emoji} ${menu.name}`;

        const customerText = document.createElement("p");
        customerText.textContent =
            `Customer: ${customer?.name || "Guest"}`;

        const priceText = document.createElement("p");
        priceText.textContent = `Price: ${moneyFormat(menu.price)} coins`;

        const status = document.createElement("span");
        status.className = `status-badge status-${order.status}`;
        status.textContent = order.status.toUpperCase();

        card.append(heading, customerText, priceText, status);

        if (order.status === "pending") {
            const button = document.createElement("button");
            button.className = "order-action";
            button.textContent = "🔥 Cook Order";
            button.addEventListener("click", () => cookOrder(order.id));
            card.appendChild(button);
        }

        if (order.status === "cooking") {
            const stove = state.stoves.find(
                item => item.orderId === order.id
            );

            const text = document.createElement("p");
            text.textContent =
                `🔥 Cooking on Stove ${stove?.id || "?"}`;

            card.appendChild(text);
        }

        if (order.status === "ready") {
            const button = document.createElement("button");
            button.className = "order-action serve";
            button.textContent = "🍽️ Serve Customer";
            button.addEventListener("click", () => serveOrder(order.id));
            card.appendChild(button);
        }

        container.appendChild(card);
    });

    renderStoves();
}

/* =====================================================
   18. MENU RENDERING
===================================================== */

function renderMenu() {
    const container = $("menuGrid");
    if (!container) return;

    container.innerHTML = "";

    $("menuLevel").textContent = `LEVEL ${state.level}`;

    let filteredMenu = menuItems;

    if (state.filter === "unlocked") {
        filteredMenu = menuItems.filter(
            item => item.unlock <= state.level
        );
    }

    if (state.filter === "locked") {
        filteredMenu = menuItems.filter(
            item => item.unlock > state.level
        );
    }

    filteredMenu.forEach(item => {
        const unlocked = item.unlock <= state.level;

        const card = document.createElement("div");
        card.className = `menu-card ${unlocked ? "" : "menu-locked"}`;

        const image = document.createElement("div");
        image.className = "menu-image";
        image.textContent = item.emoji;

        if (!unlocked) {
            const lock = document.createElement("div");
            lock.className = "lock-overlay";
            lock.textContent = "🔒";
            image.appendChild(lock);
        }

        const info = document.createElement("div");
        info.className = "menu-info";

        const title = document.createElement("h3");
        title.textContent = item.name;

        const description = document.createElement("p");
        description.textContent = item.description;

        const meta = document.createElement("div");
        meta.className = "menu-meta";

        const price = document.createElement("span");
        price.className = "menu-price";
        price.textContent = unlocked
            ? `🪙 ${moneyFormat(item.price)}`
            : "???";

        const unlock = document.createElement("span");
        unlock.className = "menu-unlock";
        unlock.textContent = unlocked
            ? `⏱️ ${item.cookTime}s`
            : `🔒 Level ${item.unlock}`;

        meta.append(price, unlock);
        info.append(title, description, meta);
        card.append(image, info);

        container.appendChild(card);
    });
}

function bindMenuFilters() {
    document.querySelectorAll(".filter-btn").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");
            state.filter = button.dataset.filter;

            renderMenu();
        });
    });
}

/* =====================================================
   19. INVENTORY RENDERING
===================================================== */

function renderInventory() {
    const container = $("inventoryGrid");
    if (!container) return;

    container.innerHTML = "";

    let total = 0;
    let totalCost = 0;

    Object.entries(ingredientData).forEach(([id, item]) => {
        const stock = state.inventory[id];

        total += stock;
        totalCost += item.price * 5;

        const card = document.createElement("div");
        card.className = "inventory-item";

        const emoji = document.createElement("div");
        emoji.className = "inventory-emoji";
        emoji.textContent = item.emoji;

        const name = document.createElement("h3");
        name.textContent = item.name;

        const description = document.createElement("p");
        description.textContent = `Restock price: ${item.price} coins each`;

        const quantity = document.createElement("div");
        quantity.className = `stock-number ${stock <= 3 ? "stock-low" : ""}`;
        quantity.textContent = `${stock} units`;

        const button = document.createElement("button");
        button.className = "small-btn";
        button.textContent = `Restock +5 · ${item.price * 5} coins`;
        button.addEventListener("click", () => restockIngredient(id));

        card.append(emoji, name, description, quantity, button);
        container.appendChild(card);
    });

    $("totalIngredients").textContent = total;
    $("restockCost").textContent = moneyFormat(totalCost);
}

/* =====================================================
   20. UPGRADE RENDERING
===================================================== */

function renderUpgrades() {
    const container = $("upgradeGrid");
    if (!container) return;

    container.innerHTML = "";

    upgrades.forEach(upgrade => {
        const current = state.upgrades[upgrade.id];
        const maxed = current >= upgrade.max;
        const price = upgrade.price * (current + 1);

        const card = document.createElement("div");
        card.className = "upgrade-card";

        const icon = document.createElement("div");
        icon.className = "upgrade-icon";
        icon.textContent = upgrade.emoji;

        const title = document.createElement("h3");
        title.textContent = upgrade.name;

        const description = document.createElement("p");
        description.textContent =
            `${upgrade.description} Current level: ${current}/${upgrade.max}`;

        const priceText = document.createElement("div");
        priceText.className = "upgrade-price";
        priceText.textContent = maxed
            ? "MAXIMUM LEVEL"
            : `🪙 ${moneyFormat(price)}`;

        const button = document.createElement("button");
        button.className = "upgrade-btn";
        button.disabled = maxed || state.money < price;
        button.textContent = maxed ? "Fully Upgraded" : "Purchase Upgrade";

        button.addEventListener("click", () => {
            purchaseUpgrade(upgrade.id);
        });

        card.append(icon, title, description, priceText, button);
        container.appendChild(card);
    });
}

/* =====================================================
   21. DASHBOARD
===================================================== */

function renderProgress() {
    $("levelBadge").textContent = `LV. ${state.level}`;
    $("levelNumber").textContent = state.level;

    $("levelName").textContent =
        levelNames[state.level] || "Master Seafood Restaurant";

    $("xpText").textContent =
        `${state.xp} / ${state.xpNeeded} XP`;

    $("xpProgress").style.width =
        `${state.xp / state.xpNeeded * 100}%`;

    const nextLevel = state.level + 1;

    $("nextReward").textContent =
        `New Menu + Stove · Level ${nextLevel}`;

    $("ownerLevel").textContent =
        `Level ${state.level} · ${levelNames[state.level] || "Master Chef"}`;
}

function renderDashboard() {
    $("moneyDisplay").textContent = moneyFormat(state.money);
    $("gemDisplay").textContent = state.gems;

    $("totalRevenue").textContent =
        moneyFormat(state.totalRevenue);

    $("customersServed").textContent =
        state.customersServed;

    $("restaurantRating").textContent =
        state.rating.toFixed(1);

    $("dayNumber").textContent =
        `Day ${state.day}`;

    $("stoveTotal").textContent =
        state.stoves.length;

    renderProgress();
    checkChallenge();
    checkDailyGoal();
}

/* =====================================================
   22. DAY SYSTEM
===================================================== */

function endDay() {
    if (state.dayServed < 1) {
        notify("Serve at least one customer before ending the day!", "warning");
        return;
    }

    state.stoves.forEach(stove => {
        if (stove.interval) {
            clearInterval(stove.interval);
            stove.interval = null;
        }

        stove.orderId = null;
        stove.progress = 0;
    });

    state.orders = [];
    state.customers = [];
    state.queue = [];

    state.tables.forEach(table => {
        table.customerId = null;
    });

    const bonus = state.dailyRevenue >= 500 ? 200 : 50;

    state.money += bonus;
    state.day++;
    state.dailyRevenue = 0;
    state.dayServed = 0;
    state.challengeCompleted = false;

    notify(`New day! You received ${bonus} bonus coins.`);
    addActivity("🌅", `Day ${state.day} started`, "A fresh day at Ocean Bites!");

    renderAll();
}

/* =====================================================
   23. GAME LOOP
===================================================== */

function gameLoop() {
    if (!state.gameStarted) return;

    updateCustomerPatience();

    // Automatically begin a new day after a busy day.
    if (state.dayServed >= 10) {
        endDay();
    }
}

function startGame() {
    if (state.gameStarted) return;

    state.gameStarted = true;

    addActivity(
        "🌊",
        "Ocean Bites is now open!",
        "Your first restaurant day has begun."
    );

    createCustomer();

    state.customerTimer = setInterval(() => {
        if (!state.gameStarted) return;

        if (state.customers.length < state.tables.length + 4) {
            createCustomer();
        }
    }, 8000);

    state.gameTimer = setInterval(gameLoop, 1000);

    renderAll();

    notify("🌊 Ocean Bites is officially open!");
}

/* =====================================================
   24. SOUND TOGGLE
===================================================== */

function bindSound() {
    const button = $("soundToggle");
    if (!button) return;

    button.addEventListener("click", () => {
        state.sound = !state.sound;

        button.querySelector("span:last-child").textContent =
            `Sound: ${state.sound ? "ON" : "OFF"}`;

        notify(`Sound ${state.sound ? "enabled" : "disabled"}.`);
        playSound("click");
    });
}

/* =====================================================
   25. MODAL
===================================================== */

function closeModal() {
    $("modalOverlay")?.classList.remove("active");
}

$("modalClose")?.addEventListener("click", closeModal);

$("modalOverlay")?.addEventListener("click", event => {
    if (event.target === $("modalOverlay")) {
        closeModal();
    }
});

/* =====================================================
   26. RENDER ALL
===================================================== */

function renderAll() {
    renderDashboard();
    renderRestaurant();
    renderKitchen();
    renderMenu();
    renderInventory();
    renderUpgrades();
}

/* =====================================================
   27. INITIALIZATION
===================================================== */

function initializeGame() {
    bindNavigation();
    bindMenuFilters();
    bindSound();

    renderAll();

    startGame();

    console.log("🌊 Ocean Bites initialized successfully!");
}

document.addEventListener("DOMContentLoaded", initializeGame);
