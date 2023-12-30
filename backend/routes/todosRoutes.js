import express from "express";
import { ToDo } from "../models/todoModel.js";

const router = express.Router();

router.post("/", async (request, response) => {
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

// Route for get all ToDos from database (read all todos)
router.get("/", async (request, response) => {
  try {
    const todos = await ToDo.find({});

    return response.status(200).json({
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for get Todo from database by id (get todo by ID)
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const todo = await ToDo.findById(id);

    return response.status(200).json(todo);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for update a todo
router.put("/:id", async (request, response) => {
  try {
    if (!request.body.title || !request.body.date) {
      return response.status(400).send({
        message: "Send all required fields: title and date",
      });
    }

    const { id } = request.params;
    const result = await ToDo.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: "ToDo not found" });
    }

    return response.status(200).send({ message: "ToDo updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for delete a todo
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await ToDo.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Todo not found" });
    }

    return response.status(200).send({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
