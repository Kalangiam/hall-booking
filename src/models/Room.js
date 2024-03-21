
import mongoose from './index.js'

const Room = new mongoose.Schema({
    seats: {
        type: String,
        required: true,
        message: "seat capacity is required"
    },
    amenities: {
        type: Array,
        required:true,
        message:"amenities are required"
    },
    price: {
        type: String,
        required: true,
        message: "price is required"
    },
  

}, {
    versionKey: false,
    collection: 'rooms'
})

const RoomModel = mongoose.model('rooms', Room)

export default RoomModel

