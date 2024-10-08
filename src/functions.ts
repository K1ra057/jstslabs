// functions.ts

// Функция принимает строку и число с параметром по умолчанию
function greet(name: string, age: number = 30): void {
    console.log(`Привіт, ${name}! Тобі ${age} лет.`);
}

// Примеры использования функции
greet("Ваня");        // Число не передано, будет использовано значение по умолчанию 30
greet("Таня", 25);      // Число передано, будет использовано 25
