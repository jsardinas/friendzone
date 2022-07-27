const { User, Thought } = require('../models');

module.exports = {
    
    getUsers(req, res) {
        User.find()
        .then(async (users) => {
            const userObj = {
                users,
            };
            return res.json(userObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then(async (user) =>
            !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json({
                user,
            })
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        const filter = {"_id":req.params.userId};
        const update = req.body;
        User.updateOne(filter, update)
        .then((queryResult) => {
            if (queryResult.modifiedCount === 1)
                res.send('user updated!');
            else throw {message: 'Unable to update user'}
        })
        .catch((err) => res.status(500).json(err));
    },

    async deleteUser(req, res) {
        try{
            const user = await User.findOneAndRemove({ _id: req.params.userId });
            if(!user){
                res.status(404).json({ message: 'No such user exists' });
            }
            else{
                await Thought.deleteMany({'username': user.username});
                res.json({ message: 'User removed' });
            }
        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    addFriend(req, res){
        const filter = {"_id": req.params.userId};
        const update = { $addToSet: { friends: req.params.friendId } };
        User.findOneAndUpdate(filter, update)
        .then((queryResult) => {
            if (queryResult)
                res.send('friend added!');
            else throw {message: 'unable to add friend'}
        })
        .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res){
        const filter = {"_id": req.params.userId};
        const update = { $pull: { friends: req.params.friendId } };
        User.findOneAndUpdate(filter, update)
        .then((queryResult) => {
            console.log(queryResult)
            if (queryResult)
                res.send('friend removed!');
            else throw {message: 'unable to remove friend'}
        })
        .catch((err) => res.status(500).json(err));
    },

}