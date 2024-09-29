interface ISomeInterface1 {
  [key: string]: number | string;
}

const example1: ISomeInterface1 = {
  name: 'Alex',
  age: 30
}


example1.name = "new name";
// example1.age = {}


// ============================================


interface ISomeInterface2 {
  [key: string]: (...arg: any[]) => any;
}

const example2: ISomeInterface2 = {
  method: (a: number, b: number): void => {
    a + b;
  },
  method2: function(a: string){
    console.log(a)
  },
  method3: function(a: object){
    console.log(a)
  }
}


// ============================================


interface ISomeInterface3 {
  [key: number]: string | number;
}

const example3: ISomeInterface3 = {
  0: 1,
  1: 'string',
  // 2: () => {}
  // 'test': 3
  // anotherTest: 'test'
}


// ============================================


interface ISomeInterface4 {
  name: string
  [key: number]: number;
}

const example4: ISomeInterface4 = {
  name: 'Alex',
  0: 1,
  // test: 'test'
}


// ============================================


interface ISomeInterface5 {
  [key: number]: number;
}

interface ISomeInterface6 extends ISomeInterface5 {
  someSpecificKey: string
}

const example5: ISomeInterface6 = {
  // 0: 'test',
  0: 1,
  someSpecificKey: 'test'
}


// ============================================


interface ISomeInterface7 {
  [key: number]: number;
}

const example6: ISomeInterface7 = {
  0: 0,
  1: 1,
}

// example6[1] = '2';


function areAllValuesNumbers(example6: ISomeInterface7): boolean {
  return Object.values(example6).every(value => typeof value === 'number');
}

console.log(areAllValuesNumbers(example6))