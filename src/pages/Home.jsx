import React from "react";
import DisplayTodo from "../components/DisplayTodo";
import { useTodos } from "../contexts/TodoContext";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { todos, markAsCompleted,search } = useTodos();
  const { user } = useAuth();
  const userTodos = user
    ? todos.filter((todo) => todo.userId == user.userId)
    : [];
  const filteredTodos=search ? userTodos.filter((todo)=>todo.task.toLowerCase().includes(search.toLowerCase())) : userTodos;
  const completedTodos = filteredTodos
    ? filteredTodos.filter((todo) => todo.completed)
    : [];
  const pendingTodos = filteredTodos
    ? filteredTodos.filter((todo) => !todo.completed)
    : [];
  return (
    <div className="">
      {user ? (
        <>
          <div className="accordion accordion-flush border border-4 border-dark rounded" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  className="accordion-button collapsed border border-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Pending Todos
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  {pendingTodos.length === 0 ? (
                    <p>No Pending Todos Present</p>
                  ) : (
                    pendingTodos.map((todo) => (
                      <div key={todo.id} className="col-md-4">
                        <DisplayTodo
                          info={todo}
                          handleMarkAsCompleted={markAsCompleted}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  Completed Todos
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                className="accordion-collapse collapse show"
                aria-labelledby="flush-headingTwo"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                {completedTodos.length === 0 ? (
                    <p>No Completed Todos Present</p>
                  ) : (
                    completedTodos.map((todo) => (
                      <div key={todo.id} className="col-md-4">
                        <DisplayTodo
                          info={todo}
                          handleMarkAsCompleted={markAsCompleted}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="landingPage text-center">
            <h1 className="fs-2">Welcome to TODO-APP</h1>
            <h3 className="fs-5 fst-italic">The key is not to prioritize what's on your schedule, but to schedule your priorities.</h3>
            <Link to="/login" className="fs-4">Login to view your todos</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
