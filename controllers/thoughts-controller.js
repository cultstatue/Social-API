const { User, Thoughts } = require('../models')

const thoughtsController = {

    // GET all thoughts
    getThoughts(req, res) {
        Thoughts.find({})
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // GET single thought by id
    getThoughtById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
        
        .then(dbThoughtsData => {

            if(!dbThoughtsData){
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            };

            res.json(dbThoughtsData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // POST a new thought (and push thought into users thought array)
    createThought({ params, body}, res) {
        Thoughts.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    {$push: { thoughts: _id}},
                    { new: true }
                )
            })

        .then(dbThoughtsData => {

            if(!dbThoughtsData){
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            };

            res.json(dbThoughtsData);
        })
        .catch(err => res.json(err));
    },

    // PUT update a thought with :id
    updateThought({ params, body }, res) {
        Thoughts.findByIdAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtsData => {

            if(!dbThoughtsData){
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            };

            res.json(dbThoughtsData);
        })
        .catch(err => res.json(err));
    },

    // DELETE delete a thought
    deleteThought({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
        .then(dbThoughtsData => {

            if(!dbThoughtsData){
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            };

            res.json(dbThoughtsData);
        })
        .catch(err => res.json(err));
    }

    // POST a new reaction

    // DELETE a reaction
}

module.exports = thoughtsController;