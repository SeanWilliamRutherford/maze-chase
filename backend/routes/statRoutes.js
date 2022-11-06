const express = require('express');
const router = express.Router();
const {getStats, setStats, updateStats, deleteStats} = require('../controllers/statController');
const {protect} = require('../middleware/authMiddleware')


router.get('/', protect, getStats);

router.post('/', protect, setStats);

router.put('/:id', protect, updateStats);

router.delete('/:id', protect, deleteStats);

module.exports = router