/* eslint-disable no-console */
import mongoose from 'mongoose';
import moment from 'moment';
import { url } from '../../config/mongodb';

const { MongoClient } = require('mongodb'),
  co = require('co'),
  test = require('assert');

co(async () => {
  try {
    const db = await MongoClient.connect(url);
    if (db) { console.log('ready to migrate data...'); }
    // Get the collection
    const col = db.collection('fixturemodels');
    const r = await col.insertMany([{
      _id: new mongoose.Types.ObjectId(),
      teamA: [{ name: 'Arsenal', score: 0 }],
      teamB: [{ name: 'Chelsea', score: 0 }],
      status: 'completed',
      matchInfo: [{ date: '2019-11-25T16:24:32.674+00:00' }, { stadium: 'Craven Cottage' }],
      createdAt: moment(Date.now()).format('LLLL'),
      updatedAt: moment(Date.now()).format('LLLL')
    },
    {
      _id: new mongoose.Types.ObjectId(),
      teamA: [{ name: 'Brighton and Hove Albion', score: 0 }],
      teamB: [{ name: 'Aston Villa', score: 0 }],
      status: 'pending',
      matchInfo: [{ date: '2019-11-09T16:24:32.674+00:00' }, { stadium: 'Vitality Stadium' }],
      createdAt: moment(Date.now()).format('LLLL'),
      updatedAt: moment(Date.now()).format('LLLL')
    },
    {
      _id: new mongoose.Types.ObjectId(),
      teamA: [{ name: 'Aston Villa', score: 0 }],
      teamB: [{ name: 'AFC Bournemouth', score: 0 }],
      status: 'completed',
      matchInfo: [{ date: '2019-11-01T16:24:32.674+00:00' }, { stadium: 'King Power Stadium' }],
      createdAt: moment(Date.now()).format('LLLL'),
      updatedAt: moment(Date.now()).format('LLLL')
    },
    {
      _id: new mongoose.Types.ObjectId(),
      teamA: [{ name: 'Arsenal', score: 0 }],
      teamB: [{ name: 'AFC Bournemouth', score: 0 }],
      status: 'pending',
      matchInfo: [{ date: '2019-11-04T16:24:32.674+00:00' }, { stadium: 'Vicarage Road' }],
      createdAt: moment(Date.now()).format('LLLL'),
      updatedAt: moment(Date.now()).format('LLLL')
    },
    {
      _id: new mongoose.Types.ObjectId(),
      teamA: [{ name: 'Aston Villa', score: 0 }],
      teamB: [{ name: 'Chelsea', score: 0 }],
      status: 'completed',
      matchInfo: [{ date: '2019-11-26T16:24:32.674+00:00' }, { stadium: 'Craven Cottage' }],
      createdAt: moment(Date.now()).format('LLLL'),
      updatedAt: moment(Date.now()).format('LLLL')
    }]);
    test.equal(5, r.insertedCount);
    // Finish up test
    db.close();
  } catch (e) {
    if (e.name === 'MongoError') {
      return console.log(e.message);
    }
    console.log(e);
  }
});
