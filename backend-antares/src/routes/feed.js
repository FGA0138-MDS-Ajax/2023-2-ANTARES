const router = require('express').Router();
const feedController = require('../controllers/feedController');

router
    .route('/feed')
    .get((req, res) => feedController.getAll(req, res))
    
module.exports = router;