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
// Абстрактний клас Car
var Car = /** @class */ (function () {
    function Car(brand, model, year, color) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.color = color;
    }
    // Метод для отримання року (private властивість)
    Car.prototype.getYear = function () {
        return this.year;
    };
    return Car;
}());
// Клас Toyota, що наслідується від Car
var Toyota = /** @class */ (function (_super) {
    __extends(Toyota, _super);
    function Toyota(model, year, color, price) {
        var _this = _super.call(this, 'Toyota', model, year, color) || this; // виклик конструктора батьківського класу
        _this.price = price;
        return _this;
    }
    // Реалізація абстрактного методу
    Toyota.prototype.getInfo = function () {
        console.log("\u041C\u0430\u0440\u043A\u0430: ".concat(this.brand, ", \u041C\u043E\u0434\u0435\u043B\u044C: ").concat(this.model, ", \u0420\u0456\u043A: ").concat(this.getYear(), ", \u041A\u043E\u043B\u0456\u0440: ").concat(this.color, ", \u0426\u0456\u043D\u0430: ").concat(this.price));
    };
    return Toyota;
}(Car));
// Клас BMW, що наслідується від Car
var BMW = /** @class */ (function (_super) {
    __extends(BMW, _super);
    function BMW(model, year, color, engineType) {
        var _this = _super.call(this, 'BMW', model, year, color) || this;
        _this.engineType = engineType;
        return _this;
    }
    BMW.prototype.getInfo = function () {
        console.log("\u041C\u0430\u0440\u043A\u0430: ".concat(this.brand, ", \u041C\u043E\u0434\u0435\u043B\u044C: ").concat(this.model, ", \u0420\u0456\u043A: ").concat(this.getYear(), ", \u041A\u043E\u043B\u0456\u0440: ").concat(this.color, ", \u0422\u0438\u043F \u0434\u0432\u0438\u0433\u0443\u043D\u0430: ").concat(this.engineType));
    };
    return BMW;
}(Car));
// Клас Tesla, що наслідується від Car
var Tesla = /** @class */ (function (_super) {
    __extends(Tesla, _super);
    function Tesla(model, year, color, batteryCapacity) {
        var _this = _super.call(this, 'Tesla', model, year, color) || this;
        _this.batteryCapacity = batteryCapacity;
        return _this;
    }
    Tesla.prototype.getInfo = function () {
        console.log("\u041C\u0430\u0440\u043A\u0430: ".concat(this.brand, ", \u041C\u043E\u0434\u0435\u043B\u044C: ").concat(this.model, ", \u0420\u0456\u043A: ").concat(this.getYear(), ", \u041A\u043E\u043B\u0456\u0440: ").concat(this.color, ", \u0404\u043C\u043D\u0456\u0441\u0442\u044C \u0431\u0430\u0442\u0430\u0440\u0435\u0457: ").concat(this.batteryCapacity, " kWh"));
    };
    return Tesla;
}(Car));
// Створення екземплярів класів
// Екземпляри Toyota
var toyotaCamry = new Toyota('Camry', 2021, 'Чорний', 30000);
var toyotaCorolla = new Toyota('Corolla', 2020, 'Білий', 25000);
// Екземпляри BMW
var bmwX5 = new BMW('X5', 2022, 'Сірий', 'Hybrid');
var bmwM3 = new BMW('M3', 2019, 'Червоний', 'Petrol');
// Екземпляри Tesla
var teslaModelS = new Tesla('Model S', 2023, 'Синій', 100);
var teslaModelX = new Tesla('Model X', 2021, 'Чорний', 90);
// Виклик методів для виведення інформації
toyotaCamry.getInfo();
toyotaCorolla.getInfo();
bmwX5.getInfo();
bmwM3.getInfo();
teslaModelS.getInfo();
teslaModelX.getInfo();
