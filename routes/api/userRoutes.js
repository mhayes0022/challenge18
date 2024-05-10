//GET all users
//GET a single user by it's _id and populated thought and friend data
//POST a new user

// example data
// {
//     "username": "lernantino",
//     "email": "lernantino@gmail.com"
//   }

//PUT to update a user by it's _id
//DELETE to remove user by it's _id

//BONUS: remove a user's associated thoughts when deleted

//Is the following supposed to be in a seperate file? Unclear.

// /api/users/:userId/friends/:friendsId
//POST to add a new friend to a user's friend list
//DELETE to remove a friend from a user's friend list
const router = require('express').Router()
const {
    addUser,
    getUsers,
    getOneUser,
    updateUser
}= require('../../controllers/userController')

router.route('/').post(addUser).get(getUsers)

router.route('/:userId').get(getOneUser).put(updateUser)

router.route('/:userId/friends/:friendsId').post().delete()

module.exports = router