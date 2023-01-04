// custom error handler

const errorHandler = ( error, req, res, next ) => {

    const errorStatus = error.status || 500;
    const errorMsg = error.message || 'Unknown error'

    res.status(errorStatus).json({
        message : errorMsg,
        status : errorStatus,
        // stack : error.stack
    })

};

export default errorHandler