import mongoose from 'mongoose';
import moment from 'moment';
import mongoosePaginate from 'mongoose-paginate';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: moment(Date.now()).format('LLLL') },
  updatedAt: { type: Date, default: moment(Date.now()).format('LLLL') },
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(mongoosePaginate);

export default mongoose.model('UserModel', userSchema);
