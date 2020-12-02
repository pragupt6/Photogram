const express = require('express')

const getAllImagesFromAzure = require('../controllers/imageController')
const router = express.Router()
router.route('/').get(getAllImagesFromAzure)
module.exports = router
