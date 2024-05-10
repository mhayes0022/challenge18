const { Schema, Types} = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: STRING,
            required: true,
            allowNull: false,
            unique: true,
        },
        email: {
            type: STRING,
            required: true,
            allowNull: false,
            unique: true,
            isEmail: true,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//Below is just placeholders, etc. NOT finished
userSchema
    .virtual('friendCount')
    .get(function() {
        return `${friends}`
    });

const User = model('user', userSchema);

module.exports = User;