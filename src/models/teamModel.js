import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const teamSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  teamName: { type: String, unique: true },
  teamMembers: {
    name: {
      type: String, lowercase: true, required: true
    },
    role: {
      type: String,
      enum: ['goal keeper', 'central back', 'central midfield', 'central forward', 'left wing',
        'attacking midfield', 'central forward', 'left midfielder', 'striker', 'defending', 'right midfielder'],
      required: true
    },
    type: Array
  },
  description: String,
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
});

teamSchema.plugin(uniqueValidator);

export default mongoose.model('TeamModel', teamSchema);
