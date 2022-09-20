const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema(
    
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: User
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    },
    {
        toJSON: {
          getters: true
        }
    }
);

const ThoughtsSchema = new Schema(
    
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280   
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: User
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false
    }
);

ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;