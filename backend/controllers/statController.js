const { Global } = require('@emotion/react');
const asyncHandler = require('express-async-handler')

const Stats = require('../models/statModel')

const getStats = asyncHandler( async (req,res) => {
    const stats = await Stats.find()

    res.status(200).json(stats);
})

const setStats = asyncHandler( async (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Add text input')
    }

    const stats = await Stats.create({
        text: req.body.text
    })

    res.status(200).json(stats);
})

const updateStats = asyncHandler( async (req,res) => {
    const stats = await Stats.findById(req.params.id)

    if(!stats) {
        res.status(400)
        throw new Error('Stats not found')
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

    await stats.remove()

    
    res.status(200).json({id: req.params.id});
})


module.exports = {
    getStats,
    setStats,
    updateStats,
    deleteStats,
}