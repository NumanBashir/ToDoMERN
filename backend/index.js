import express from "express";
import { PORT, mongoDBURL } from "./config.js ";
import mongoose from "mongoose";
import { ToDo } from "./models/todoModel.js";
import todosRoutes from "./routes/todosRoutes.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to ToDo MERN Stack Tutorial");
});

app.use("/todos", todosRoutes);

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
