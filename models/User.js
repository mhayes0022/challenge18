const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: ['/.+@.+\..+/', 'Does not match email format']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user', 
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
//Note: I'm not sure if the friends array above is correct

userSchema
    .virtual('friendCount')
    .get(function() {
        return this.friends.length;
    });

const User = model('user', userSchema);

module.exports = User;

// const obj= {
//     name: 'VInnie', 
//     age: 39,
//     location: 'LA'
// }

// const {name, age, location}= obj