const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const { User, UserImages } = require('../models/userModel')

const registerUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body
        const userExists = await User.findOne({ email })

        if (userExists) {
            res.status(400)
            throw new Error('User already exists')
        }

        const createUser = await User.create({ email, password, isAdmin: false })
        if (createUser) {
            res.status(201).json({
                _id: createUser._id,
                email: email,
                isAdmin: createUser.isAdmin
            })
        } else {
            res.status(404)
            throw new Error('User Not Found')
        }

    } catch (error) {
        res.status(404)
        throw new Error('User not found')
    }
})
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists && (await userExists.matchpassword(password))) {
        res.json({
            _id: userExists._id,
            email: userExists.email,
            isAdmin: userExists.isAdmin,
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})
module.exports = { registerUser, authUser }
