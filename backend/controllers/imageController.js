const asyncHandler = require('express-async-handler')
const { BlobServiceClient } = require('@azure/storage-blob')
const { User, UserImages } = require('../models/userModel')

const getAllImagesFromAzure = asyncHandler(async (req, res) => {
    let blobImages = []
    try {
        let images = [];
        if (String(req.query.isAdmin) === 'true') {
            images = await UserImages.find({})
        } else {
            images = await UserImages.find({ user: req.query.userid })
        }

        // const connStr = process.env.AZURE_STORAGE_CONN_STRING
        // const blobStorageClient = BlobServiceClient.fromConnectionString(connStr)
        // const containerClient = blobStorageClient.getContainerClient(
        //     process.env.AZURE_BLOB_CONTAINER
        // )
        // for await (const blob of containerClient.listBlobsFlat()) {
        //     const blockBlobClient = containerClient.getBlockBlobClient(blob.name)
        //     //console.log(blob.properties.createdOn)
        //     blobImages.push({
        //         url: blockBlobClient.url,
        //         created: blob.properties.createdOn,
        //     })
        // }
        res.json({ images })
    } catch (error) {
        res.status(404)
        throw new Error('Images not found')
    }
})
module.exports = getAllImagesFromAzure
