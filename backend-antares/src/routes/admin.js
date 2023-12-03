const router = require('express').Router();
const adminController = require('../controllers/adminController');

router
    .route('/admin')
    .post((req, res) => adminController.registrarLog(req, res))
    .get((req, res) => adminController.getAllLogs(req, res));
module.exports = router;