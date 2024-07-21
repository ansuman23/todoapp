import React, { useState,useEffect,useRef } from 'react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { useParams } from 'react-router-dom';
import { useTodos } from '../contexts/TodoContext';
import { Link } from 'react-router-dom';

const UpdateTodo = () => {
    const taskRef=useRef(null);
    const [datetime,setDateTime]=useState(new Date());
    const [message,setMessage]=useState("");
    const [infos,setInfos]=useState([]);
    const {todoId}=useParams();
    const {todos,updateTodo}=useTodos();

    function getInfos(todoId){
        try {
            console.log(todos)
            let res=todos.find((item)=>item.id==todoId);
            console.log(res)
            if(res){
                setInfos(res);
                const[month,day,year]=res.date.split('/');
                const[time,period]=res.time.split(' ');
                let[hours,minutes]=time.split(':');
                if(period==='PM' && hours!=='12'){
                    hours=parseInt(hours,10)+12;
                }else if(period==='AM' && hours==='12') {
                    hours='00';
                }
                const combinedDateTime=new Date(year,month-1,day,hours,minutes);
                setDateTime(combinedDateTime);
            }
        } catch (error) {
            return {status:false};
        }
    }

    useEffect(()=>{
        getInfos(todoId);
    },[todoId])

    async function handleSubmit(event){
        event.preventDefault();
        setMessage("");
        const updatedTodo={
            id: infos.id,
            task:taskRef.current.value,
            date:datetime.toLocaleDateString(),
            time:datetime.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
        }
        console.log(updatedTodo);
        const response=updateTodo(updatedTodo);
        if(response){
            setMessage("Todo Updated Successfully");
        }
        else{
            setMessage("Failed to Update Todo.")
        }
    }

  return (
    <div className='row'>
        <div className='col-md-6 mx-auto'>
            <div className='card'>
                <div className='card-body'>
                    <h3 className='text-center my-2'>Update Todo</h3>
                    <p className='text-center'>{message}</p>
                    <form action="" method='post' onSubmit={handleSubmit}>
                    <div className='mb-1'>
                            <label>Update Task</label>
                            <textarea ref={taskRef} cols={32} rows={5} className='form-control' placeholder='Enter new Task' defaultValue={infos.task} required></textarea>
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
            <Link className='viewTodos d-flex justify-content-center fs-5 text-secondary' to='/'>View My Todos</Link>
        </div>     
    </div>
  )
}

export default UpdateTodo
