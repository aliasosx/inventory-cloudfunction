module.exports = server => {
    server.get('/', (req, res, next) => {
        res.send({ status: 'Letter-p backend system has been started ready for service' });
    });
}