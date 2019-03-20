module.exports = server => {
    server.get('/', (req, res, next) => {
        res.send({ status: 'Server configured' });
    });
}