const router = require('express').Router()
const {
    getUsers,
    getOneUser,
    addUser,
    updateUser,
    deleteUser,
    addUserFriend,
    deleteUserFriend
}= require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(addUser);

// /api/users/:userId
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addUserFriend).delete(deleteUserFriend);

module.exports = router;