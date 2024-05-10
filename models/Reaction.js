const { Schema } = require('mongoose');
//This one had a note on it that it's supposed to be a SCHEMA ONLY
//this will not be a model, but will be used as the reaction field's subdocument schema in the Thought model

const reactionSchema = new Schema(
    {
        reactionId: {
            //use Mongoose's ObjectId data type
            //Default value is set to a new ObjectId
        },
        reactionBody: {
            type: STRING,
            required: true,
            max: 280,
        },
        username: {
            type: STRING,
            required: true,
        },
        createdAt: {
            //Date
            //Set default value to the current timestamp
            //Use a getter method to format the timestamp on query
        },
    },
);

