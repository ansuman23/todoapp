import React, { useState,useRef,useEffect } from 'react'
import { useTodos } from '../contexts/TodoContext';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { Link } from 'react-router-dom';

const AddTodo = () => {
    const taskRef=useRef(null);
    const [datetime,setDateTime]=useState(new Date());
    const [message,setMessage]=useState("");
    const {addTodo}=useTodos();;

    const handleSubmit=(event)=>{
        event.preventDefault();
        setMessage("");
        const newTodo={
            id: Math.random().toString(36).substring(2, 15),
            task:taskRef.current.value,
            date:datetime.toLocaleDateString(),
            time:datetime.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
        }
        console.log(newTodo);
        const res=addTodo(newTodo);
        if(res.status){
            setMessage("Todo added Successfully");
        }
        else{
            setMessage("Failed to add new Todo");
        }
    }
  return (
    <div className='row'>
        <div className='col-md-6 mx-auto'>
            <div className='card'>
                <div className='card-body'>
                    <h3 className='text-center my-2'>Add New Todo</h3>
                    <p className='text-center'>{message}</p>
                    <form action="" method='post' onSubmit={handleSubmit}>
                    <div className='mb-1'>
                            <label>Add Task</label>
                            <textarea cols={32} rows={5} ref={taskRef} className='form-control' placeholder='Enter Task' required></textarea>
                        </div>
                        <div className='mb-1'>
                            <label>Choose Date and Time</label>
                            <DateTimePicker onChange={setDateTime} value={datetime} className='form-control' clearIcon={null}  required/>
                        </div>
                        <div className='my-2'>
                            <input type='submit' className='btn btn-primary w-100'/>
                        </div>
                    </form>
                </div>
            </div>
            <Link className='viewTodos d-flex justify-content-center fs-5 text-primary' to='/'>View My Todos</Link>
        </div>     
    </div>
  )
}

export default AddTodo
