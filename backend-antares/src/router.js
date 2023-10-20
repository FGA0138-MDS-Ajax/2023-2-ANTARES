const express = require('express');
const router = express.Router();
const usersController = require('./controllers/userController');

router.get('/users', usersController.getAllUsers);
router.post('/users', usersController.addUser);
router.delete('/users/:login', usersController.deleteUser);
router.patch('/users/:login/toggle-star', usersController.toggle_star)

module.exports = router;