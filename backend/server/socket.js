const express = require('express');
const app = express();
const port = 8083;
const http = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(cors({
    origin: 'http://localhost:3000'
}));

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('carrier message', (data) => {
        io.emit('carrier message', data);
    });
    socket.on('customer message', (data) => {
        io.emit('customer message', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
});