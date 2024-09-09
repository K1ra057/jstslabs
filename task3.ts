// Абстрактний клас Car
abstract class Car {
    // Властивості
    protected brand: string;   // protected: доступна тільки в самому класі та в його похідних
    protected model: string;
    private year: number;      // private: доступна тільки в цьому класі
    public color: string;      // public: доступна всюди
  
    constructor(brand: string, model: string, year: number, color: string) {
      this.brand = brand;
      this.model = model;
      this.year = year;
      this.color = color;
    }
  
    // Абстрактний метод
    abstract getInfo(): void;
  
    // Метод для отримання року (private властивість)
    protected getYear(): number {
      return this.year;
    }
  }
  
  // Клас Toyota, що наслідується від Car
  class Toyota extends Car {
    private price: number;
  
    constructor(model: string, year: number, color: string, price: number) {
      super('Toyota', model, year, color);  // виклик конструктора батьківського класу
      this.price = price;
    }
  
    // Реалізація абстрактного методу
    public getInfo(): void {
      console.log(`Марка: ${this.brand}, Модель: ${this.model}, Рік: ${this.getYear()}, Колір: ${this.color}, Ціна: ${this.price}`);
    }
  }
  
  // Клас BMW, що наслідується від Car
  class BMW extends Car {
    private engineType: string;
  
    constructor(model: string, year: number, color: string, engineType: string) {
      super('BMW', model, year, color);
      this.engineType = engineType;
    }
  
    public getInfo(): void {
      console.log(`Марка: ${this.brand}, Модель: ${this.model}, Рік: ${this.getYear()}, Колір: ${this.color}, Тип двигуна: ${this.engineType}`);
    }
  }
  
  // Клас Tesla, що наслідується від Car
  class Tesla extends Car {
    private batteryCapacity: number;
  
    constructor(model: string, year: number, color: string, batteryCapacity: number) {
      super('Tesla', model, year, color);
      this.batteryCapacity = batteryCapacity;
    }
  
    public getInfo(): void {
      console.log(`Марка: ${this.brand}, Модель: ${this.model}, Рік: ${this.getYear()}, Колір: ${this.color}, Ємність батареї: ${this.batteryCapacity} kWh`);
    }
  }
  
  // Створення екземплярів класів
  
  // Екземпляри Toyota
  const toyotaCamry = new Toyota('Camry', 2021, 'Чорний', 30000);
  const toyotaCorolla = new Toyota('Corolla', 2020, 'Білий', 25000);
  
  // Екземпляри BMW
  const bmwX5 = new BMW('X5', 2022, 'Сірий', 'Hybrid');
  const bmwM3 = new BMW('M3', 2019, 'Червоний', 'Petrol');
  
  // Екземпляри Tesla
  const teslaModelS = new Tesla('Model S', 2023, 'Синій', 100);
  const teslaModelX = new Tesla('Model X', 2021, 'Чорний', 90);
  
  // Виклик методів для виведення інформації
  toyotaCamry.getInfo();
  toyotaCorolla.getInfo();
  bmwX5.getInfo();
  bmwM3.getInfo();
  teslaModelS.getInfo();
  teslaModelX.getInfo();
  