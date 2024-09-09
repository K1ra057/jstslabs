var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Абстрактний клас Employee, що імплементує Payable
var Employee = /** @class */ (function () {
    function Employee(name, age, salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
    return Employee;
}());
// Клас Developer, що наслідує Employee
var Developer = /** @class */ (function (_super) {
    __extends(Developer, _super);
    function Developer(name, age, salary) {
        return _super.call(this, name, age, salary) || this;
    }
    // Реалізація методу для обчислення річного бонусу
    Developer.prototype.getAnnualBonus = function () {
        return this.salary * 0.1; // 10% від зарплати
    };
    // Реалізація методу з інтерфейсу Payable
    Developer.prototype.pay = function () {
        console.log("Developer ".concat(this.name, " \u043E\u0442\u0440\u0438\u043C\u0443\u0454 \u0437\u0430\u0440\u043F\u043B\u0430\u0442\u0443: ").concat(this.salary));
    };
    return Developer;
}(Employee));
// Клас Manager, що наслідує Employee
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager(name, age, salary) {
        return _super.call(this, name, age, salary) || this;
    }
    // Реалізація методу для обчислення річного бонусу
    Manager.prototype.getAnnualBonus = function () {
        return this.salary * 0.2; // 20% від зарплати
    };
    // Реалізація методу з інтерфейсу Payable
    Manager.prototype.pay = function () {
        console.log("Manager ".concat(this.name, " \u043E\u0442\u0440\u0438\u043C\u0443\u0454 \u0437\u0430\u0440\u043F\u043B\u0430\u0442\u0443: ").concat(this.salary));
    };
    return Manager;
}(Employee));
// Створення масиву співробітників
var employees = [
    new Developer('Олександр', 25, 50000),
    new Developer('Марія', 30, 60000),
    new Manager('Іван', 40, 80000),
    new Manager('Олена', 35, 90000),
];
// Підрахунок загальної річної суми бонусів
var totalBonus = 0;
employees.forEach(function (employee) {
    // Виклик методу pay() для кожного співробітника
    employee.pay();
    // Додавання бонусу до загальної суми
    totalBonus += employee.getAnnualBonus();
});
console.log("\u0417\u0430\u0433\u0430\u043B\u044C\u043D\u0430 \u0440\u0456\u0447\u043D\u0430 \u0441\u0443\u043C\u0430 \u0431\u043E\u043D\u0443\u0441\u0456\u0432 \u0434\u043B\u044F \u0432\u0441\u0456\u0445 \u0441\u043F\u0456\u0432\u0440\u043E\u0431\u0456\u0442\u043D\u0438\u043A\u0456\u0432: ".concat(totalBonus));
