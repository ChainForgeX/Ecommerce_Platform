const express = require("express");
const router = express.Router();
const {placeOrder, getOrders, updateOrderStatus} = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

router.post("/", protect, placeOrder);
router.get("/", protect, getOrders);
router.put("/:id", protect, isAdmin, updateOrderStatus);

module.exports = router;