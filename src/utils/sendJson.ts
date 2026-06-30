import { ServerResponse } from "node:http";

// Sends a JSON response with given status code.
export function sendJson(
    res: ServerResponse,
    status: number,
    payload: unknown
): void {

    // Set response headers
    res.writeHead(status, {
        "Content-Type": "application/json",
    });

    // Send JSON data
    res.end(JSON.stringify(payload));
}