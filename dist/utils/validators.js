"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidTitle = isValidTitle;
function isValidTitle(title) {
    return typeof title === "string" && title.trim() !== "";
}
