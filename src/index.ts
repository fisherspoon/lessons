type AreaAlias = {
  name: string;
};

type LecturerAlias = {
  name: string;
  surname: string;
  position: number;
  company: string;
  experience: number;
  courses: string[];
  contacts: {
    phone: string;
    email: string;
  };
};

type LevelAlias = {
  name: string;
};

type GroupAlias = {
  name: string,
  description: string
};

type StudentAlias = {
  fullName: string;
  age: number;
  setGrade: (grade: number) => void;
  setVisit: (isPresent: boolean) => void;
  getPerformanceRating: () => number;
};


// =======================================================


class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods
  private _areas: AreaAlias[] = [];
  private _lecturers: LecturerAlias[] = []; // Name, surname, position, company, experience, courses, contacts

  get areas(): AreaAlias[] {
    return this._areas;
  }

  get lecturers(): LecturerAlias[] {
    return this._lecturers;
  }

  addArea(area: AreaAlias): void {
    if (!this._areas.some((existingArea) => existingArea.name === area.name)) {
      this._areas.push(area);
    }
  }

  removeArea(areaName: string): void {
    this._areas = this._areas.filter((area) => area.name !== areaName);
  }

  addLecturer(lecturer: LecturerAlias): void {
    if (
      !this._lecturers.some(
        (existingLecturer) =>
          existingLecturer.surname === lecturer.surname &&
          existingLecturer.name === lecturer.name
      )
    ) {
      this._lecturers.push(lecturer);
    }
  }

  removeLecturers(lecturerName: string, lecturerSurname: string): void {
    this._lecturers = this._lecturers.filter(
      (lecturer) =>
        lecturer.surname !== lecturerSurname && lecturer.name !== lecturerName
    );
  }
}

// створюємо якусь школу
let someSchool = new School();

// створюємо направлення
const mathArea: AreaAlias = { name: "Математика" };
const physicsArea: AreaAlias = { name: "Фізика" };

// додаємо їх у школу
someSchool.addArea(mathArea);
someSchool.addArea(physicsArea);

// виводимо направлення
console.log(someSchool.areas)

// створюємо вчителів
const lecturer1: LecturerAlias = {
  name: "Іван",
  surname: "Іванов",
  position: 1,
  company: "Якась компанія",
  experience: 10,
  courses: ["Алгебра", "Геометрія"],
  contacts: {
    phone: "0931112233",
    email: "doe@gmail.com",
  },
};

const lecturer2: LecturerAlias = {
  name: "Ольга",
  surname: "Ольгівна",
  position: 2,
  company: "якась компанія",
  experience: 8,
  courses: ["Фізика", "Астрономія"],
  contacts: {
    phone: "0932223344",
    email: "doe@gmail.com",
  },
};

// додаємо вчителів до школи
someSchool.addLecturer(lecturer1);
someSchool.addLecturer(lecturer2);

// виводимо вчителів
console.log(someSchool.lecturers);

// видаляємо одного вчителя
someSchool.removeLecturers("Іван", "Іванов");

// перевіряємо хто залишився
console.log(someSchool.lecturers);

// =======================================================

class Area {
  // implement getters for fields and 'add/remove level' methods
  private _levels: LevelAlias[] = [];
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get levels(): LevelAlias[] {
    return this._levels;
  }

  get name(): string {
    return this._name;
  }

  addLevel(level: LevelAlias): void {
    if (
      !this._levels.some((existingLevel) => existingLevel.name === level.name)
    ) {
      this._levels.push(level);
    }
  }

  removeLevel(levelName: string): void {
    this._levels = this._levels.filter((level) => level.name !== levelName);
  }
}

// Створення області навчання
const mathAreaInstance = new Area("Математика");

// Добавление уровней в область
const algebra: LevelAlias = { name: "Алгебра" }
const arithmetic: LevelAlias = { name: "Арифметика" }
mathAreaInstance.addLevel(algebra);
mathAreaInstance.addLevel(arithmetic);

// Вивід області
console.log(mathAreaInstance.levels);

// видалення рівня з області
mathAreaInstance.removeLevel("Алгебра");

// виводимо що залишилось
console.log(mathAreaInstance.levels);

