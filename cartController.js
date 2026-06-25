const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async(req, res)=>{
    try{
        const {productId, quantity} = req.body;
        let cart = await Cart.findOne({
            user : req.user.id
        });
        if(!cart){
            cart = await Cart.create({
                user : req.user.id,
                products : []
            });
        }

        const existingProduct = cart.products.find(item => item.product.toString() === productId);
        if(existingProduct){
            existingProduct.quantity += quantity;
        }else{
            cart.products.push({
                product : productId,
                quantity
            });
        }
        await cart.save();
        
        res.status(200).json(cart);
    }catch(error){
        res.status(500).json({
            message : error.message
        });
    }
};

const getCart = async(req, res)=>{
    try{
        const cart = await Cart.findOne({
            user : req.user.id
        }).populate("products.product");
        if(!cart){
            return res.status(404).json({
                message : "Cart Not Found"
            });
        }
        let subtotal = 0;
        cart.products.forEach(item => {
            subtotal+= item.product.price * item.quantity;
        });
        const shipping = subtotal > 1000 ? 0 : 100;
        const tax = Number((subtotal * 0.18).toFixed(2));
        const grandTotal = subtotal + shipping + tax;
        res.status(200).json({
            products : cart.products,
            subtotal,
            shipping,
            tax,
            grandTotal
        });
    }catch(error){
        res.status(500).json({
            message : error.message
        });
    }
};

const removeFromCart = async(req, res)=>{
    try{
        const cart = await Cart.findOne({
            user : req.user.id
        });
        if(!cart){
            return res.status(404).json({
                message : "Cart Not Found"
            });
        }
        cart.products = cart.products.filter(item => item.product.toString()!= req.params.productId);
        await cart.save();

        res.status(200).json({
            message : "Product Removed"
        });
    }catch(error){
        res.status(500).json({
            message : error.message
        });
    }
};

module.exports = {addToCart, getCart, removeFromCart};