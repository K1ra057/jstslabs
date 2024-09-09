// Абстрактний клас Employee, що імплементує Payable
abstract class Employee implements Payable {
    protected name: string;
    protected age: number;
    protected salary: number;
  
    constructor(name: string, age: number, salary: number) {
      this.name = name;
      this.age = age;
      this.salary = salary;
    }
  
    // Абстрактний метод для обчислення річного бонусу
    abstract getAnnualBonus(): number;
  
    // Абстрактний метод з інтерфейсу Payable
    abstract pay(): void;
  }
  
  // Інтерфейс Payable
  interface Payable {
    pay(): void;
  }
  
  // Клас Developer, що наслідує Employee
  class Developer extends Employee {
    constructor(name: string, age: number, salary: number) {
      super(name, age, salary);
    }
  
    // Реалізація методу для обчислення річного бонусу
    public getAnnualBonus(): number {
      return this.salary * 0.1;  // 10% від зарплати
    }
  
    // Реалізація методу з інтерфейсу Payable
    public pay(): void {
      console.log(`Developer ${this.name} отримує зарплату: ${this.salary}`);
    }
  }
  
  // Клас Manager, що наслідує Employee
  class Manager extends Employee {
    constructor(name: string, age: number, salary: number) {
      super(name, age, salary);
    }
  
    // Реалізація методу для обчислення річного бонусу
    public getAnnualBonus(): number {
      return this.salary * 0.2;  // 20% від зарплати
    }
  
    // Реалізація методу з інтерфейсу Payable
    public pay(): void {
      console.log(`Manager ${this.name} отримує зарплату: ${this.salary}`);
    }
  }
  
  // Створення масиву співробітників
  const employees: Employee[] = [
    new Developer('Олександр', 25, 50000),
    new Developer('Марія', 30, 60000),
    new Manager('Іван', 40, 80000),
    new Manager('Олена', 35, 90000),
  ];
  
  // Підрахунок загальної річної суми бонусів
  let totalBonus = 0;
  
  employees.forEach((employee) => {
    // Виклик методу pay() для кожного співробітника
    employee.pay();
  
    // Додавання бонусу до загальної суми
    totalBonus += employee.getAnnualBonus();
  });
  
  console.log(`Загальна річна сума бонусів для всіх співробітників: ${totalBonus}`);
  