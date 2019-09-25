import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import moment from 'moment';

const teamSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  teamName: {
    type: String,
    unique: true,
    enum: ['AFC Bournemouth', 'Arsenal', 'Aston Villa', 'Brighton & Hove Albion', 'Burnley', 'Chelsea',
      'Crystal Palace', 'Everton', 'Leicester City', 'Liverpool', 'Manchester City', 'Manchester United',
      'Newcastle United', ' Norwich City', 'Sheffield United', 'Southampton', 'Tottenham Hotspur', 'Watford',
      'West Ham United', 'Wolverhampton Wanderers']
  },
  teamMembers: {
    name: {
      type: String, lowercase: true, required: true
    },
    role: {
      type: String,
      enum: ['Goal Keeper', 'Central Back', 'Central Midfield', 'Central Forward', 'Left Wing', 'Attacking Midfield', 'Central Forward', 'Left Midfielder', 'Striker', 'Defending', 'Right Midfielder'],
      required: true
    },
    type: Array
  },
  description: String,
  createdAt: { type: Date, default: moment(Date.now()).format('LLLL') },
  updatedAt: { type: Date, default: moment(Date.now()).format('LLLL') },
});

teamSchema.plugin(uniqueValidator);

export default mongoose.model('TeamModel', teamSchema);
