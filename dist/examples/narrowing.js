"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printValue = printValue;
function printValue(value) {
    if (typeof value === "string") {
        console.log(value.toUpperCase());
    }
    else {
        console.log(value.toFixed(2));
    }
}
