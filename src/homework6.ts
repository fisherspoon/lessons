type ReturnFnType<T> = T extends () => infer R ? R : never;

function exampleFunction1(): number {
    return 42;
}

function exampleFunction2(): string {
    return '';
}

type ExampleReturnType1 = ReturnFnType<typeof exampleFunction1>;
type ExampleReturnType2 = ReturnFnType<typeof exampleFunction2>;






type ReturnFnType1<T> = T extends (...args: infer U) => infer R ? [R, U] : never;

function exampleFunction3(param1: string, param2: number): number {
    return 42;
}
function exampleFunction4(param1: boolean): void {
  
}

type ExampleReturnType3 = ReturnFnType1<typeof exampleFunction3>;
type ExampleReturnType4 = ReturnFnType1<typeof exampleFunction4>;