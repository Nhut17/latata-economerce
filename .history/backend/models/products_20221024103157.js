const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true,  'Please enter product name'],
        trim:true,
        maxLength:[100,'Product name cannot exceed 10 characters'],     
    },
    price: {
        type: Number,
        required: [true,  'Please enter product price'],
        maxLength:[5,'Product price cannot exceed 5 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true,  'Please enter product description'],
      
    },
    ratings: {
        type: Number,
        default: 0
    },
    images:[
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category: {
        type: String,
        required: [true, ' Please select category for this product'],
        enum: {
            values: [
                'Phone',
                'Laptop',
                'Tablet',
                'Accessories',
                'SmartWatch',
                'Watch',
                'TV',
                'SmartHome',
                'Home'
            ],
            message: 'Please enter correct category for product'
        }
    },
    stock: {
        type: Number,
        required: [true, ' Please enter product stock '],
        maxLength:[5,'Product name cannot exceed 5 characters'],
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            name: {
                type: String,
                required: true,
            },
            ratting: {
                type: Number,
                required: true,
            },
            comment: {
                type:String,
                required:true,
            }

        }
    ],
    user: {

    },
    createdAt: {
        type:Date,
        default: Date.now
    }


})
module.exports = mongoose.model('Product',productSchema)