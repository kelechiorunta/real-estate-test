import React, { useState } from 'react'
import './Content.css'
import axios from 'axios';
import Signup from '../Signup/SignUp'

export default function Content() {
    const [greet, setGreet] = useState("Welcome to my React JSXs");
   
        async function handleGreeting(){
            try{
                const res = await axios.get('/api', { withCredentials: true });
                setGreet(res.data.message)
            }
            catch(err){
            if (err?.response) {
                // The server responded with a status other than 2xx
                console.error('Error status:', err.response.status);
                alert(`Error message: ${err.response.data.error}`, err.response.data.error);
            } else if (err.request) {
                // The request was made, but no response was received
                alert(`No response received: ${err.request}`, err.request);
            } else {
                // Something else happened while setting up the request
                alert(`Error message: ${err.message}`, err.message );
            }
        }
        }
  return (
    <div className='Content'>
        <h1>Good Day</h1>
        <h1>{greet}</h1>
        <button onClick={handleGreeting}>Show Greeting</button>
        {/* <Signup/> */}
    </div>
  )
}
