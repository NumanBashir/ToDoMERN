import express from "express";
import { PORT, mongoDBURL } from "./config.js ";
import mongoose from "mongoose";
import { ToDo } from "./models/todoModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to ToDo MERN Stack Tutorial");
});

app.post("/todos", async (request, response) => {
  try {
    if (!request.body.title || !request.body.date) {
      return response
        .status(400)
        .send({ message: "Send all required fields: title and date" });
    }
    const newTodo = {
      title: request.body.title,
      date: request.body.date,
    };
    const todo = await ToDo.create(newTodo);
    return response.status(201).send(todo);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
