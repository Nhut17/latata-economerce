const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req,res,next) => {
    err.statusCode = err.statusCode || 500

    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success: true,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    if(process.env.NODE_ENV === 'PRODUCTION'){
        let error = {...err}

        error.message = err.message

        // Wrong Mongoose Object ID Error
        if(err.name === 'CastError'){
            const message = `Resource not found. Invalid: ${err.path}`
            error = new ErrorHandler(message,400)
        }

        // Handling Mongoose Validation Error
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(value => value.message)
            error = new ErrorHandler(message,400)
        }

        // Handling Mongoose duplicate key errors
        if(err.code === 110000){
            const message = `Duplicare`
        }


        // Handlin Exprired JWT error
        if(err.name === 'TokenExpiredError')
        {
            const message = 'JSON web Token is expired. Try Again!!!'
            error = new ErrorHandler(message,400)
        }

        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error',
        })

    }

  
}