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
    origin: ['http://localhost:3000']
}));

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('carrier message', (data) => {
        io.emit('carrier message', data);
    });
    socket.on('payment updated', (data) => {
        console.log('Payment updated for chat ID:', data.chatID);
        io.emit('payment updated', data);
    });
    socket.on('customer message', (data) => {
        io.emit('customer message', data);
    });
    socket.on('carrier approval', (data) => {
        console.log('Carrier approval received:', data);
        io.emit('carrier approval', data);
    });
    socket.on('carrier approval second', (data) => {
        console.log('Carrier approval2 received:', data);
        io.emit('carrier approval second', data);
    });
    socket.on('shipper approval', (data) => {
        console.log('Shipper approval received:', data);
        io.emit('shipper approval', data);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
});