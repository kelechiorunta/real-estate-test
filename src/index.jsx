import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import Signup from './components/SignUp';

const App = () => {
    const [greet, setGreet] = useState("Welcome to my React JSXs");
   
        async function handleGreeting(){
            try{
                const res = await axios.get('/api', { withCredentials: true });
                setGreet(res.data.message)
            }
            catch(err){
                console.log(err?.message)
            }      
        }
       
    
    return (
        <div>
            <h1>{greet}</h1>
            <button onClick={handleGreeting}>Show Greeting</button>
            <Signup/>
        </div>
    );
};

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
} else {
    console.error('No container element found!');
}
