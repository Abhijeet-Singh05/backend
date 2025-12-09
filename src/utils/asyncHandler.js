// A higher order function to handle async request handlers
// using promise chaining instead of try catch block

const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req,res,next))
        .catch((err) => {next(err)});
    }
};






export {asyncHandler};




/*
// Implementation of asyncHandler in try catch block
const asyncHandler = (fn) => { 
    async (req,res,next) => {
        try{
            await fn(req,res,next);
        }
        catch(err){
            res.status(err.code || 500).json({
                success: false,
                message: err.message 
            })
        }
    } 
};
*/