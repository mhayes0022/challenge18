//GET all users
//GET a single user by it's _id and populated thought and friend data
//POST a new user
//PUT to update a user by it's _id
//DELETE to remove user by it's _id

//BONUS: remove a user's associated thoughts when deleted

//POST to add a new friend to a user's friend list
//DELETE to remove a friend from a user's friend list

//const {} = require('mongoose');
const { User, Thought } = require('../models');


module.exports = {
    async addUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getUsers(req, res) {
        try {
            const users = await User.find();
            //NOT DONE
            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }
            //Unsure if below is correct
            res.json({
                user,
                thought: await thought(req.params.userId),
                friend: await friend(req.params.userId),
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                //Anything else I need here? 18.28 studentController no help
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

            const thought = await Thought.findOneAndUpdate(
                { thoughts: req.params.userId },
                { $pull: { thoughts: req.params.userId } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'User deleted, but no thoughts were found' });
            }

            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addUserFriend(req, res) {
        console.log('You are adding a friend!');
        console.lolg(req.body);

        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.body } },
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
                { _id: req.params.userId },
                { $pull: { friend: { friendId: req.params.friendId } } },
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