const io = require('socket.io');

module.exports = io => {
    server.get('/sockettest', async (req, res, next) => {
        io.on('connect', async (client) => {
            console.log('Client connected');
            client.on('join', async (data) => {
                console.log('Data from client: ' + data);
                client.emit('Data recived and will be process!');
            });
        });
    });
}