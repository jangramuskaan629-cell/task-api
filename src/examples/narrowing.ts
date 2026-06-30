type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function area(shape: Shape): number {
    // narrowing
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  }

  return shape.side ** 2;
}

console.log(area({ kind: "circle", radius: 5 }));
console.log(area({ kind: "square", side: 4 }));

function greet(name?: string) {
  if (name) {
    console.log("Hello", name);
  } else {
    console.log("Hello Guest");
  }
}

greet("Muskaan");
greet();