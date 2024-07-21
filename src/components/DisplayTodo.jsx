import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import { useTodos } from '../contexts/TodoContext';
import { formatDate, formatTime } from '../utils/utility';

const DisplayTodo = ({info,handleMarkAsCompleted}) => {
  const { id, task, date, time, completed } = info;
  const {deleteTodo}=useTodos();



  return (
    <div className="card rounded-0 m-2 border-2 todo-card">
      <div className="card-body">
        <button className={`btn btn-sm position-absolute top-0 end-0 m-2 ${completed ? 'btn-completed' : 'btn-pending'}`} onClick={()=>handleMarkAsCompleted(id)}>
          {completed? 'Completed ✅' : 'Pending ⏱'}
        </button>
        <p className="fw-bold mt-4">{task}</p>
        <p className="fw-bold">{formatDate(date)}</p>
        <p className="fw-bold">{formatTime(time)}</p>
        <div className="text-end p-1">
          <Link to={`/updateTodo/${id}`} className="btn btn-info btn-sm m-1">
            Update
          </Link>
          <button
            className="btn btn-danger btn-sm m-0"
            onClick={() => deleteTodo(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DisplayTodo
