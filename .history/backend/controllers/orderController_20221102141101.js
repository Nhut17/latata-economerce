const Order = require('../models/order');
const Product = require('../models/products');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


/// Create a new order => api/v1/order/new

exports.newOrder = catchAsyncErrors( async(req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo

    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,    
        paidAt: Date.now(),
        user: req.user._id
    })


    res.status(200).json({
        success: true,
        order
    })

})


// get single order => api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors( async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')


    if (!order)
    {
        return next( new ErrorHandler('No order found with this ID',404))
    }

    res.status(200).json({
        success:true,
        order
    })
})

// get single order => api/v1/orders/me
exports.myOrder = catchAsyncErrors( async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')


    if (!order)
    {
        return next( new ErrorHandler('No order found with this ID',404))
    }

    res.status(200).json({
        success:true,
        order
    })
})