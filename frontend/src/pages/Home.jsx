import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/todos")
      .then((response) => {
        setTodos(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-4 mx-auto p-8 bg-white rounded-lg shadow-xl">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-700">Todos List</h1>
        <Link to="/todos/create" className="text-sky-800">
          <MdOutlineAddBox className="text-2xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full mt-4 bg-gray-50 rounded-lg overflow-hidden">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Date (YYYY-MM-DD)</th>
              <th className="px-4 py-2">Operations</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr
                key={todo._id}
                className={`border-b hover:bg-orange-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2">{todo.title}</td>
                <td className="px-4 py-2">
                  {new Date(todo.date).toISOString().split("T")[0]}
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-start gap-x-4">
                    <Link
                      to={`/todos/details/${todo._id}`}
                      className="text-green-600 hover:text-green-800"
                    >
                      <BsInfoCircle className="text-lg" />
                    </Link>
                    <Link
                      to={`/todos/edit/${todo._id}`}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      <AiOutlineEdit className="text-lg" />
                    </Link>
                    <Link
                      to={`/todos/delete/${todo._id}`}
                      className="text-red-600 hover:text-red-800"
                    >
                      <MdOutlineDelete className="text-lg" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
