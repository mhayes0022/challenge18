//GET all users
//GET a single user by it's _id and populated thought and friend data
//POST a new user
//PUT to update a user by it's _id
//DELETE to remove user by it's _id

//BONUS: remove a user's associated thoughts when deleted

//Is the following supposed to be in a seperate file? Unclear.

// /api/users/:usersId/friends/:friendsId
//POST to add a new friend to a user's friend list
//DELETE to remove a friend from a user's friend list



module.exports = {
    async addUser(req, res){

    }, 
    async getUsers(req, res){

    },
    async getOneUser(req, res){

    },
    async updateUser(req, res){

    },
    async deleteUser(req, res){

    },
    async addUserFriend(req, res){

    },
    async deleteUserFriend(req, res){
        
    }
}