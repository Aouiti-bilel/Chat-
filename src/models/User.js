import mongoose from 'mongoose'
import { hash } from 'bcryptjs'
import { UserInputError } from 'apollo-server-express'
const userSchema = new mongoose.Schema({
    email: {
      type: String,
      validate: {
        validator: async email => await User.doesntExist({ email }),
        message:({ value }) => `Email ${value } has already been taken`
      } 
    } ,
    username: {
      type: String,
      validate: {
        validator: async username => await User.doesntExist({ username }),
        message:({ value }) => `username ${value } has already been taken`
      } 
    } ,
    name: String,
    password: String
}, { timestamps: true })

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
      this.password = await hash(this.password, 10)
    }
})

userSchema.statics.doesntExist = async function(options) {
  return await this.where(options).countDocuments() === 0
}
console.log(userSchema.statics)
const User = mongoose.model('User', userSchema) 

export default User