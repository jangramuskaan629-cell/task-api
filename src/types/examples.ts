
// ID can be either a number or a string.
type ID = number | string;

// Interface Example

// Represents an employee.
interface Employee {
    id: ID;
    name: string;
}

// Example object
const employee: Employee = {
    id: 101,
    name: "Muskaan"
};

console.log(employee);


// Enum Example

// Represents different task statuses.
enum Status {
    Pending,
    Completed,
    Failed
}

// Example usage
const currentStatus = Status.Completed;

console.log(currentStatus);