const express = require('express');
const app = express();


const http = require('http').Server(app);

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

const port = 3003;


app.use('/', express.static('public'))

io.on('connection', (socket) => {
    console.log("connected");
    socket.on('message', (event) => {
        // console.log(event);
        socket.broadcast.emit('message', event)
    })
});

io.on('disconnect', (event) => {
    console.log('someone left')
})


http.listen(port, () => {
    console.log(`server listening on port ${port}`);
    console.log(`Preview at http://localhost:${port}`)
    
});

