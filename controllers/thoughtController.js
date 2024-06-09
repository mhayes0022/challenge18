//GET to get all thoughts
//GET to get a single thought by it's _id
//POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
//PUT to update a thought by it's _id
//DELETE to remove a thought by it's _id

// /api/thoughts/:thoughtId/reactions
//POST to create a reaction stored in a single thought's reactions array field 
//DELETE to pull and remove a reaction by the reaction's reactionId value
const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID found' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Thought created, but found no user with that ID',
                })
            }
            res.json({ thought, user });
        } catch (err) {
            console.log('Error in addThought', err)
            res.status(500).json(err);
        } 
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id found' });
            }

            res.json(thought);
        } catch (err) {
            console.lof(err)
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID found' });
            }

            // await User.deleteMany({ _id: { $in: thought.reaction }});
            // res.json({ message: 'Thought and reactions deleted!'});

            const user = await User.findOneAndRemove(
                { _id: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            if (!user) {
                return res.status.json({
                    message: 'Whoops! Something went wrong!',
                });
            }

            res.json({ message: 'Thought successfully deleted!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async postReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that id' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        console.log('You are deleting a reaction');

        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.json(404).json({ message: 'No thought found with that id' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};