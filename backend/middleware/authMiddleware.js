const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler( async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //GET TOKEN
            token = req.headers.authorization.split(' ')[1]

            //VERIFY TOKEN
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
              
            //get user from token
            req.user = await User.findById(decoded.id).select('-password')//get user without getting the hased password
            

            next()

        }catch (error) {
             console.log(error)
             res.status(401)
             throw new Error('Could not verify user')
        }
    }
    if(!token) {
        res.status(401)
        throw new Error('Could not verify user, No token')
    }

})

module.exports = { protect }