# Task API

A simple REST API built using Node.js and the built-in HTTP module.

## Features

- GET /tasks
- GET /tasks/:id
- POST /tasks
- PUT /tasks/:id
- DELETE /tasks/:id

## Run

```bash
node server.js
```

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
