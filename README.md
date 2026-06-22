# Task API

A simple REST API built using Node.js and the built-in HTTP module.

## Features

- GET /tasks
- GET /tasks/:id
- POST /tasks
<<<<<<< HEAD
=======
- PUT /tasks/:id
- DELETE /tasks/:id
>>>>>>> 12edb66a5219fbb3ccb75f2714c325c79b1648b9

## Run

```bash
node server.js
```

<<<<<<< HEAD
### Get All Tasks

GET /tasks

### Get Task By ID

GET /tasks/1

### Create Task

POST /tasks
```
=======
The port can be set with the `PORT` environment variable (defaults to `3000`).

## Endpoints

### Get All Tasks

```
GET /tasks
```

### Get Task By ID

```
GET /tasks/1
```

### Create Task

```
POST /tasks
Content-Type: application/json

{ "title": "Write tests" }
```

Returns `400` if the body is not valid JSON or `title` is missing/empty.

### Update Task

```
PUT /tasks/1
Content-Type: application/json

{ "title": "Write more tests" }
```

Returns `404` if the task does not exist.

### Delete Task

```
DELETE /tasks/1
```

Returns `404` if the task does not exist.
>>>>>>> 12edb66a5219fbb3ccb75f2714c325c79b1648b9
