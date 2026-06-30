"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendJson = sendJson;
function sendJson(res, status, payload) {
    res.writeHead(status, {
        "Content-Type": "application/json",
    });
    res.end(JSON.stringify(payload));
}
