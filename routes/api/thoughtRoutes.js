const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
//   deleteThought
} = require('../../controllers/thoughtController');

// /api/thoughs
router.route('/').get(getThoughts).post(createThought);

// /api/thoughs/:thoughId
router.route('/:thoughtId').get(getSingleThought).put(updateThought);//.delete(deleteThought);

module.exports = router;
