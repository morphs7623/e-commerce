const Product = require('../../models/product')
const Cart = require('../../models/cart')
const Order = require('../../models/order')

const calculateTotal = (items) => {
    let total = 0;

    items.forEach(item => {
        total += item.quantity * item.price;
    });

    return total;
};

const addToCart = async (req, res) => {
    try{
        const {productId, quantity} = req.body;
        const userId = req.user.id;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if there is enough stock
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }

        
        // Find the user's cart or create a new one if it doesn't exist
        let cart = await Cart.findOne({ userId })

        if (cart) {
            // Check if the product is already in the cart
            const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      
            if (productIndex > -1) {
              // Update the quantity of the existing product in the cart
              cart.items[productIndex].quantity += quantity;
            } else {
              // Add the new product to the cart
              cart.items.push({ productId, quantity });
            }
        } else {
            // Create a new cart if the user doesn't have one
            cart = new Cart({
              userId,
              items: [{ productId, quantity }]
            });
        }

        await cart.save()

        const newStock = product.stock - quantity;
        await Product.findByIdAndUpdate(productId, { stock: newStock }, { new: true });

        res.status(200).json({ message: 'Product added to cart', cart });
   
    }catch(err){
        res.status(500).json({ error: 'Failed to add product to cart' });
        console.log(err)
    }
}

const removeCart = async (res, req) => {
    try{
        const productId = req.params.id;
        const userId = req.user.id;

        



    }catch(err){
        res.status(500).json({ error: 'Failed to remove product to cart' });
        console.log(err)
    }

}

const orderProduct = async (req, res) => {
    try{
        const userId = req.user.id;

        // Find the user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Fetch product details for each item in the cart
        const itemsWithDetails = await Promise.all(cart.items.map(async (cartItem) => {
            const product = await Product.findById(cartItem.productId);
            if (!product) {
                throw new Error(`Product with ID ${cartItem.productId} not found`);
            }

            // Return item with quantity and price fetched from the product
            return {
                productId: cartItem.productId,
                quantity: cartItem.quantity,
                price: product.price // Fetch the price from the product document
            };
        }));

        // Calculate the total amount using the fetched items with price
        const totalAmount = calculateTotal(itemsWithDetails);
        
        // Create a new order
        const order = new Order({
            userId: userId,
            items: itemsWithDetails,
            totalAmount: totalAmount, // Helper function to calculate the total
            address: req.body.address,
            paymentMethod: req.body.paymentMethod,
            createdAt: new Date()
        });

        await order.save();

        res.status(201).json({ message: 'Order created successfully', order });
        
   
    }catch(err){
        res.status(500).json({ error: 'Failed to order product' });
        console.log(err)
    }
}

module.exports = {addToCart, orderProduct}