const connection = require('../config/connection');
const { User, Thought } = require('../models');
const userData = require('./userData.json');

connection.on('error', (err) => err);

connection.once('open', async () => {
    
    console.log('connected');

    await User.deleteMany({});

    await Thought.deleteMany({});

    await User.collection.insertMany(userData);

    console.info('Seeding complete! 🌱');
    process.exit(0);
});