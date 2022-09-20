const { User } = require('../models')

const userController = {

    // get all users
    getAllUsers(req, res) {
        User.find({})
        // .populate({
        //     path: 'comments',
        //     select: '-__v'
        // })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // get one user by id
    getUserById({ params }, res) {

        User.findOne({ _id: params.id })
        .then(dbUserData => {

            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            };

            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // create new user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true } )
        .then(dbUserData => {

            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            };

            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // delete user
    // try to figure out how to delete all associated thoughts as well?
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {

            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            };

            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // add friend
    addFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.id },
            { $addToSet: { friends: params.friendid}},
            { new: true, runValidators: true }
        )
        .then(dbUserData => {

            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            };

            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // delete friend
    deleteFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendid}},
            { new: true, runValidators: true }
        )
        .then(dbUserData => {

            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            };

            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

}

module.exports = userController;