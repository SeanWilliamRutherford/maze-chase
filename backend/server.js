const express = require('express');

const path = require('path');
const colors = require('colors');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB =  require('./config/db')
const port = process.env.PORT || 5000;

connectDB()

const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/stats', require('./routes/statRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

if(process.env.NODE_ENV == 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, '../','frontend','build','index.html')))
}

io.on('connection', (socket) => {
    console.log(`a user connected from socket: ${socket.id}`);
    socket.on('ping', (msg) => {
        console.log('ping: ' + msg);
        socket.emit('pong')
    });
});


server.listen(3000, () => {
    console.log('listening on *:3000');
});

app.use(errorHandler)

app.listen(port, () => console.log(`Server started at port ${port}`));




