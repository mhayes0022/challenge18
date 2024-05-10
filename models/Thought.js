const { Schema, Types} = require('mongoose');

//between 1-280 characters
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: STRING,
            required: true,
            max: 280,
            min: 1,
        },
        createdAt: {
            //Date
            //set default value to the current timestamp on query
            //use a getter method to format the timestamp query
        },
        username: {
            type: STRING,
            required: true,
        },
        reactions: [
            //Note: these are like replies
            //Array of nested documents created with the reactionsSchema
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
        return ``//retrieves the length of the thought's reactions array field on query
    })

const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;