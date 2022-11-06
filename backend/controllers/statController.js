const { Global } = require('@emotion/react');
const asyncHandler = require('express-async-handler')

const Stats = require('../models/statModel')
const User = require('../models/userModel')

const getStats = asyncHandler( async (req,res) => {
    const stats = await Stats.find({user: req.user.id})

    res.status(200).json(stats);
})

const setStats = asyncHandler( async (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Add text input')
    }

    const stats = await Stats.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(stats);
})

const updateStats = asyncHandler( async (req,res) => {
    const stats = await Stats.findById(req.params.id)

    if(!stats) {
        res.status(400)
        throw new Error('Stats not found')
    }

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('user not found')
    }

    if(stats.user.toString() !== user.id){
        res.status(401)
        throw new Error('user not authorized')
    }

    const updatedStats = await Stats.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedStats);
})

const deleteStats = asyncHandler( async (req,res) => {
    const stats = await Stats.findById(req.params.id)

    if(!stats) {
        res.status(400)
        throw new Error('Stats not found')
    }

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('user not found')
    }

    if(stats.user.toString() !== user.id){
        res.status(401)
        throw new Error('user not authorized')
    }

    await stats.remove()

    
    res.status(200).json({id: req.params.id});
})


module.exports = {
    getStats,
    setStats,
    updateStats,
    deleteStats,
}