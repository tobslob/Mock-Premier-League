import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  isAdmin: { type: Boolean, default: false }
});

userSchema.plugin(uniqueValidator);

export default mongoose.model('UserModel', userSchema);
