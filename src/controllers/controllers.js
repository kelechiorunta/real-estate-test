const express = require('express');
const { AsyncLocalStorage, AsyncResource } = require('node:async_hooks');
const events = require('node:events');
const { EventEmitter } = events;
const router = express.Router();

const emitter = new EventEmitter();
const userStorage = new AsyncLocalStorage();
let Users = [
    { email: "admin", password: "admin" },
];

// Reusable function passed as a callback to log the store state
function captureID(msg) {
    const id = userStorage.getStore();
    if (id !== undefined) {
        console.log(`Message: ${msg}, Captured ID: ${id}`);
    } else {
        console.log(`Message: ${msg}, No Context ID found`);
    }
}

let id = 0;

// Event listener to log storage updates
emitter.on('registered', () => {
    console.log('User has been added to the store');
});

// Controller function to return greetings based on the time of day
function getGreetings(req, res) {
    const dayShift = new Date().getHours();
    let greet = "";

    if (dayShift < 12) {
        greet = "Good morning";
    } else if (dayShift >= 12 && dayShift <= 15) {
        greet = "Good afternoon";
    } else {
        greet = "Good evening";
    }

    console.log(`Time of day: ${dayShift}`);
    res.json({ message: `${greet}` });
}

// Controller function to register a new user
function registerUser(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Invalid Credentials" });
    }

    const user = Users.find((user) => user.email === email);

    if (user) {
        return res.status(400).json({ error: "User already exists" });
    }

    const registeredUser = { email, password };
    Users.push(registeredUser);
    userStorage.run(id++, () => {
        emitter.emit('update');
        //next();
    });
    id++;
    req.user = registeredUser;
    // Log the state and process the user
    captureID(`Registering user with email: ${email}, ${id}`);
    res.status(200).json({ message: "User saved"});
}

// Export the controllers
module.exports = { getGreetings, registerUser};
