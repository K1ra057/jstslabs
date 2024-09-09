// Інтерфейс Course
interface Course {
    name: string;
    duration: number; // тривалість у годинах
    students: string[]; // масив студентів
  }
  
  // Клас OnlineCourse, що імплементує інтерфейс Course
  class OnlineCourse implements Course {
    name: string;
    duration: number;
    students: string[];
  
    constructor(name: string, duration: number) {
      this.name = name;
      this.duration = duration;
      this.students = [];
    }
  
    // Метод для реєстрації студентів
    registerStudent(student: string): void {
      if (!this.isStudentRegistered(student)) {
        this.students.push(student);
        console.log(`${student} зареєстрований на курс ${this.name}`);
      } else {
        console.log(`${student} вже зареєстрований на курс ${this.name}`);
      }
    }
  
    // Метод для перевірки, чи студент вже зареєстрований
    isStudentRegistered(student: string): boolean {
      return this.students.includes(student);
    }
  }
  
  // Клас CourseManager, що керує курсами
  class CourseManager {
    private courses: Course[] = [];
  
    // Метод для додавання курсу
    addCourse(course: Course): void {
      this.courses.push(course);
      console.log(`Курс ${course.name} доданий`);
    }
  
    // Метод для видалення курсу
    removeCourse(courseName: string): void {
      const index = this.courses.findIndex(course => course.name === courseName);
      if (index !== -1) {
        this.courses.splice(index, 1);
        console.log(`Курс ${courseName} видалений`);
      } else {
        console.log(`Курс ${courseName} не знайдений`);
      }
    }
  
    // Метод для пошуку курсу за назвою
    findCourse(courseName: string): Course | undefined {
      return this.courses.find(course => course.name === courseName);
    }
  
    // Метод для виведення всіх курсів і студентів
    listCourses(): void {
      this.courses.forEach(course => {
        console.log(`Курс: ${course.name}, Тривалість: ${course.duration} годин`);
        console.log(`Студенти: ${course.students.join(', ') || 'Немає студентів'}`);
      });
    }
  }
  
  // Створення курсів
  const jsCourse = new OnlineCourse('JavaScript', 40);
  const tsCourse = new OnlineCourse('TypeScript', 30);
  
  // Створення CourseManager
  const courseManager = new CourseManager();
  
  // Додавання курсів
  courseManager.addCourse(jsCourse);
  courseManager.addCourse(tsCourse);
  
  // Реєстрація студентів на курс
  jsCourse.registerStudent('Олександр');
  jsCourse.registerStudent('Марія');
  tsCourse.registerStudent('Олена');
  tsCourse.registerStudent('Марія');
  
  // Перевірка чи студент зареєстрований
  console.log(jsCourse.isStudentRegistered('Олександр')); // true
  console.log(tsCourse.isStudentRegistered('Олександр')); // false
  
  // Виведення всіх курсів та їх студентів
  courseManager.listCourses();
  
  // Видалення курсу
  courseManager.removeCourse('TypeScript');
  
  // Виведення курсів після видалення
  courseManager.listCourses();
  