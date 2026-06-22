// Import HTTP Server
const http = require("node:http");

// Tasks array
const tasks = [
    {
        id: 1,
        title: "Learn Node.js"
    },
    {
        id: 2,
        title: "Build HTTP Server"
    }
];

// Track the next ID independently of the array length so IDs stay
// unique even after tasks are deleted. (tasks.length + 1 would reuse
// an ID once anything is removed.)
let nextId = tasks.length + 1;

// Collect a streamed request body and parse it as JSON.
// Calls back with (err, data) so each route decides how to respond.
function readJsonBody(req, callback) {
    let body = "";

    req.on("data", chunk => {
        body += chunk;
    });

    req.on("end", () => {
        try {
            callback(null, JSON.parse(body));
        } catch (err) {
            callback(err);
        }
    });
}

// Validate a title coming from the client. Returns true if usable.
function isValidTitle(title) {
    return typeof title === "string" && title.trim() !== "";
}

// Small helper to keep the JSON responses consistent.
function sendJson(res, status, payload) {
    res.writeHead(status, {
        "Content-Type": "application/json"
    });
    res.end(JSON.stringify(payload));
}

// Create Server
const server = http.createServer((req, res) => {

    console.log(req.method);
    console.log(req.url);

    // GET /tasks
    if (req.method === "GET" && req.url === "/tasks") {
        return sendJson(res, 200, tasks);
    }

    // GET /tasks/:id
    if (req.method === "GET" && req.url.startsWith("/tasks/")) {

        // Extract id and split
        const id = Number.parseInt(req.url.split("/")[2]);

        // Find task
        const task = tasks.find(task => task.id === id);

        // Task not found
        if (!task) {
            return sendJson(res, 404, { message: "Task not found" });
        }

        return sendJson(res, 200, task);
    }

    // POST /tasks
    if (req.method === "POST" && req.url === "/tasks") {

        readJsonBody(req, (err, data) => {

            // Guard against malformed JSON so one bad request can't crash
            // the whole server.
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
    if (req.method === "PUT" && req.url.startsWith("/tasks/")) {

        const id = Number.parseInt(req.url.split("/")[2]);

        readJsonBody(req, (err, data) => {

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
    if (req.method === "DELETE" && req.url.startsWith("/tasks/")) {

        const id = Number.parseInt(req.url.split("/")[2]);

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
