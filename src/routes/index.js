import express from "express"
import IndexController from '../controllers/index.js'
import CustomerRoutes from './customer.js'

const router = express.Router();

router.get('/',IndexController.home)
router.use('/hall',CustomerRoutes)


export default router