const mongoose = require('mongoose')

const statsSchema = mongoose.Schema({ hiscore: {type: Number, default: 0} })


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User requires a name']
    },
    email: {
        type: String,
        required: [true, 'User requires an email']
    },
    password: {
        type: String,
        required: [true, 'User requires a password']
    },
    stats: {
        type: statsSchema
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
//module.exports = mongoose.model('stats', statsSchema)