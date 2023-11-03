import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import connectDB from "./mongodb/connect.js";
import MessageSchema from "./models/message.js";
import LoginSchema from "./models/login.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async(req, res) => {
    res.send('Hello from Server'+new Date().getTime());
});

app.get('/get-users', async (req, res) => {
  try {
    const users = await LoginSchema.find({});

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

app.post('/sign-in', async(req, res) => {
    try {
        const {name, password, profilePicture} = req.body;

        // Check if a user with the same name exists in the database
        const existingUser = await LoginSchema.findOne({ name });

        if (existingUser) {
            return res.status(200).json({ message: 'User already exists', redirectTo: '/home' });
        }

        const login = new LoginSchema({
            name,
            password,
            profilePicture
        })

        await login.save()
        res.status(201).json({ message: 'Login successful' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred while creating the post' })
    }
});

app.get('/get-messages', async (req, res) => {
  try {

    const messages = await MessageSchema.find({});

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching messages' });
  }
});


app.post('/send-message', async (req, res) => {
    try {
        const { nameFrom, nameTo, message } = req.body;

        const newMessage = new MessageSchema({
            nameFrom,
            nameTo,
            message,
            time: new Date().getTime()
        });

        await newMessage.save();

        res.status(201).json({ message: 'Message created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the post' });
    }
});

const startServer = async () => {
    try {
        connectDB("mongodb+srv://vibhuti:qwerty12345@cluster0.df3fdce.mongodb.net/?retryWrites=true&w=majority");
        app.listen(4000, () => 
            console.log('Server has started on port http://localhost:4000')
        );
    } catch (error) {
        console.log(error);
    }
}

startServer();