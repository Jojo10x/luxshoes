const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://jojo:101010@cluster0.sqrtk3u.mongodb.net/testDB?retryWrites=true&w=majority&appName=Cluster0', )
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }   
}   

module.exports = connectDB;