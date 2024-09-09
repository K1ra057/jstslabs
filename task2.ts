interface Shape {
    getArea(): number;
    getPerimeter(): number;
    scale(factor: number): void;
}
class Circle implements Shape {
    constructor(private radius: number) {}

    getArea(): number {
        return Math.PI * Math.pow(this.radius, 2);
    }

    getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    scale(factor: number): void {
        this.radius *= factor;
    }
}
class Rectangle implements Shape {
    constructor(private width: number, private height: number) {}

    getArea(): number {
        return this.width * this.height;
    }

    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }

    scale(factor: number): void {
        this.width *= factor;
        this.height *= factor;
    }
}
class Triangle implements Shape {
    constructor(private sideA: number, private sideB: number, private sideC: number) {}

    getArea(): number {
        const s = (this.sideA + this.sideB + this.sideC) / 2;
        return Math.sqrt(s * (s - this.sideA) * (s - this.sideB) * (s - this.sideC));
    }

    getPerimeter(): number {
        return this.sideA + this.sideB + this.sideC;
    }

    scale(factor: number): void {
        this.sideA *= factor;
        this.sideB *= factor;
        this.sideC *= factor;
    }
}
const shapes: Shape[] = [
    new Circle(5),
    new Rectangle(4, 6),
    new Triangle(3, 4, 5)
];

let totalArea = 0;
let totalPerimeter = 0;

shapes.forEach(shape => {
    shape.scale(10);  // Збільшуємо всі фігури в 2 рази

    totalArea += shape.getArea();
    totalPerimeter += shape.getPerimeter();
});



console.log("Total Area: ", totalArea);
console.log("Total Perimeter: ", totalPerimeter);
