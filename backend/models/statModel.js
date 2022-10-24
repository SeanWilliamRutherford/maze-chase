const mongoose = require('mongoose')

const statSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Add text value']
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Stats', statSchema )