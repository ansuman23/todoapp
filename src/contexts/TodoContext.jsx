import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext';

const TodoContext=createContext();
export const useTodos=()=>useContext(TodoContext);

export const TodoProvider=(props)=>{
    const {user}=useAuth();
    const [search,setSearch]=useState("");
    const [todos,setTodos]=useState(()=>{
        const storedTodos=localStorage.getItem("allTodos");
        return storedTodos? JSON.parse(storedTodos) :[];
    });

    useEffect(()=>{
        localStorage.setItem("allTodos",JSON.stringify(todos))
    },[todos])
    const addTodo=(info)=>{
        try {
            let newInfo={...info,userId:user.userId};
            setTodos((prevTodos) => [...prevTodos, newInfo]);
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
          const res = todos.map((todo) => (todo.id === updatedTodo.id ? {...todo, ...updatedTodo,userId:user.userId} : todo));
          setTodos(res);
          return { status: true };
        } catch (error) {
          console.log(error);
          return { status: false };
        }
    };
    const markAsCompleted=(id)=>{
        setTodos((prevTodos)=>prevTodos.map((todo)=>todo.id==id ? {...todo,completed: !todo.completed}:todo))
    }
    
    return(
        <TodoContext.Provider value={{todos, search,setSearch, addTodo, deleteTodo, updateTodo, markAsCompleted}}>{props.children}</TodoContext.Provider>
    ) 
}