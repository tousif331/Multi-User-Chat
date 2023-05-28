const express = require('express');
const userRouter = require('./Routers/userRouter')
const { createServer } = require("http");
const { Server } = require("socket.io");

const cors = require('cors');
const app=express();

const httpServer = createServer(app);
const io = new Server(httpServer, { cors : { origin : ['http://localhost:3000'] } });

const connectedUsers = {};

io.on("connection", (socket) => {
  console.log('client connected');

  socket.on('register', (name) => {
    connectedUsers[name]  = socket.id;
    console.log(connectedUsers);
  })

  socket.on('sendmsg', (data) => {
    console.log(data);
    data.sent = false;
    socket.to(connectedUsers[data.rec]).emit('recmsg', data);

  })

});

const port=5000;

app.use(cors({ origin : 'http://localhost:3000' }));

app.use(express.json());

app.use('/user', userRouter);

app.get('/',(req,res)=>{
    res.send('Response from expesss');
});

app.get('/home',(req,res)=>{
    res.send('Response from home');
});
app.get('/add',(req,res)=>{
    res.send('Response from add');
});

httpServer.listen(port,()=>{console.log('express server started.......')});