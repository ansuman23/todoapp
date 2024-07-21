import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Layout from './layouts/Layout'
import AddTodo from './pages/AddTodo'
import Home from './pages/Home'
import UpdateTodo from './pages/UpdateTodo'
import Login from './pages/Login'
import ProtectedRoutes from './layouts/ProtectedRoutes'

function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {path:"/",element:<Home/>},
        {path:"/login",element:<Login/>},
        {
          path:"/",
          element:<ProtectedRoutes/>,
          children:[
            {path:"/addTodo",element:<AddTodo/>},
            {path:"/updateTodo/:todoId",element:<UpdateTodo/>}    
          ]
        }
      ]
    }
  ])
  return (
    <div className='main-app'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
