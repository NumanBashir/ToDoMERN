import React from "react";
import { Routes, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateToDo from "./pages/CreateToDo";
import ShowToDo from "./pages/ShowToDo";
import EditTodo from "./pages/EditTodo";
import DeleteToDo from "./pages/DeleteToDo";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todos/create" element={<CreateToDo />} />
      <Route path="/todos/details/:id" element={<ShowToDo />} />
      <Route path="/todos/edit/:id" element={<EditTodo />} />
      <Route path="todos/delete/:id" element={<DeleteToDo />} />
    </Routes>
  );
};

export default App;
