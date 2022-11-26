const Cart = require('../models/cart')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')


// add to cart
exports.addToCart = catchAsyncError( async (req,res,next) => {

    const {
        product,
        price,
        quantity
    } = req.body


    const cartOld = await Cart.findOne({
        product: product
        
    })

    console.log(cartOld)

    if(product == cartOld.product) 
    {
       
        await Cart.findByIdAndUpdate(product,{
            ...cartOld,
            quantity: cartOld.quantity + quantity
        })
    } else{
   
         await Cart.create({
            product,
            price,
            quantity
        })
    }


    res.status(201).json({
        success: true
       
    })

})


// exports.getCart = catchAsyncError( async (req, res, next) => {



// })