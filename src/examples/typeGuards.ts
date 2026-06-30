// typeof
function print(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}

print("Muskaan");
print(25);

class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

// instanceof
function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}

makeSound(new Dog());
makeSound(new Cat());

interface Task {
  title: string;
}

interface Project {
  projectName: string;
}

// typeguard
function isTask(item: Task | Project): item is Task {
  return "title" in item;
}

console.log(isTask({ title: "Learn TS" }));
console.log(isTask({ projectName: "Node API" }));