import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
},
{timestamps: true}
)

UserSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);

  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

export const UserModel = model('user', UserSchema);