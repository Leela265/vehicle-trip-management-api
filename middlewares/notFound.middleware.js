export const notFoundMiddleware=(req,res) =>{
    res.status(404).json({
        error: 'This request is not found'
    })
}