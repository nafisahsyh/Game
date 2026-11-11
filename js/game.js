
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const $ = id => document.getElementById(id);

    const state = {
        coins: 500,
        level: 1,
        xp: 0,
        served: 0,
        day: 1,
        selectedOrder: null,
        sound: true,
        nextOrderId: 1,
        tables: [
            { id: 1, customer: null },
            { id: 2, customer: null }
        ],
        stoves: [
            { id: 1, orderId: null }
        ],
        orders: [],
        inventory: {
            shrimp: 12,
            crab: 8,
            fish: 10,
            rice: 12,
            butter: 10
        }
    };

    const recipes = [
        { id: "shrimp", name: "Butter Shrimp", emoji: "🍤", price: 85, time: 5, level: 1, ingredients: ["shrimp", "butter"] },
        { id: "crab", name: "Grilled Crab", emoji: "🦀", price: 110, time: 7, level: 1, ingredients: ["crab", "butter"] },
        { id: "fish", name: "Grilled Fish", emoji: "🐟", price: 95, time: 6, level: 1, ingredients: ["fish", "butter"] },
        { id: "rice", name: "Seafood Rice Bowl", emoji: "🍚", price: 145, time: 8, level: 2, ingredients: ["shrimp", "rice"] },
        { id: "soup", name: "Seafood Soup", emoji: "🍲", price: 175, time: 10, level: 3, ingredients: ["crab", "fish"] },
        { id: "lobster", name: "Lobster Grill", emoji: "🦞", price: 260, time: 12, level: 4, ingredients: ["crab", "butter"] },
        { id: "platter", name: "Royal Seafood Platter", emoji: "🦐", price: 380, time: 16, level: 5, ingredients: ["shrimp", "crab", "fish"] }
    ];

    const ingredientInfo = {
        shrimp: { name: "Udang", emoji: "🍤", price: 25 },
        crab: { name: "Kepiting", emoji: "🦀", price: 30 },
        fish: { name: "Ikan", emoji: "🐟", price: 25 },
        rice: { name: "Beras", emoji: "🍚", price: 15 },
        butter: { name: "Mentega", emoji: "🧈", price: 15 }
    };

    const customers = [
        { name: "Mimi", emoji: "👩🏻‍🦰" },
        { name: "Bobby", emoji: "👨🏽" },
        { name: "Luna", emoji: "👩🏼" },
        { name: "Kiko", emoji: "👨🏻‍🦱" },
        { name: "Mochi", emoji: "👧🏻" },
        { name: "Dodo", emoji: "👨🏼‍🦰" },
        { name: "Nana", emoji: "👩🏽‍🦱" }
    ];

    const shopItems = [
        { id: "stove", name: "Kompor tambahan", emoji: "🔥", price: 500, description: "Memasak satu pesanan tambahan secara bersamaan." },
        { id: "table", name: "Meja makan", emoji: "🪑", price: 350, description: "Menambah satu tempat duduk pelanggan." },
        { id: "plant", name: "Tanaman hias", emoji: "🪴", price: 180, description: "Mempercantik restoran." },
        { id: "window", name: "Jendela laut", emoji: "🌊", price: 450, description: "Dekorasi pemandangan laut." }
    ];

    let toastTimer;
    let arrivalTimer;
    let gameIntervals = [];
    let selectedCustomerOrder = null;

    function notify(message) {
        const toast = $("toast");
        toast.textContent = message;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
    }

    function updateStats() {
        $("coins").textContent = state.coins.toLocaleString("id-ID");
        $("level").textContent = state.level;
        $("served").textContent = state.served;
        $("dayLabel").textContent = `Hari ${state.day} • Restoran sedang buka`;
    }

    function addCoins(amount) {
        state.coins += amount;
        updateStats();
    }

    function addXP(amount) {
        state.xp += amount;
        const required = state.level * 100;

        if (state.xp >= required) {
            state.xp -= required;
            state.level++;
            notify(`🎉 Level naik! Sekarang level ${state.level}`);
        }

        updateStats();
    }

    function getRecipe(id) {
        return recipes.find(recipe => recipe.id === id);
    }

    function getAvailableRecipes() {
        return recipes.filter(recipe => recipe.level <= state.level);
    }

    function findFreeTable() {
        return state.tables.find(table => !table.customer);
    }

    function findOrder(id) {
        return state.orders.find(order => order.id === id);
    }

    function createCustomer() {
        const table = findFreeTable();

        if (!table) {
            notify("Semua meja sedang terisi!");
            return;
        }

        const customer = customers[Math.floor(Math.random() * customers.length)];
        const menu = getAvailableRecipes();
        const recipe = menu[Math.floor(Math.random() * menu.length)];

        const order = {
            id: state.nextOrderId++,
            tableId: table.id,
            customer,
            recipeId: recipe.id,
            status: "waiting",
            patience: 100,
            cookProgress: 0,
            cookTimer: null
        };

        table.customer = order.id;
        state.orders.push(order);

        renderRestaurant();
        renderOrders();
        updateStats();
        notify(`${customer.name} datang dan memesan ${recipe.name}!`);
    }

    function renderRestaurant() {
        const tablesArea = $("tablesArea");

        state.tables.forEach(table => {
            let element = document.getElementById(`table-${table.id}`);

            if (!element) {
                element = document.createElement("div");
                element.className = "dining-table";
                element.id = `table-${table.id}`;
                element.dataset.table = table.id;
                element.innerHTML = `
                    <div class="table-top">🍽️</div>
                    <span>MEJA ${table.id}</span>
                    <div class="table-customer" id="customer-${table.id}"></div>
                `;
                tablesArea.appendChild(element);
            }

            const customerElement = $(`customer-${table.id}`);
            const order = table.customer ? findOrder(table.customer) : null;

            customerElement.textContent = order ? order.customer.emoji : "";
            customerElement.title = order ? `${order.customer.name} - klik untuk pesanan` : "";
            element.classList.toggle("occupied", Boolean(order));
        });

        renderStoves();
    }

    function renderStoves() {
        const area = $("stoveArea");

        state.stoves.forEach(stove => {
            let element = $(`stove-${stove.id}`);

            if (!element) {
                element = document.createElement("div");
                element.className = "stove";
                element.id = `stove-${stove.id}`;
                element.dataset.stove = stove.id;
                element.innerHTML = `
                    <span>🔥</span>
                    <small>KOMPOR ${stove.id}</small>
                    <div class="stove-status">Siap</div>
                `;
                area.appendChild(element);
            }

            const order = stove.orderId ? findOrder(stove.orderId) : null;
            const status = element.querySelector(".stove-status");

            if (status) {
                status.textContent = order ? "Memasak..." : "Siap";
            }

            element.classList.toggle("cooking", Boolean(order));
        });
    }


    function renderOrders() {
        const container = $("ordersList");
        $("orderCount").textContent = `${state.orders.length} pesanan`;

        if (state.orders.length === 0) {
            container.innerHTML = `
            <div class="empty-state">
                🐠 Belum ada pelanggan. Tunggu sebentar...
            </div>
        `;
            return;
        }

        container.innerHTML = "";

        state.orders.forEach(order => {
            const recipe = getRecipe(order.recipeId);
            const card = document.createElement("div");
            card.className = `order-card ${state.selectedOrder === order.id ? "selected" : ""}`;

            let statusText = "Menunggu dimasak";
            let buttonText = "Pilih Pesanan";
            let buttonClass = "select-button";

            if (order.status === "cooking") {
                statusText = `Sedang dimasak ${Math.floor(order.cookProgress)}%`;
                buttonText = "Sedang Dimasak";
            }

            if (order.status === "ready") {
                statusText = "Makanan siap disajikan!";
                buttonText = `🍽️ Sajikan • 🪙 ${recipe.price}`;
                buttonClass = "serve-button";
            }

            card.innerHTML = `
            <strong>${order.customer.emoji} ${order.customer.name}</strong>
            <small>${recipe.emoji} ${recipe.name}</small>
            <small>${statusText}</small>
            <button type="button" class="${buttonClass}">
                ${buttonText}
            </button>
        `;

            const button = card.querySelector("button");

            button.addEventListener("click", event => {
                event.stopPropagation();

                if (order.status === "ready") {
                    serveOrder(order.id);
                    return;
                }

                if (order.status === "waiting") {
                    state.selectedOrder = order.id;
                    renderOrders();
                    showHint(order);
                    notify(`Pesanan ${recipe.name} dipilih! Sekarang klik kompor.`);
                }
            });

            card.addEventListener("click", () => {
                state.selectedOrder = order.id;
                renderOrders();
                showHint(order);
            });

            if (order.status === "waiting") {
                card.draggable = true;

                card.addEventListener("dragstart", event => {
                    event.dataTransfer.setData("text/plain", String(order.id));
                    state.selectedOrder = order.id;
                });
            }

            container.appendChild(card);
        });
    }

    function showHint(order) {
        const recipe = getRecipe(order.recipeId);
        const messages = {
            waiting: `${order.customer.name} memesan ${recipe.name}. Pilih pesanan, lalu klik atau seret ke kompor.`,
            cooking: `${recipe.name} sedang dimasak. Tunggu sampai matang.`,
            ready: `${recipe.name} sudah siap. Sajikan kepada ${order.customer.name}!`
        };

        $("hint").textContent = `💡 ${messages[order.status]}`;
    }

    function cookOrder(orderId, stoveId) {
        const order = findOrder(orderId);
        const stove = state.stoves.find(item => item.id === stoveId);
        const recipe = order && getRecipe(order.recipeId);

        if (!order || !stove) return;

        if (order.status !== "waiting") {
            notify("Pesanan ini sudah diproses.");
            return;
        }

        if (stove.orderId) {
            notify("Kompor sedang digunakan!");
            return;
        }

        const missing = recipe.ingredients.find(
            ingredient => state.inventory[ingredient] <= 0
        );

        if (missing) {
            notify(`Stok ${ingredientInfo[missing].name} habis!`);
            openInventory();
            return;
        }

        recipe.ingredients.forEach(ingredient => {
            state.inventory[ingredient]--;
        });

        stove.orderId = order.id;
        order.status = "cooking";
        order.cookProgress = 0;

        const duration = recipe.time * 1000;
        const startedAt = Date.now();

        order.cookTimer = setInterval(() => {
            const elapsed = Date.now() - startedAt;
            order.cookProgress = Math.min(100, elapsed / duration * 100);

            if (order.cookProgress >= 100) {
                clearInterval(order.cookTimer);
                order.status = "ready";
                stove.orderId = null;
                renderStoves();
                renderOrders();
                showHint(order);
                notify(`${recipe.name} sudah matang! 🍽️`);
            } else {
                renderOrders();
            }
        }, 200);

        renderStoves();
        renderOrders();
        showHint(order);
        notify(`Mulai memasak ${recipe.name}!`);
    }

    function serveOrder(orderId) {
        const order = findOrder(orderId);

        if (!order || order.status !== "ready") {
            notify("Makanan belum siap!");
            return;
        }

        const recipe = getRecipe(order.recipeId);
        const bonus = Math.floor(recipe.price * .1);

        addCoins(recipe.price + bonus);
        addXP(20);
        state.served++;

        const table = state.tables.find(item => item.id === order.tableId);
        if (table) table.customer = null;

        state.orders = state.orders.filter(item => item.id !== orderId);
        state.selectedOrder = null;

        renderRestaurant();
        renderOrders();
        updateStats();

        $("hint").textContent = `💡 ${order.customer.name} menikmati makanannya. Terima kasih sudah berkunjung!`;
        notify(`Pesanan selesai! +${recipe.price + bonus} koin ✨`);
    }

    function buyItem(itemId) {
        const item = shopItems.find(product => product.id === itemId);
        if (!item) return;

        if (state.coins < item.price) {
            notify("Koin kamu belum cukup!");
            return;
        }

        if (itemId === "stove") {
            if (state.stoves.length >= 5) {
                notify("Jumlah kompor sudah maksimal!");
                return;
            }
            state.stoves.push({ id: state.stoves.length + 1, orderId: null });
        }

        if (itemId === "table") {
            if (state.tables.length >= 6) {
                notify("Jumlah meja sudah maksimal!");
                return;
            }
            state.tables.push({
                id: state.tables.length + 1,
                customer: null
            });
        }

        if (itemId === "plant") {
            const plant = document.createElement("div");
            plant.className = "plant";
            plant.textContent = "🪴";
            plant.style.left = `${30 + Math.random() * 55}%`;
            plant.style.top = `${40 + Math.random() * 45}%`;
            $("floor").appendChild(plant);
        }

        if (itemId === "window") {
            $("floor").style.backgroundColor = "#d4b88f";
            $("floor").querySelector(".window").style.boxShadow = "0 0 18px #75d8e9";
        }

        state.coins -= item.price;
        updateStats();
        renderRestaurant();
        renderShop();
        notify(`${item.name} berhasil dibeli!`);
    }

    function openModal(content) {
        $("modalContent").innerHTML = content;
        $("modalBackdrop").classList.add("show");
    }

    function closeModal() {
        $("modalBackdrop").classList.remove("show");
    }

    function renderShop() {
        const html = `
            <h2 class="modal-title">🛒 Toko Peralatan</h2>
            <p class="modal-subtitle">Belanja peralatan untuk mengembangkan restoranmu.</p>
            <div class="shop-grid">
                ${shopItems.map(item => {
            const owned = item.id === "stove"
                ? state.stoves.length >= 5
                : item.id === "table"
                    ? state.tables.length >= 6
                    : false;

            return `
                        <div class="shop-item">
                            <div class="item-icon">${item.emoji}</div>
                            <div class="item-info">
                                <strong>${item.name}</strong>
                                <small>${item.description}</small>
                                <small>🪙 ${item.price.toLocaleString("id-ID")}</small>
                            </div>
                            <button class="buy-button" data-buy="${item.id}" ${owned || state.coins < item.price ? "disabled" : ""}>
                                ${owned ? "Penuh" : "Beli"}
                            </button>
                        </div>
                    `;
        }).join("")}
            </div>
        `;

        openModal(html);
        document.querySelectorAll("[data-buy]").forEach(button => {
            button.addEventListener("click", () => buyItem(button.dataset.buy));
        });
    }

    function openInventory() {
        const html = `
            <h2 class="modal-title">🧺 Persediaan Bahan</h2>
            <p class="modal-subtitle">Pastikan bahan makanan selalu tersedia.</p>
            <div class="shop-grid">
                ${Object.entries(state.inventory).map(([id, quantity]) => {
            const item = ingredientInfo[id];
            return `
                        <div class="shop-item">
                            <div class="item-icon">${item.emoji}</div>
                            <div class="item-info">
                                <strong>${item.name}</strong>
                                <small>Stok: ${quantity}</small>
                                <small>Harga isi ulang: 🪙 ${item.price} / 5 buah</small>
                            </div>
                            <button class="buy-button" data-restock="${id}">+5</button>
                        </div>
                    `;
        }).join("")}
            </div>
        `;

        openModal(html);

        document.querySelectorAll("[data-restock]").forEach(button => {
            button.addEventListener("click", () => {
                const id = button.dataset.restock;
                const price = ingredientInfo[id].price;

                if (state.coins < price) {
                    notify("Koin tidak cukup untuk membeli bahan!");
                    return;
                }

                state.coins -= price;
                state.inventory[id] += 5;
                updateStats();
                openInventory();
                notify(`Stok ${ingredientInfo[id].name} bertambah 5!`);
            });
        });
    }

    function openMenu() {
        const html = `
            <h2 class="modal-title">📖 Buku Menu</h2>
            <p class="modal-subtitle">Resep baru akan terbuka seiring perkembangan restoran.</p>
            ${recipes.map(recipe => {
            const unlocked = recipe.level <= state.level;
            return `
                    <div class="menu-item ${unlocked ? "" : "locked"}">
                        <span>${recipe.emoji} ${recipe.name}</span>
                        <span>${unlocked ? `🪙 ${recipe.price}` : `🔒 Level ${recipe.level}`}</span>
                    </div>
                `;
        }).join("")}
        `;
        openModal(html);
    }

    function openUpgrade() {
        const required = state.level * 100;
        openModal(`
            <h2 class="modal-title">✨ Perkembangan Restoran</h2>
            <p class="modal-subtitle">Terus layani pelanggan untuk meningkatkan level restoran.</p>
            <div class="shop-item">
                <div class="item-icon">⭐</div>
                <div class="item-info">
                    <strong>Level ${state.level}</strong>
                    <small>${state.xp} / ${required} XP</small>
                    <small>${Math.max(0, required - state.xp)} XP lagi menuju level berikutnya.</small>
                </div>
            </div>
            <div class="shop-item">
                <div class="item-icon">🔥</div>
                <div class="item-info">
                    <strong>${state.stoves.length} kompor</strong>
                    <small>Kompor tambahan dapat dibeli di toko.</small>
                </div>
            </div>
            <div class="shop-item">
                <div class="item-icon">🪑</div>
                <div class="item-info">
                    <strong>${state.tables.length} meja</strong>
                    <small>Tambahkan meja agar lebih banyak pelanggan dapat dilayani.</small>
                </div>
            </div>
        `);
    }

    function bindWorldInteractions() {
        $("floor").addEventListener("click", event => {
            const stoveElement = event.target.closest(".stove");
            const tableElement = event.target.closest(".dining-table");

            if (stoveElement) {
                const stoveId = Number(stoveElement.dataset.stove);

                if (state.selectedOrder) {
                    cookOrder(state.selectedOrder, stoveId);
                } else {
                    notify("Pilih pesanan terlebih dahulu!");
                }
                return;
            }

            if (tableElement) {
                const tableId = Number(tableElement.dataset.table);
                const table = state.tables.find(item => item.id === tableId);

                if (table?.customer) {
                    const order = findOrder(table.customer);
                    state.selectedOrder = order.id;
                    selectedCustomerOrder = order.id;
                    renderOrders();
                    showHint(order);
                } else {
                    notify("Meja ini masih kosong.");
                }
            }
        });

        $("floor").addEventListener("dragover", event => {
            if (event.target.closest(".stove")) {
                event.preventDefault();
            }
        });

        $("floor").addEventListener("drop", event => {
            const stoveElement = event.target.closest(".stove");
            if (!stoveElement) return;

            event.preventDefault();
            const orderId = Number(event.dataTransfer.getData("text/plain"));
            const stoveId = Number(stoveElement.dataset.stove);

            if (orderId) {
                state.selectedOrder = orderId;
                cookOrder(orderId, stoveId);
            }
        });
    }

    function bindButtons() {
        $("shopButton").addEventListener("click", renderShop);
        $("inventoryButton").addEventListener("click", openInventory);
        $("menuButton").addEventListener("click", openMenu);
        $("upgradeButton").addEventListener("click", openUpgrade);
        $("modalClose").addEventListener("click", closeModal);

        $("modalBackdrop").addEventListener("click", event => {
            if (event.target === $("modalBackdrop")) closeModal();
        });

        $("soundButton").addEventListener("click", () => {
            state.sound = !state.sound;
            $("soundButton").textContent = state.sound ? "🔊" : "🔇";
            notify(state.sound ? "Suara dinyalakan." : "Suara dimatikan.");
        });

        bindWorldInteractions();
    }

    function startGame() {
        updateStats();
        renderRestaurant();
        renderOrders();
        bindButtons();

        setTimeout(createCustomer, 1500);

        arrivalTimer = setInterval(() => {
            if (Math.random() > .15) createCustomer();
        }, 11000);

        const patienceTimer = setInterval(() => {
            state.orders.forEach(order => {
                if (order.status === "waiting") {
                    order.patience -= 5;
                    if (order.patience <= 0) {
                        const table = state.tables.find(item => item.id === order.tableId);
                        if (table) table.customer = null;

                        state.orders = state.orders.filter(item => item.id !== order.id);
                        notify(`${order.customer.name} pergi karena terlalu lama menunggu.`);
                    }
                }
            });

            renderRestaurant();
            renderOrders();
        }, 3000);

        gameIntervals.push(patienceTimer);
    }

    startGame();
});
