const Product = require('../models/products')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')


//create new product => /api/v1/admin/product/new
exports.newProduct = catchAsyncError( async ( req, res, next ) => {
    
    // req.body.user = req.user._id   


    const pro = req.body
    const { price,promotion} = req.body
    
    const priceDeal = promotion > 0 ? price - (price* (promotion/100)) : price
    console.log(pro)
    
    const product =  await Product.create({
        ...pro,
        priceDeal
    })


    res.status(201).json({
        success: true,
        product
    })

})


// get all products => api/v1/products?keyword=apple
exports.getProducts = catchAsyncError( async (req,res,next) => {

    const productCount = await Product.countDocuments()

    // const token = req.headers.authentication
    // console.log(token)

    const apiFeatures = new APIFeatures(Product.find(), req.query )
                            .search()
                            .filter()
                            // .pagination(resPerPage)

    const products = await apiFeatures.query

    res.status(200).json({
        success: true,
        count: products.length,
        productCount,
        products
    })
}
)

// Get single product details => /api/v1/product/:id
exports.getSingleProduct = catchAsyncError( async ( req, res, next) => {

    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }

    res.status(200).json({
        success: true,
        product
    })

})


// update Product => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncError( async ( req, res, next) => {

    let product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false,
    }).populate('category')

    res.status(200).json({
        success: true,
        product
    })

})

// Delete Product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncError( async ( req, res, next) => {

    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }

    await product.remove()

    res.status(200).json({
        success: true,
        message:'Product is deleted',
    })


})

// Create new review => api/v1/review
exports.createProductReview = catchAsyncError(async (req,res,next) => {
    const { rating, comment, productId} = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);


    


    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if( isReviewed ){
        product.reviews.forEach( review => {
            if( review.user.toString() === req.user._id.toString() ){
                review.comment = comment;
                review.rating = rating;
            }
            })
    } else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc,item) => item.rating + acc,0) / product.reviews.length

    await product.save({ validateBeforeSave: false});

    res.status(200).json({
        success: true
    })

})


// Get Product Reviews => api/v1/reviews
exports.getProductReviews = catchAsyncError( async(req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})


// Delete Product Reviews => api/v1/reviews
exports.deleteReview = catchAsyncError( async(req, res, next) => {
    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const  numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc,item) => item.rating + acc,0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    },{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})