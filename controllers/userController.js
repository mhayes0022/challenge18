//GET all users
//GET a single user by it's _id and populated thought and friend data
//POST a new user
//PUT to update a user by it's _id
//DELETE to remove user by it's _id

//BONUS: remove a user's associated thoughts when deleted

//POST to add a new friend to a user's friend list
//DELETE to remove a friend from a user's friend list

//const { ObjectId } = require('mongoose');
const { User, Thought } = require('../models');


module.exports = {
    
    async getUsers(req, res) {
        try {
            const users = await User.find();
            
            res.json(users);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    
    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).populate('thoughts').populate('friends')
            //.select('-__v');
            
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }
            
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    async addUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No uer found with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No such user exists' });
            }

            const thoughts = await Thought.findAndRemove(
                { _id: req.params.userId },
                { $pull: { thoughts: req.params.userId } },
                { new: true }
            );

            if (!thoughts) {
                return res.status(404).json({ message: 'User deleted, but no thoughts were found' });
            }
            //await Thought.deleteMany({ _id: req.params.userId });
            res.json({ message: 'User and associated thoughts successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addUserFriend(req, res) {
        console.log('You are adding a friend!');


        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUserFriend(req, res) {
        console.log('You are deleting a friend');

        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $pull: { friends: { friendId: req.params.friendId } } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};