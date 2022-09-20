const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema({

    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            },
            message: x => `${x.value} is not a valid email address.`
        }
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }
    ],
    friends: [
        {
            type: String,
            ref: 'User'
        }
    ]},
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema)

module.exports = User