// =======================================================

class Level {
  // implement getters for fields and 'add/remove group' methods

  private _groups: GroupAlias[] = [];
  private _name: string;
  private _description: string;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  get name(): string{
    return this._name;
  }

  get description(): string{
    return this._description;
  }

  get groups(): GroupAlias[]{
    return this._groups;
  }

  addGroup(group: GroupAlias): void{
    if (
      !this._groups.some(
        (existingGroup) =>
          existingGroup.name === group.name &&
        existingGroup.description === group.description
      )
    ) {
      this._groups.push(group);
    }
  }

  removeGroup(name: string, description: string): void {
    this._groups = this._groups.filter(
      (group) =>
        group.name !== name && group.description !== description
    );
  }
}

// створюємо екземпляр класу Level з назвою та описом
const level = new Level("Вища математика", "Цей рівень охоплює складні теми з математики.");

// створюємо групи з назвами та описами
const group1: GroupAlias = { name: "Група A", description: "Якийсь опис для групи А" };
const group2: GroupAlias = { name: "Група B", description: "Якийсь опис для групи B" };

// додаємо гпупи у рівні
level.addGroup(group1);
level.addGroup(group2);

// виводимо назву, опис та групи у рівні
console.log(level.name);
console.log(level.description);
console.log(level.groups)


// видаляємо групу А
level.removeGroup("Група A", "Якийсь опис для групи А");

// Перевіримо що залишилось
console.log(level.groups);

// =======================================================

class Student {
  private _firstName: string;
  private _lastName: string;
  private _birthYear: number;
  private _grades: number[] = [];
  private _visits: boolean[] = [];

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(" ");
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  setGrade(grade: number): void {
    this._grades.push(grade);
  }

  setVisit(isPresent: boolean): void {
    this._visits.push(isPresent);
  }

  getPerformanceRating(): number {
    const gradeValues = this._grades;

    if (!gradeValues.length) return 0;

    const averageGrade =
      gradeValues.reduce((sum: number, grade: number) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage =
      (this._visits.filter(present => present).length / this._visits.length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }
}


// створюємо студента
const student1 = new Student("Іван", "Іванов", 2000);
const student2 = new Student("Антоніна", "Антонівна", 1995);

// Проставляємо грейди та відмітки
student1.setGrade(85);
student1.setGrade(90);
student1.setVisit(true);
student1.setVisit(false);
student2.setGrade(80);
student2.setGrade(75);
student2.setVisit(true);
student2.setVisit(true);

// виводимо студента
console.log(student1)
console.log(student2)

// змінюємо фулл нейм та дату народження
student1.fullName = "Джон Доу"
console.log(student1)

// отримуємо рейтинг
console.log(student1.getPerformanceRating())
console.log(student2.getPerformanceRating())


class Group {
  private _area: string = '';
  private _status: boolean = false;
  private _students: Student[] = [];
  directionName: string;
  levelName: string;

  constructor(directionName: string, levelName: string) {
    this.directionName = directionName;
    this.levelName = levelName;
  }

  get area(): string {
    return this._area;
  }

  set area(value: string) {
    this._area = value;
  }

  get status(): boolean {
    return this._status;
  }

  set status(value: boolean) {
    this._status = value;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  removeStudent(student: Student): void {
    this._students = this._students.filter(s => s !== student);
  }

  showPerformance(): Student[] {
    const sortedStudents = this._students.toSorted(
      (a: Student, b: Student) => b.getPerformanceRating() - a.getPerformanceRating()
    );
    return sortedStudents;
  }
}

// Створюэмо групу
const group = new Group("Математика", "Продвинутий рівень");

// Створюємо розташування та статус групи
group.area = "Корпус A, кабінет 101";
group.status = true;

// Додаємо студента в групу
group.addStudent(student1);
group.addStudent(student2);

console.log(group)

// Вивиодимо перформанс всіх студентів у групі
const performanceD = group.showPerformance();
performanceD.forEach(student => {
  console.log(`${student.fullName} (Вік: ${student.age}) - Рейтинг продуктивності: ${student.getPerformanceRating()}`);
});

// Видаляємо студента із групи
group.removeStudent(student1);
console.log(group);