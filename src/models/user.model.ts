import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import { IUser } from '../types/user'

export interface IUserModel extends IUser, Document {
  comparePassword: (password: string) => Promise<boolean>
}

const UserSchema: Schema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, required: true },
    internalUser: { type: Boolean, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password
      },
    },
  },
)

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
})

UserSchema.methods.comparePassword = function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model<IUserModel>('User', UserSchema)
export default User
