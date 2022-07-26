const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

module.exports = {
    // Get all students
    getUsers(req, res) {
    //   User.find()
    //     .then(async (users) => {
    //       const userObj = {
    //         users,
    //       };
    //       return res.json(userObj);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       return res.status(500).json(err);
    //     });
        res.status(200).send('OK');
    },
}