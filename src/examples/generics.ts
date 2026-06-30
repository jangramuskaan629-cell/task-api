// Demonstrates how Generics allow functions

function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("Hello"));
console.log(identity<number>(100));

function firstElement<T>(items: T[]): T {
  return items[0];
}

console.log(firstElement([1, 2, 3]));
console.log(firstElement(["A", "B", "C"]));

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const taskResponse: ApiResponse<string> = {
  success: true,
  data: "Task Created"
};

console.log(taskResponse);