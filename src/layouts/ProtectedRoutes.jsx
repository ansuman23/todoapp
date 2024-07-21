import React from 'react';
import {Outlet,Navigate} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoutes = () => {
    const {user}=useAuth();
  return (
    user?<Outlet/>:<Navigate to="/login"></Navigate>
  )
}

export default ProtectedRoutes
