class School {
  directions: any = [];

  addDirection(direction: any): void {
    this.directions.push(direction);
  }
}

class Direction {
  levels: any = [];
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  addLevel(level: any): void {
    this.levels.push(level);
  }
}

class Level {
  groups: any = [];
  private _program: string;
  private _name: string;

  constructor(name: string, program: string) {
    this._name = name;
    this._program = program;
  }

  get name(): string {
    return this._name;
  }

  get program(): string {
    return this._program;
  }

  addGroup(group: any): void {
    this.groups.push(group);
  }
}

class Group {
  private _students: any = [];
  directionName: string = '';
  levelName: string = '';

  get students(): any {
    return this._students;
  }

  constructor(directionName: string, levelName: string) {
    this.directionName = directionName;
    this.levelName = levelName;
  }

  addStudent(student: any): void {
    this._students.push(student);
  }

  showPerformance(): any {
    const sortedStudents: number = this.students.toSorted(
      (a: any, b: any) => b.getPerformanceRating() - a.getPerformanceRating()
    );
    return sortedStudents;
  }
}

class Student {
  grades: any = {};
  attendance: any = [];
  firstName: string = '';
  lastName: string = '';
  birthYear: number = 0;

  constructor(firstName: string, lastName: string, birthYear: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
  }

  get fullName(): string {
    return `${this.lastName} ${this.firstName}`;
  }

  set fullName(value: string) {
    [this.lastName, this.firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this.birthYear;
  }

  setGrade(subject: any, grade: number): void {
    this.grades[subject] = grade;
  }

  markAttendance(present: boolean): void {
    this.attendance.push(present);
  }

  getPerformanceRating(): number {
    const gradeValues: any = Object.values(this.grades);

    if (gradeValues.length === 0) return 0;

    const averageGrade: number =
      gradeValues.reduce((sum: number, grade: number) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage: number =
      (this.attendance.filter((present: any) => present).length / this.attendance.length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }
}

// Створення студентів
const student1 = new Student('Олексій', 'Олексійов', 2005);
const student2 = new Student('Віктор', 'Вікторов', 2004);
const student3 = new Student('Ольга', 'Ольгівна', 2005);

// Встановлення оцінок і відвідуваності
student1.setGrade('Математика', 95);
student1.setGrade('Англійська мова', 90);
student1.markAttendance(true);
student1.markAttendance(false);
student1.markAttendance(true);
console.log(student1.getPerformanceRating());

student2.setGrade('Математика', 85);
student2.setGrade('Англійська мова', 80);
student2.markAttendance(true);
student2.markAttendance(true);
student2.markAttendance(true);
console.log(student2.getPerformanceRating());

student3.setGrade('Математика', 92);
student3.setGrade('Англійська мова', 88);
student3.markAttendance(true);
student3.markAttendance(true);
student3.markAttendance(false);
console.log(student3.getPerformanceRating());

// Створення групи і додавання студентів
const mathGroup = new Group('Математична група', 'Рівень 1');
mathGroup.addStudent(student1);
mathGroup.addStudent(student2);
mathGroup.addStudent(student3);

// Створення рівня і додавання групи
const level1 = new Level('Рівень 1', 'Базова математика');
level1.addGroup(mathGroup);
console.log(level1.name);
console.log(level1.groups);

// Створення напрямку і додавання рівня
const mathDirection = new Direction('Вища математика');
mathDirection.addLevel(level1);
console.log(mathDirection.name);

// Створення школи і додавання напрямку
const school = new School();
school.addDirection(mathDirection);
console.log(school);

// Показ продуктивності студентів у групі
const sortedStudents = mathGroup.showPerformance();
console.log(sortedStudents);