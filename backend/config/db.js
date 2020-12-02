const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        // console.log(process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error)
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}
module.exports = connectDB