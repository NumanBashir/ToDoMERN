import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowToDo = () => {
  const [todo, setTodo] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/todos/${id}`)
      .then((response) => {
        setTodo(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <BackButton />
      <h1 className="text-4xl font-semibold my-6 text-gray-700">Show ToDo</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="space-y-4 border-2 border-gray-200 rounded-xl p-6 max-w-md mx-auto">
            <div className="flex items-center space-x-4">
              <span className="text-lg text-gray-600">Title:</span>
              <span className="font-medium">{todo.title}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-lg text-gray-600">Date:</span>
              <span className="font-medium">
                {`${new Date(todo.date).toISOString().split("T")[0]} ${
                  new Date(todo.date).toTimeString().split(" ")[0]
                }`}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowToDo;
