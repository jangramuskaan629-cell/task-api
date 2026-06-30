import { IncomingMessage } from "node:http";

// Reads the request body and converts it into JSON.

export function readJsonBody<T>(
    req: IncomingMessage,
    callback: (err: Error | null, data: T) => void
): void {

    // Store incoming data
    let body = "";

    // Receive data in chunks
    req.on("data", (chunk: Buffer) => {
        body += chunk.toString();
    });

    req.on("end", () => {
        try {

            // Convert json string into an object
            callback(null, JSON.parse(body));

        } catch (err) {

            // Return parsing error if json is invalid
            callback(err as Error, {} as T);
        }
    });
}