const connection = require('../config/connection');
const { User, Thought } = require('../models');
const userData = require('./userData.json');
const thoughtData = require('./thoughtData.json');

connection.on('error', (err) => err);

connection.once('open', async () => {
    
    console.log('connected');

    await User.deleteMany({});

    await Thought.deleteMany({});

    const u = await User.collection.insertMany(userData);

    for (t of thoughtData){
        let idx = Math.floor(Math.random()*userData.length);
        console.log(idx);
        t['username'] = userData[idx].username;
        t['reactions'] = [];
    }

    const th = await Thought.collection.insertMany(thoughtData);

    console.info('Seeding complete! 🌱');
    process.exit(0);
});