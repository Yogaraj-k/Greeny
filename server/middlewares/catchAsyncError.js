const asyncHandler = (func)=>(req, res, next)=>{
    Promise.resolve(func(req, res, next)).catch((error)=>{
        if(error.status === 400){
            res.status(400).json({message:error.message});
        }
        else{
            res.status(500).json({message:error.message});
        }
    })
}

module.exports = asyncHandler;