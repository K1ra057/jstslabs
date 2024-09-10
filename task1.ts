interface Animal {
    name: string;         
    age?: number;         
    move(): void;         
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

const cat = new Cat("Whiskers", 3);
cat.move();  

const bird = new Bird("Tweety");
bird.move(); 

const fish = new Fish("Nemo", 2);
fish.move(); 
