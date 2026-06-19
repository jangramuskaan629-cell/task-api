// Import HTTP Server
const http = require("http");

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

// Create Server
const server = http.createServer((req, res) => {

    console.log(req.method);
    console.log(req.url);

    // GET /tasks
    if (req.method === "GET" && req.url === "/tasks") {

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        return res.end(JSON.stringify(tasks));
    }

    // GET /tasks/:id
    if (req.method === "GET" && req.url.startsWith("/tasks/")) {

        // Extract id and split
        const id = parseInt(req.url.split("/")[2]);

        // Find task
        const task = tasks.find(task => task.id === id);

        // Task not found   
        if (!task) {

            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            return res.end(
                JSON.stringify({
                    message: "Task not found"
                })
            );
        }

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        return res.end(JSON.stringify(task));
    }

    // POST /tasks
    if (req.method === "POST" && req.url === "/tasks") {

        // Empty variable
        let body = "";

        // Receive Data
        req.on("data", chunk => {
            body += chunk;
        });

        // End Event
        req.on("end", () => {

            const data = JSON.parse(body);

            // Create new task
            const newTask = {
                id: tasks.length + 1,
                title: data.title
            };

            // Push into array
            tasks.push(newTask);

            // Send success response    
            res.writeHead(201, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(newTask));
        });

        return;
    }

    // Route not found
    res.writeHead(404, {
        "Content-Type": "application/json"
    });

    res.end(
        JSON.stringify({
            message: "Route not found"
        })
    );
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});