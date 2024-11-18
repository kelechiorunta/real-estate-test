const express = require('express');
const async_hooks = require('async_hooks');
const { AsyncLocalStorage, AsyncResource } = async_hooks;
const events = require('events');//Installed npm modules
const path = require('path');
const { EventEmitter } = events;
const emitter = new EventEmitter();
const cors = require('cors');
const os = require('node:os');
// const ejs = require('ejs');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT ?? 5501;//PORT saved in an .env file
const HOST = process.env.HOST ?? 'localhost';//Resolves to localhost by default;

const storage = new AsyncLocalStorage(); //Create a new instance of the AsyncLocalStorage Class
let idStorage = 0;

// console.log(greeting);
//The dynamic import starts as a promise and ends at the end of the event-loop
//when the port connection is made. Note: without the asyn/await,
//the promise will still run but could miss out
//unhandled exceptions (errors).
console.log(import(`./utils/superb.mjs`)); 

//Event emitter registers the greet event
emitter.on('greet', () => {
    console.log("Welcome User")
})

//Allowed domains for cross origin sharing
var allowedOrigins = ['http://localhost:5501']

//Cors setup for cross-domain requests sharing of resources
const corsOptions = {
    origin: function(origin, callback){
        if (allowedOrigins.indexOf(origin) !== -1 || !origin){
            return callback(null, true)
        }else{
            return callback(new Error("Not an allowed domain"), false)
        }
    },
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET']
  }

  //Sets the template engine for server-ui rendering to ejs template tool
  app.set('view engine', "ejs");
  app.set('views', path.join(__dirname, 'views'));
  //Cors middleware
  app.use(cors(corsOptions));

  
//Reusable function passed as a callback to get the store state of the 
//storage object
function captureID(msg){
    const id = storage.getStore();
    console.log(`Message: ${msg}, Captured: ${id}`)
}

//Middleware that emits the emiiter's greet event 
//and updates the storage idStorage state for every
//request

app.use((req, res, next) => {
    const currenttime = new Date();
    storage.run(idStorage++, () => {
        emitter.emit('greet');
        req.time = currenttime;
        next();
    })
    
})

//Middleware for express static object
app.use(express.static(path.resolve(__dirname, 'dist')))
const dir = path.resolve(__dirname, 'views')
console.log(dir)

//Resolves all get request to the ejs view template file index.ejs in the 
//views directory
app.get('*', (req, res) => {
    console.log(`The current time is ${req.time}`)
    captureID("Second")
    // const buildHtmlFile = path.resolve('./utils/index.html');
    res.render('index', {
        content: "Loading..."
    })
    // res.sendFile(buildHtmlFile);
    // res.end(`The current time is ${req.time}`)
})

//Middleware for error handling
app.use((req, res, next, err) => {
    console.error(err)
})

//App/server listens for connection.
app.listen(PORT, HOST, () => {
    console.log(`You are now connected to the PORT:${PORT}`, 
        `Free Memory is ${os.freemem() / 1024 / 1024}`
    );
})