module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 5000,
    URL: process.env.BASE_URL || 'http://localhost:5000',
    MYSQL_URI: process.env.MYSQL_URI || 'mongodb://localhost:27017/letterp-api',
    JWT_SECRET: process.env.JWT_SECRET || 'secret1',
    MYSQL_USER: process.env.MYSQL_USER || 'root',
    MYSQL_PASS: process.env.MYSQL_PASS || 'Cyfercore007',
    MYSQL_DB: process.env.MYSQL_DB || 'inventory'
}