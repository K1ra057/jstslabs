var Circle = /** @class */ (function () {
    function Circle(radius) {
        this.radius = radius;
    }
    Circle.prototype.getArea = function () {
        return Math.PI * Math.pow(this.radius, 2);
    };
    Circle.prototype.getPerimeter = function () {
        return 2 * Math.PI * this.radius;
    };
    Circle.prototype.scale = function (factor) {
        this.radius *= factor;
    };
    return Circle;
}());
var Rectangle = /** @class */ (function () {
    function Rectangle(width, height) {
        this.width = width;
        this.height = height;
    }
    Rectangle.prototype.getArea = function () {
        return this.width * this.height;
    };
    Rectangle.prototype.getPerimeter = function () {
        return 2 * (this.width + this.height);
    };
    Rectangle.prototype.scale = function (factor) {
        this.width *= factor;
        this.height *= factor;
    };
    return Rectangle;
}());
var Triangle = /** @class */ (function () {
    function Triangle(sideA, sideB, sideC) {
        this.sideA = sideA;
        this.sideB = sideB;
        this.sideC = sideC;
    }
    Triangle.prototype.getArea = function () {
        var s = (this.sideA + this.sideB + this.sideC) / 2;
        return Math.sqrt(s * (s - this.sideA) * (s - this.sideB) * (s - this.sideC));
    };
    Triangle.prototype.getPerimeter = function () {
        return this.sideA + this.sideB + this.sideC;
    };
    Triangle.prototype.scale = function (factor) {
        this.sideA *= factor;
        this.sideB *= factor;
        this.sideC *= factor;
    };
    return Triangle;
}());
var shapes = [
    new Circle(5),
    new Rectangle(4, 6),
    new Triangle(3, 4, 5)
];
var totalArea = 0;
var totalPerimeter = 0;
shapes.forEach(function (shape) {
    shape.scale(10); // Збільшуємо всі фігури в 2 рази
    totalArea += shape.getArea();
    totalPerimeter += shape.getPerimeter();
});
console.log("Total Area: ", totalArea);
console.log("Total Perimeter: ", totalPerimeter);
