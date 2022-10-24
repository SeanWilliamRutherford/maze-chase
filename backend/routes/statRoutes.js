const express = require('express');
const router = express.Router();
const {getStats, setStats, updateStats, deleteStats} = require('../controllers/statController');


router.get('/', getStats);

router.post('/', setStats);

router.put('/:id', updateStats);

router.delete('/:id', deleteStats);

module.exports = router