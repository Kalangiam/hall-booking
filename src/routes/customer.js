import express from 'express'
import CustomerController from '../controllers/customer.js'
import BookModel from '../models/BookRoom.js'

const router = express.Router()

router.post('/book', CustomerController.book)
router.post('/create', CustomerController.create)
router.get('/listroom', CustomerController.getAllRooms)
router.get('/listcustomer', CustomerController.getAllCustomers)
router.get('/times', CustomerController.times)
router.get('/customer', CustomerController.customer)

export default router