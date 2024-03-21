
import mongoose from './index.js'

const Book = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        message: "Name is required"
    },
    date: {
        type: String,
        required:true,
        message:"Date is required"
    },
    start_time: {
        type: String,
        required: true,
        message: "start time is required"
    },
    end_time: {
        type: String,
        required: true,
        message: "End time is required"
    },
    room_id: {
        type: String,
        required: true
    },

}, {
    versionKey: false,
    collection: 'Bookroom'
})

const BookModel = mongoose.model('Bookroom', Book)

export default BookModel

