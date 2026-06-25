const Order = require("../models/Order");
const Cart = require("../models/Cart");

const placeOrder = async(req, res)=>{
    try{
        const cart = await Cart.findOne({
            user : req.user.id
        }).populate("products.product");
        if(!cart || cart.products.length === 0){
            return res.status(400).json({
                message : "Cart is Empty"
            });
        }
        let totalAmount = 0;
        cart.products.forEach(item =>{
            totalAmount += item.product.price * item.quantity;
        });
        const order = await Order.create({
            user : req.user.id,
            products : cart.products,
            totalAmount
        });
        cart.products = [];
        await cart.save();
        res.status(201).json({
            message : "Order Place Successfully",
            order
        });
    }catch(error){
        res.status(500).json({
            message : error.message
        });
    }
};

const getOrders = async (req, res) => {

    try {

        let orders;

        if (req.user.role === "admin") {

            orders = await Order.find()

                .populate("products.product")

                .populate("user", "name email");

        }

        else {

            orders = await Order.find({

                user: req.user.id

            }).populate("products.product");

        }

        res.status(200).json(orders);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

const updateOrderStatus = async(req, res)=>{
    try{
        const order = await Order.findByIdAndUpdate(req.params.id, { status : req.body.status}, { new : true});
        if(!order){
            return res.status(404).json({
                message : "Order Not Found"
            });
        }
        res.status(200).json({
            message : "Order Updated",
            order
        });
    }catch(error){
        res.status(500).json({
            message : error.message
        });
    }
};

module.exports = {placeOrder, getOrders, updateOrderStatus};