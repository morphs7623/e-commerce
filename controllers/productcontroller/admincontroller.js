const Product = require('../../models/product')
const adminRole = require('../../middleware/adminrole')


const addProducts = async (req, res) => {
    try {

        if(!(await adminRole(req.user.id)))
            return res.status(403).json({message:"user do not have access"})

        const { name, description, price, stock, category } = req.body;
    
        const product = new Product({
          name,
          description,
          price,
          stock,
          category
        });
    
        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
      } catch (err) {
        res.status(500).json({ error: 'Failed to add product' });
      }
}

const updateProducts = async (req, res) => {
  try{
    if(!(await adminRole(req.user.id)))
      return res.status(403).json({message:"user do not have access"})

    const productId = req.params.id; // Extract the id from the URL parameter
    const updatedProductData = req.body; // Updated data for the person
    
    const response = await Product.findByIdAndUpdate(productId, updatedProductData, {
          new: true, // Return the updated document
          runValidators: true, // Run Mongoose validation
    })

    console.log(response)
    
    if (!response){
        return res.status(404).json({ error: 'product not found' }) ;
    }

    console. log ('product data updated') ; 
    res.status(200).json(response);


  }catch(err){
    res.status(500).json({ error: 'Failed to update product' });
  }
}

const deleteProducts = async (req, res) => {
  try{
    if(!(await adminRole(req.user.id)))
      return res.status(403).json({message:"user do not have access"})

    const productId = req.params.id; // Extract the id from the URL parameter
    
    const response = await Product.findByIdAndDelete(productId)
      
    if (!response){
        return res.status(404).json({ error: 'product not found' }) ;
    }

    console. log ('product ddeleted') ; 
    res.status(200).json(response);


  }catch(err){
    res.status(500).json({ error: 'Failed to delete product' });
  }
}

const getProduct = async (req, res) => {
  try{
      const responce = await Product.find();
      res.status(200).json({products: responce})
      console.log("responce coming")

  }catch(err){
      console.log(err);
      res.status(500).json({message:'internal server error'})
  }
}
module.exports = {addProducts, updateProducts, deleteProducts, getProduct}