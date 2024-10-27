type DeepReadonly<T> = {
    +readonly [P in keyof T]: DeepReadonly<T[P]>
}

interface IDeepObject1 {
    name: string;
    age: number;
    social: {
        email?: string;
    }
}

const user1: DeepReadonly<IDeepObject1> = {
    name: 'Alex',
    age: 21,
    social: {
        email: 'qwerty@gmail.com',
    },
};

// console.log(user1.name)
// user1.name = 'test'



// ==============================================================



type DeepRequireReadonly<T> = {
    +readonly [P in keyof T]-?: DeepRequireReadonly<T[P]>
};

interface IDeepObject2 {
    name?: string;
    age?: number;
    social?: {
        email?: string;
    }
}

type RequiredReadonlyDeepObject = DeepRequireReadonly<IDeepObject2>;

const user2: RequiredReadonlyDeepObject = {
    name: 'Alex',
    age: 21,
    social: {
        email: 'qwerty@gmail.com',
    },
};

// user2.name = 'John';
// user2.social.email = 'another@gmail.com';

// const user3: RequiredReadonlyDeepObject = {
//     age: 21,
//     social: {
//         email: 'qwerty@gmail.com',
//     },
// };



// ==============================================================


type UpperCaseKeys<T> = {
    [K in keyof T & string as Uppercase<K>]: T[K]
}

interface IUpperCaseObject {
    name: string;
    age: number;
}

const user4: UpperCaseKeys<IUpperCaseObject> = {
    NAME: 'Alex',
    AGE: 21,
};



// ==============================================================



type PropDescriptor<T> = {
    value: T;
    writable?: boolean;
    enumerable?: boolean;
    configurable?: boolean;
};

type ObjectToPropertyDescriptor<T> = {
    [K in keyof T]: PropDescriptor<T[K]>;
};

interface IExample {
    name: string;
    age: number;
}

type DescriptorExample = ObjectToPropertyDescriptor<IExample>;

const user5: DescriptorExample = {
    name: {
        value: 'Alex',
        writable: true,
        enumerable: true,
        configurable: true,
    },
    age: {
        value: 21,
        writable: false,
        enumerable: true,
        configurable: true,
    },
};