// Реалізація класу Cat, що імплементує інтерфейс Animal
var Cat = /** @class */ (function () {
    function Cat(name, age) {
        this.name = name;
        this.age = age;
    }
    Cat.prototype.move = function () {
        if (this.age) {
            console.log("".concat(this.name, ", aged ").concat(this.age, ", is walking gracefully."));
        }
        else {
            console.log("".concat(this.name, " is walking gracefully."));
        }
    };
    return Cat;
}());
// Реалізація класу Bird, що імплементує інтерфейс Animal
var Bird = /** @class */ (function () {
    function Bird(name, age) {
        this.name = name;
        this.age = age;
    }
    Bird.prototype.move = function () {
        if (this.age) {
            console.log("".concat(this.name, ", aged ").concat(this.age, ", is flying high."));
        }
        else {
            console.log("".concat(this.name, " is flying high."));
        }
    };
    return Bird;
}());
// Реалізація класу Fish, що імплементує інтерфейс Animal
var Fish = /** @class */ (function () {
    function Fish(name, age) {
        this.name = name;
        this.age = age;
    }
    Fish.prototype.move = function () {
        if (this.age) {
            console.log("".concat(this.name, ", aged ").concat(this.age, ", is swimming swiftly."));
        }
        else {
            console.log("".concat(this.name, " is swimming swiftly."));
        }
    };
    return Fish;
}());
var cat = new Cat("Whiskers", 3);
cat.move();
var bird = new Bird("Tweety");
bird.move();
var fish = new Fish("Nemo", 2);
fish.move();
