// абстрактний клас для базових властивостей і методів
abstract class Figure {
  protected name: string = "";
  protected color: string = "";

  public constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }

  public abstract calculateArea(): number;

  public getName(): string {
    return this.name;
  }

  public getColor(): string {
    return this.color;
  }
}

class Circle extends Figure {
  private pi: number = 3.14;
  
  public constructor(private radius: number, name: string, color: string) {
    super(name, color);
  }

  public calculateArea(): number {
    return this.pi * this.radius * this.radius;
  }
}

// Створюємо екземпляр класу Circle
let circle: Circle = new Circle(15, 'circle', 'red');

// Пробуємо змінити name та color
// circle.name = 'new name';
// circle.color = 'new color';

// Виводимо всі доступні властивості і площу круга
console.log(circle.getName());
console.log(circle.getColor());
console.log(circle.calculateArea());



// ========================================================================



class Rectangle extends Figure {
  public constructor(private height: number, private width: number, name: string, color: string) {
    super(name, color);
  }

   public calculateArea(): number{
    return this.height * this.width;
  }
}


// Створюємо екземпляр класу Circle
let rectangle: Rectangle = new Rectangle(15, 12, 'rectangle', 'blue');

// Пробуємо змінити name та color
// rectangle.name = 'new name';
// rectangle.color = 'new color';

// Виводимо всі доступні властивості і площу круга
console.log(rectangle.getName());
console.log(rectangle.getColor());
console.log(rectangle.calculateArea());



// ========================================================================



class Square extends Figure {
  public constructor(private sideLength: number, name: string, color: string) {
    super(name, color);
  }

  public calculateArea(): number{
    return Math.pow(this.sideLength, 2);
  }

  public print(): string {
    return `Формула розрахунку площі квадрату: 
    S = a * a, 
    де:
    - S — площа квадрата,
    - a — довжина сторони квадрата.`;
  }
}

// Створюємо екземпляр класу Square
let square: Square = new Square(8, 'square', 'yellow');

// Пробуємо змінити name та color
// square.name = 'new name';
// square.color = 'new color';

// Виводимо всі доступні властивості і площу круга
console.log(square.getName());
console.log(square.getColor());
console.log(square.calculateArea());
console.log(square.print());


// ========================================================================



class Triangle extends Figure{
  public constructor(private sideA: number, private sideB: number, private sideC: number, name: string, color: string) {
    super(name, color);
  }

  public calculateArea(): number{
    let s: number = (this.sideA + this.sideB + this.sideC) / 2;
    return Math.sqrt(s * ((s - this.sideA) * (s - this.sideB) * (s - this.sideC)));
  }

  public print(): string{
    return `Формула розрахунку площі трикутника: 
    S = √(s * (s - a) * (s - b) * (s - c)), 
    де:
    - S — площа трикутника,
    - s — півпериметр трикутника (s = (a + b + c) / 2),
    - a, b, c — сторони трикутника.`;
  }
}

// Створюємо екземпляр класу Triangle
let triangle: Triangle = new Triangle(8, 6, 7, 'triangle', 'white');

// Пробуємо змінити name та color
// triangle.name = 'new name';
// triangle.color = 'new color';

// Виводимо всі доступні властивості і площу круга
console.log(triangle.getName());
console.log(triangle.getColor());
console.log(triangle.calculateArea());
console.log(triangle.print());