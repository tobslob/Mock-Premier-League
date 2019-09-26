/* eslint-disable no-console */
import mongoose from 'mongoose';
import moment from 'moment';
import Helper from '../../helper.js/helperFunction';
import { url } from '../../config/mongodb';

const { MongoClient } = require('mongodb'),
  co = require('co'),
  test = require('assert');

co(async () => {
  try {
    const db = await MongoClient.connect(url);
    if (db) { console.log('ready to migrate data...'); }
    // Get the collection
    const col = db.collection('usermodels');
    const r = await col.insertMany([{
      _id: new mongoose.Types.ObjectId(),
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'admin@gmail.com',
      password: Helper.hashPassword('Kazeem27$'),
      isAdmin: true,
      createdAt: moment(Date.now()).format('LLLL'),
      updatedAt: moment(Date.now()).format('LLLL')
    },
    {
      _id: new mongoose.Types.ObjectId(),
      firstName: 'James',
      lastName: 'Williams',
      email: 'jammy@gmail.com',
      password: Helper.hashPassword('jammy11167'),
      isAdmin: false,
      createdAt: moment(Date.now()).format('LLLL'),
      updatedAt: moment(Date.now()).format('LLLL')
    },
    {
      _id: new mongoose.Types.ObjectId(),
      firstName: 'Samuel',
      lastName: 'Ladapo',
      email: 'samuelman@gmail.com',
      password: Helper.hashPassword('samman12358'),
      isAdmin: false,
      createdAt: moment(Date.now()).format('LLLL'),
      updatedAt: moment(Date.now()).format('LLLL')
    }, {
      _id: new mongoose.Types.ObjectId(),
      firstName: 'Manager',
      lastName: 'Jude',
      email: 'mj@gmail.com',
      password: Helper.hashPassword('Kazeem27$'),
      isAdmin: false,
      createdAt: moment(Date.now()).format('LLLL'),
      updatedAt: moment(Date.now()).format('LLLL')
    }, {
      _id: new mongoose.Types.ObjectId(),
      firstName: 'Requester',
      lastName: 'Jude',
      email: 'rj@yahoo.com',
      password: Helper.hashPassword('Kazeem27$'),
      isAdmin: false,
      createdAt: moment(Date.now()).format('LLLL'),
      updatedAt: moment(Date.now()).format('LLLL')
    },
    {
      _id: new mongoose.Types.ObjectId(),
      firstName: 'request',
      lastName: 'man',
      email: 'requestman@gmail.com',
      password: Helper.hashPassword('requestman'),
      isAdmin: false,
      createdAt: moment(Date.now()).format('LLLL'),
      updatedAt: moment(Date.now()).format('LLLL')
    },
    {
      _id: new mongoose.Types.ObjectId(),
      firstName: 'Mrs',
      lastName: 'Somebody',
      email: 'freewoman@gmail.com',
      password: Helper.hashPassword('polly123456'),
      isAdmin: false,
      createdAt: moment(Date.now()).format('LLLL'),
      updatedAt: moment(Date.now()).format('LLLL')
    },
    {
      _id: new mongoose.Types.ObjectId(),
      firstName: 'Kazeem',
      lastName: 'Odutola',
      email: 'kazmobileapp@gmail.com',
      password: Helper.hashPassword('Kazeem27'),
      isAdmin: false,
      createdAt: moment(Date.now()).format('LLLL'),
      updatedAt: moment(Date.now()).format('LLLL')
    },
    {
      _id: new mongoose.Types.ObjectId(),
      firstName: 'Kazeem',
      lastName: 'Odutola',
      email: 'odutolak@gmail.com',
      password: Helper.hashPassword('Kazeem27'),
      isAdmin: false,
      createdAt: moment(Date.now()).format('LLLL'),
      updatedAt: moment(Date.now()).format('LLLL')
    },
    {
      _id: new mongoose.Types.ObjectId(),
      firstName: 'Supplier',
      lastName: 'James',
      email: 'unisAdminsupplier@gmail.com',
      password: Helper.hashPassword('Kazeem27$'),
      isAdmin: false,
      createdAt: moment(Date.now()).format('LLLL'),
      updatedAt: moment(Date.now()).format('LLLL')
    },
    {
      _id: new mongoose.Types.ObjectId(),
      firstName: 'bruce',
      lastName: 'wayne',
      email: 'brucewayne@gmail.com',
      password: Helper.hashPassword('brucewayne'),
      isAdmin: false,
      createdAt: moment(Date.now()).format('LLLL'),
      updatedAt: moment(Date.now()).format('LLLL')
    }]);
    test.equal(11, r.insertedCount);
    // Finish up test
    db.close();
  } catch (e) {
    if (e.name === 'MongoError') {
      return console.log(e.message);
    }
    console.log(e);
  }
});
