"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJsonBody = readJsonBody;
function readJsonBody(req, callback) {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    });
    req.on("end", () => {
        try {
            callback(null, JSON.parse(body));
        }
        catch (err) {
            callback(err, {});
        }
    });
}
