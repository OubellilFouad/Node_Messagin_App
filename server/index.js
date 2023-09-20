const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io');
var bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const messagesRoutes = require('./routes/messagesRoutes');


const app = express();
require('dotenv').config();
var jsonParser = bodyParser.json()
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use("/api/auth",jsonParser,userRoutes);
app.use("/api/messages",jsonParser,messagesRoutes);

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGOURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connected')
}).catch((error) => {
    console.log(error.message)
});

const server = app.listen(process.env.PORT,(req,res) => {
    console.log('Connected');
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    }
})

global.onlineUsers = new Map();
io.on('connection', (socket) => {
    global.chatSocket= socket;
    socket.on('add-user',(userId) => {
        onlineUsers.set(userId,socket.id);
    });
    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    });
})