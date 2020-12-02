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
app.get('/', (req, res) => {
	res.send('API is running')
})
app.use('/users', userRoute)
// app.use('/users/login', userRoute)
// app.use('/userimages/create', userRoute)
app.use('/api/getimages', imageRoute)
app.use('/api/upload', uploadRoutes)
// const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
// const azureStorage = new MulterAzureStorage({
// 	connectionString: 'DefaultEndpointsProtocol=https;AccountName=pg6reactapps;AccountKey=asNjSc9kLQYHy/jXOsW8cZXvIcK92mq3+O4vXs5cWjIgyZe5iK/8PtauNZHLdaiJ6eg8IyUJpcYivFZp2tIxOQ==;EndpointSuffix=core.windows.net',
// 	accessKey: 'asNjSc9kLQYHy/jXOsW8cZXvIcK92mq3+O4vXs5cWjIgyZe5iK/8PtauNZHLdaiJ6eg8IyUJpcYivFZp2tIxOQ==',
// 	accountName: 'pg6reactapps',
// 	containerName: 'photoapp',
// 	blobName: 'abc.jpg',
// 	// metadata: resolveMetadata,
// 	containerAccessLevel: 'blob',
// 	urlExpirationTime: 60
// });

// const upload = multer({
// 	storage: azureStorage
// });
// app.post('/api/putimage', upload.single('image'), async (req, res, next) => {
// 	console.log(req.files)
// 	res.status(200).json(req.files)
// });
// router.post("/upload", { upload(req, res, err => {}) });
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
