const { Thought } = require('../models');

module.exports = {
    
    getThoughts(req, res) {
        Thought.find()
        .then(async (thoughts) => {
            const thoughtObj = {
                thoughts,
            };
            return res.json(thoughtObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then(async (thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json({
                thought,
            })
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        const filter = {"_id":req.params.thoughtId};
        const update = req.body;
        Thought.updateOne(filter, update)
        .then((queryResult) => {
            if (queryResult.modifiedCount === 1)
                res.send('thought updated!');
            else throw {message: 'Unable to update thought'}
        })
        .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) =>{
            console.log(thought);
            !thought
                ? res.status(404).json({ message: 'No such thought exists' })
                : res.status(200).send('thought deleted!');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    addReaction(req, res){
        const filter = {"_id": req.params.thoughtId};
        const update = { $push: { reactions: req.body } };
        Thought.findOneAndUpdate(filter, update)
        .then((queryResult) => {
            if (queryResult)
                res.send('reaction added!');
            else throw {message: 'unable to add reaction'}
        })
        .catch((err) => res.status(500).json(err));
    },

}