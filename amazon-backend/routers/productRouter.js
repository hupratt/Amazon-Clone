import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Product from '../models/productsModel.js'
import {seed} from '../seed.js'
import { isAdmin } from '../utils.js';

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req,res) => {
    // get all items
    const products = await Product.find({});
    res.send(products);
}));

productRouter.get('/seed', expressAsyncHandler(async(req,res) => {
    const createdProducts = await Product.insertMany(seed);
    res.send( {createdProducts} );
}))



productRouter.get('/:id', expressAsyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id);

    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message: "Product not found."});
    }
}))

productRouter.put(
    '/update/:id',
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id);
      if (product) {
        product.price = req.body.price || product.price;
        product.name = req.body.name || product.name;
        product.stock = req.body.stock || product.stock;
        product.description = req.body.description || product.description;
        
        const updatedProduct = await product.save();
        res.send({
          _id: updatedProduct._id,
          price: updatedProduct.price,
          name: updatedProduct.name,
          stock: updatedProduct.stock,
          description: updatedProduct.description
        });
      }
    })
  );


export default productRouter;