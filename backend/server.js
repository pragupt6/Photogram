const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const imageRoute = require('./routes/imageRoute')
const userRoute = require('./routes/userRoute')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')
const multer = require('multer')
const uploadRoutes = require('./routes/uploadRoute.js')
const path = require('path')
const register = require('./routes/userRoute.js')
const connectDB = require('./config/db')
// const multer = require('multer')
// const MulterAzureStorage = require('multer-azure-blob-storage').MulterAzureStorage;
// import { notFound, errorHandler } from './middleware/errorMiddleware.js'
colors.enable()
dotenv.config()
// const mongoose = require('mongoose')
// await mongoose.connect('mongodb+srv://prat1234:prat1234@pg6cluster.fj5rm.azure.mongodb.net/proshop')
// mongoose.connect('mongodb+srv://prat1234:prat1234@pg6cluster.fj5rm.azure.mongodb.net/proshop', { useNewUrlParser: true });
connectDB()
const app = express()
app.use(express.json())

app.use('/users', userRoute)
app.use('/api/getimages', imageRoute)
app.use('/api/upload', uploadRoutes)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join('./', 'frontend/build')))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve('./', 'frontend', 'build', 'index.html'))
	})
}
else {
	app.get('/', (req, res) => {
		res.send('API is running')
	})
}
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(
		`Server is running at ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow
			.bold
	)
)
