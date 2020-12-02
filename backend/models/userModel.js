const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userScheme = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    }

},
    {
        timestamps: true
    }

)

userScheme.methods.matchpassword = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password)
}

userScheme.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const userImagesScheme = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    imageURL: {
        type: String,
        required: true,
    }
})
const User = mongoose.model('User', userScheme)
const UserImages = mongoose.model('UserImages', userImagesScheme)
module.exports = { User, UserImages }