const { Schema, model } = require('mongoose');

const ThoughtsSchema = new Schema({

    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280   
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;