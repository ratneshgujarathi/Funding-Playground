const express = require('express');
const router = express.Router();
const { registerUser, getUser,
    getUsers,
    updateUser,
    deleteUser, } = require('../controllers/userController')

router.route('/').get(getUsers).post(registerUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;