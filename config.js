module.exports = {
    dbConnection: process.env.DB_CONNECTION || 'mongodb://127.0.0.1:27017/babyGPS' || 'mongodb+srv://user:user@cluster0-4iy67.gcp.mongodb.net/admin?retryWrites=true&w=majority' ,
    PORT: process.env.PORT || 5000
};