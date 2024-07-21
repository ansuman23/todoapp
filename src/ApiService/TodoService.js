import axios from "axios"
import { useState,useEffect } from "react";

function TodoService(){
    const [todos,setTodos]=useState([]);

    useEffect(()=>{
        localStorage.setItem("allTodos",JSON.stringify(todos))
    },[todos])
    useEffect(()=>{
        const res=JSON.parse(localStorage.getItem("allTodos"));
        if(res){
            setTodos(res);
        }
    },[])

    const addTodo=(info)=>{
        try {
            setTodos((prevTodos) => [...prevTodos, info]);
            return { status: true };
        } catch (error) {
            console.log(error)
            return {status:false}
        }
    }
    const deleteTodo=(id)=>{
        try {
           const res=todos.filter((todo)=>todo.id!==id);
           setTodos(res);
        } catch (error) {
            return {status:false}
        }
    }
    const updateTodo = (updatedTodo) => {
        try {
          const res = todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));
          setTodos(res);
          return { status: true };
        } catch (error) {
          console.log(error);
          return { status: false };
        }
      };
    
      return { todos, addTodo, deleteTodo, updateTodo };
}

// const todoService=TodoService();
export default TodoService;