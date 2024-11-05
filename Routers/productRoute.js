const express = require('express');
const router = express.Router();
const {addProducts, updateProducts, deleteProducts, getProduct} = require('../controllers/productcontroller/admincontroller')
const {addToCart, orderProduct} = require('../controllers/productcontroller/usercontroller')

const { jwtAuthMiddleware } = require('../middleware/auth');


router.post('/addproduct', jwtAuthMiddleware, addProducts)

router.put('/update/:id', jwtAuthMiddleware, updateProducts)

router.delete('/delete/:id', jwtAuthMiddleware, deleteProducts)

router.get('/', jwtAuthMiddleware, getProduct)

router.post('/addcart', jwtAuthMiddleware, addToCart)

router.post('/cart/order', jwtAuthMiddleware, orderProduct)


module.exports = router