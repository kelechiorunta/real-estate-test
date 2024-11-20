import React from "react";
import Header from "../Header/Header";
import Content from "../Content/Content";
import Signup from "../Signup/SignUp";
import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const App = () => {
    const location = useLocation();
    return (
        <div className='App'>
           <Routes>
                <Route path='/signup' element={<Signup />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Content />} />
                </Route>
                <Route path="/" element={<Content />} />
           </Routes>
        </div>
    );
};

export default App;