/* eslint-disable no-console */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import messages from '../utils/messages';
import mongooseConnect from '../config/mongodb';

dotenv.config();

const connect = async () => {
  try {
    const db = await mongoose.connect(mongooseConnect, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log(messages.connectedToDatase);
    return db;
  } catch (error) {
    console.log(error);
    return console.log(messages.failedToConnect);
  }
};

export default connect;
