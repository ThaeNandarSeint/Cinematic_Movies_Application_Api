const mongoose = require('mongoose');
const { MONGODB_URL, DATABASE_NAME } = require('../constants/env.constant');

const connectDatabase = async () => {
  try {
    mongoose.set('strictQuery', false);

    await mongoose.connect(MONGODB_URL, {
      dbName: DATABASE_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB.');
  } catch (error) {
    console.log('Error while connecting to MongoDB');
    console.error(error);
  }
};

module.exports = { connectDatabase };
