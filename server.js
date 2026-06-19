const http = require('http');

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

const server = http.createServer((req,res) => {
    console.log(req.method);
    console.log(req.url);

    if (req.method === "GET" && req.url === "/tasks") {

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        return res.end(JSON.stringify(tasks));
    }

    res.end("Route not found");
});

server.listen(3000, () =>{
    console.log("Server running on the port 3000");
});