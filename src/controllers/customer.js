import BookModel from "../models/BookRoom.js";
import RoomModel from "../models/Room.js";
const getAllCustomers = async (req, res) => {
    try {
        const bookings = await BookModel.find();
        const customers = [...new Set(bookings.map(booking => booking.name))];

        res.status(200).send({
            message: "Customers who booked rooms fetched successfully",
            customers: customers
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal server error"
        });
    }
}

const book = async (req, res) => {
    try {
        let { name, date, start_time, end_time, room_id } = req.body
        const existingBooking = await BookModel.findOne({ room_id, date });

        if (existingBooking) {
            return res.status(400).send({ message: "Room already booked on the specified date." });
        }
        await BookModel.create({ name, date, start_time, end_time, room_id });

        res.status(200).send({
            message: "Room Booked Successfully"
        });

    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal server error"
        });
    }
}



const create = async (req, res) => {
    try {
        let { seats, amenities, price } = req.body

        await RoomModel.create({ seats, amenities, price })
        res.status(200).send({
            message: "Room created Succesfully"
        })

    } catch (error) {
        res.status(500).send({
            message: error.message || "internal server error"
        })
    }
}


const getAllRooms = async (req, res) => {
    try {
        const rooms = await RoomModel.find({});
        const roomsWithBookings = await Promise.all(rooms.map(async (room) => {
            const bookings = await BookModel.find({ room_id: room._id });
            return { ...room.toObject(), bookings };
        }));

        res.status(200).send({
            message: "Rooms fetched successfully",
            rooms: roomsWithBookings
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal server error"
        });
    }
}

const times = async (req, res) => {
    try {
        const bookings = await BookModel.find();
        const customerBookingsMap = {};
        bookings.forEach(booking => {
            const { name } = booking;
            if (customerBookingsMap[name]) {
                customerBookingsMap[name]++;
            } else {
                customerBookingsMap[name] = 1;
            }
        });

        res.status(200).send({
            message: "Number of times each customer booked rooms fetched successfully",
            customerBookings: customerBookingsMap
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal server error"
        });
    }
}

const customer = async (req, res) => {
    try {
        const { customerName } = req.query;

        if (!customerName) {
            return res.status(400).send({ message: "Customer name is required." });
        }

        const customerBookings = await BookModel.find({ name: customerName });

        res.status(200).send({
            message: `Bookings for ${customerName} fetched successfully`,
            bookings: customerBookings
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal server error"
        });
    }
}




export default {
    book,
    create,
    getAllRooms,
    getAllCustomers,
    times,
    customer
}