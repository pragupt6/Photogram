const path = require('path')
const express = require('express')
const multer = require('multer')
const router = express.Router()
const { BlobServiceClient } = require('@azure/storage-blob')
const { User, UserImages } = require('../models/userModel')
const fs = require('fs')
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    },
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images only!')
        //res.send({ 'error': 'Images only' })
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
})
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (req.file == undefined) {
            res.status(401).json({ 'Error': 'No image selected' })
        }
        else {
            const connStr = process.env.AZURE_STORAGE_CONN_STRING
            const blobStorageClient = BlobServiceClient.fromConnectionString(connStr)
            const containerClient = blobStorageClient.getContainerClient(
                process.env.AZURE_BLOB_CONTAINER
            )
            const blockBlobClient = containerClient.getBlockBlobClient(req.file.filename)
            await blockBlobClient.uploadFile(req.file.path);
            const createImage = new UserImages({ user: req.body.userid, imageURL: blockBlobClient.url })
            const image = await createImage.save()
            const deleteFile = fs.unlinkSync(req.file.path)
            res.status(201).json({
                // 'user': user,
                'imageURL': blockBlobClient.url,
                'file': req.file.path
            })
        }
    } catch (error) {
        console.log(error)
    }

})
module.exports = router