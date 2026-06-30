// Import HTTP Server
import http, { IncomingMessage, ServerResponse } from "node:http";

import { Task } from "./models/Task";
import { Project } from "./models/Project";

import { CreateTaskRequest } from "./types/CreateTaskRequest";
import { UpdateTaskRequest } from "./types/UpdateTaskRequest";

import { sendJson } from "./utils/sendJson";
import { readJsonBody } from "./utils/readJsonBody";
import { isValidTitle } from "./utils/validators";

// Tasks array
const tasks: Task[] = [
  {
    id: 1,
    title: "Learn Node.js",
  },
  {
    id: 2,
    title: "Build HTTP Server",
  },
];


// Track the next ID independently of the array length so IDs stay
// unique even after tasks are deleted. (tasks.length + 1 would reuse
// an ID once anything is removed.)
let nextId: number = tasks.length + 1;

// Collect a streamed request body and parse it as JSON.
// Calls back with (err, data) so each route decides how to respond.



// Small helper to keep the JSON responses consistent.

// Create Server
const server = http.createServer((
    req: IncomingMessage,
    res: ServerResponse
) => {
    const url = req.url ?? "";

    // GET /tasks
    if (req.method === "GET" && url === "/tasks") {
        return sendJson(res, 200, tasks);
    }

    // GET /tasks/:id
    if (req.method === "GET" && url.startsWith("/tasks/")) {

        // Extract id and split
        const id = Number.parseInt(url.split("/")[2]);

        // Find task
        const task = tasks.find(task => task.id === id);

        // Task not found
        if (!task) {
            return sendJson(res, 404, { message: "Task not found" });
        }

        return sendJson(res, 200, task);
    }

    // POST /tasks
    if (req.method === "POST" && url === "/tasks") {

        readJsonBody<CreateTaskRequest>(req, (err, data) => {

            // Guard against malformed JSON so one bad request can't crash the whole server.
            
            if (err) {
                return sendJson(res, 400, { message: "Invalid JSON body" });
            }

            // Never trust the client: require a real title.
            if (!isValidTitle(data.title)) {
                return sendJson(res, 400, { message: "Title is required and must be a non-empty string" });
            }

            // Create new task
            const newTask = {
                id: nextId++,
                title: data.title.trim()
            };

            // Push into array
            tasks.push(newTask);

            // Send success response
            return sendJson(res, 201, newTask);
        });

        return;
    }

    // PUT /tasks/:id
    if (req.method === "PUT" && url.startsWith("/tasks/")) {

        const id = Number.parseInt(url.split("/")[2]);

        readJsonBody<UpdateTaskRequest>(req, (err, data) => {

            if (err) {
                return sendJson(res, 400, { message: "Invalid JSON body" });
            }

            const task = tasks.find(task => task.id === id);

            if (!task) {
                return sendJson(res, 404, { message: "Task not found" });
            }

            if (!isValidTitle(data.title)) {
                return sendJson(res, 400, { message: "Title is required and must be a non-empty string" });
            }

            // Update in place
            task.title = data.title.trim();

            return sendJson(res, 200, task);
        });

        return;
    }

    // DELETE /tasks/:id
    if (req.method === "DELETE" && url.startsWith("/tasks/")) {

        const id = Number.parseInt(url.split("/")[2]);

        const index = tasks.findIndex(task => task.id === id);

        if (index === -1) {
            return sendJson(res, 404, { message: "Task not found" });
        }

        // Remove and return the deleted task
        const [deleted] = tasks.splice(index, 1);

        return sendJson(res, 200, deleted);
    }

    // Route not found
    return sendJson(res, 404, { message: "Route not found" });
});

// Allow the port to be configured via the environment (12-factor),
// falling back to 3000 for local development.
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
