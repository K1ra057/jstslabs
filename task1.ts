// Описуємо інтерфейс Animal з властивостями та методом
interface Animal {
    name: string;         // Ім'я тварини (обов'язкова властивість)
    age?: number;         // Вік тварини (опціональна властивість)
    move(): void;         // Метод для опису способу пересування
}

// Реалізація класу Cat, що імплементує інтерфейс Animal
class Cat implements Animal {
    name: string;
    age?: number;

    constructor(name: string, age?: number) {
        this.name = name;
        this.age = age;
    }

    move(): void {
        if (this.age) {
            console.log(`${this.name}, aged ${this.age}, is walking gracefully.`);
        } else {
            console.log(`${this.name} is walking gracefully.`);
        }
    }
}

// Реалізація класу Bird, що імплементує інтерфейс Animal
class Bird implements Animal {
    name: string;
    age?: number;

    constructor(name: string, age?: number) {
        this.name = name;
        this.age = age;
    }

    move(): void {
        if (this.age) {
            console.log(`${this.name}, aged ${this.age}, is flying high.`);
        } else {
            console.log(`${this.name} is flying high.`);
        }
    }
}

// Реалізація класу Fish, що імплементує інтерфейс Animal
class Fish implements Animal {
    name: string;
    age?: number;

    constructor(name: string, age?: number) {
        this.name = name;
        this.age = age;
    }

    move(): void {
        if (this.age) {
            console.log(`${this.name}, aged ${this.age}, is swimming swiftly.`);
        } else {
            console.log(`${this.name} is swimming swiftly.`);
        }
    }
}

// Створюємо екземпляри класів з віком і без віку
const cat = new Cat("Whiskers", 3);
cat.move();  // Whiskers, aged 3, is walking gracefully.

const bird = new Bird("Tweety");
bird.move(); // Tweety is flying high.

const fish = new Fish("Nemo", 2);
fish.move(); // Nemo, aged 2, is swimming swiftly.
