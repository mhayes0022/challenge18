const { Schema, Types } = require('mongoose');
//This is a SCHEMA ONLY, it's a subdocument for the Thought model
//this will not be a model, but will be used as the reaction field's subdocument schema in the Thought model

const reactionSchema = new Schema(
    {
        reactionId: {
            //use Mongoose's ObjectId data type
            type: Schema.Types.ObjectId,
            //Default value is set to a new ObjectId
            default: ()=> new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            max: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now 
            //Use a getter method to format the timestamp on query
        },
    },
);


module.exports = reactionSchema
