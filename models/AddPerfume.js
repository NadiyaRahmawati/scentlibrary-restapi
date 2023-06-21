// const { number } = require('joi')
const mongoose = require('mongoose')

const addPerfumeSchema = mongoose.Schema({
    merekperfume: {
        type: String,
        required: true
    },
    namaperfume: {
        type: String,
        required: true
    },
    deskripsiperfume: {
        type: String,
        required: true
    },
    jenisperfume: {
        type: String,
        required:true
    },
    ukuranperfume: {
        type: Number,
        required:true
    },
    hargaperfume: {
        type: Number,
        required: true
    },
    genderperfume: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    versionKey: false
})
module.exports = mongoose.model('AddPerfume', addPerfumeSchema, 'addPerfume')