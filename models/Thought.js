const { Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction');

//between 1-280 characters
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max: 280,
            min: 1,
        },
        createdAt: {
            //use a getter method to format the timestamp query
            type: Date, 
            default: Date.now ,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            //Array of nested documents created with the reactionsSchema
            reactionSchema
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    },
);

thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        return this.reactions.length
    })

const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;