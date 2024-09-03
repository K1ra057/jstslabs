function calculateIceCreamPrice(): void {
    const sizeInput = prompt("Виберіть розмір морозива: маленький (10 грн) або великий (25 грн)");
    if (sizeInput === null) {
        console.log("Розмір морозива не вибрано.");
        return;
    }
    const size = sizeInput.toLowerCase();
    let price = 0;

    if (size === "маленький") {
        price += 10;
    } else if (size === "великий") {
        price += 25;
    } else {
        console.log("Невірний розмір морозива.");
        return;
    }

    const toppingsInput = prompt("Виберіть начинку (можна вибрати кілька, розділяючи комою): шоколад (+5 грн), карамель (+6 грн), ягоди (+10 грн)");
    if (toppingsInput === null) {
        console.log("Начинка не вибрана.");
        return;
    }
    let toppings = toppingsInput.toLowerCase().split(",").map(t => t.trim());

    toppings = toppings.filter(t => t !== "");

    if (toppings.length === 0) {
        console.log("Потрібно вибрати щонайменше одну начинку.");
        return;
    }

    if (toppings.includes("шоколад")) {
        price += 5;
    }
    if (toppings.includes("карамель")) {
        price += 6;
    }
    if (toppings.includes("ягоди")) {
        price += 10;
    }

    const addMarshmallowInput = prompt("Чи хочете додати маршмелоу? Так/Ні");
    if (addMarshmallowInput !== null && addMarshmallowInput.toLowerCase() === "так") {
        price += 5;
    }

    console.log(`Загальна вартість вашого морозива: ${price} грн.`);
}

calculateIceCreamPrice();
