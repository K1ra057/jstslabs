// Клас OnlineCourse, що імплементує інтерфейс Course
var OnlineCourse = /** @class */ (function () {
    function OnlineCourse(name, duration) {
        this.name = name;
        this.duration = duration;
        this.students = [];
    }
    // Метод для реєстрації студентів
    OnlineCourse.prototype.registerStudent = function (student) {
        if (!this.isStudentRegistered(student)) {
            this.students.push(student);
            console.log("".concat(student, " \u0437\u0430\u0440\u0435\u0454\u0441\u0442\u0440\u043E\u0432\u0430\u043D\u0438\u0439 \u043D\u0430 \u043A\u0443\u0440\u0441 ").concat(this.name));
        }
        else {
            console.log("".concat(student, " \u0432\u0436\u0435 \u0437\u0430\u0440\u0435\u0454\u0441\u0442\u0440\u043E\u0432\u0430\u043D\u0438\u0439 \u043D\u0430 \u043A\u0443\u0440\u0441 ").concat(this.name));
        }
    };
    // Метод для перевірки, чи студент вже зареєстрований
    OnlineCourse.prototype.isStudentRegistered = function (student) {
        return this.students.includes(student);
    };
    return OnlineCourse;
}());
// Клас CourseManager, що керує курсами
var CourseManager = /** @class */ (function () {
    function CourseManager() {
        this.courses = [];
    }
    // Метод для додавання курсу
    CourseManager.prototype.addCourse = function (course) {
        this.courses.push(course);
        console.log("\u041A\u0443\u0440\u0441 ".concat(course.name, " \u0434\u043E\u0434\u0430\u043D\u0438\u0439"));
    };
    // Метод для видалення курсу
    CourseManager.prototype.removeCourse = function (courseName) {
        var index = this.courses.findIndex(function (course) { return course.name === courseName; });
        if (index !== -1) {
            this.courses.splice(index, 1);
            console.log("\u041A\u0443\u0440\u0441 ".concat(courseName, " \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u0438\u0439"));
        }
        else {
            console.log("\u041A\u0443\u0440\u0441 ".concat(courseName, " \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u0438\u0439"));
        }
    };
    // Метод для пошуку курсу за назвою
    CourseManager.prototype.findCourse = function (courseName) {
        return this.courses.find(function (course) { return course.name === courseName; });
    };
    // Метод для виведення всіх курсів і студентів
    CourseManager.prototype.listCourses = function () {
        this.courses.forEach(function (course) {
            console.log("\u041A\u0443\u0440\u0441: ".concat(course.name, ", \u0422\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C: ").concat(course.duration, " \u0433\u043E\u0434\u0438\u043D"));
            console.log("\u0421\u0442\u0443\u0434\u0435\u043D\u0442\u0438: ".concat(course.students.join(', ') || 'Немає студентів'));
        });
    };
    return CourseManager;
}());
// Створення курсів
var jsCourse = new OnlineCourse('JavaScript', 40);
var tsCourse = new OnlineCourse('TypeScript', 30);
// Створення CourseManager
var courseManager = new CourseManager();
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
