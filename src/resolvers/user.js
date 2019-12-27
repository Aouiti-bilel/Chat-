import User from "../models/User"
import { Mongoose } from "mongoose"
import Joi from 'joi'
import  { UserInputError } from 'apollo-server-express'
import { signup } from '../validator'
export default {
    Query: {
        users: (root, { id }, ctx, info) => {
          // Test If User is authenticated,
          // projection . populate
          //pagination
          return User.find({})
        },
        user: (root, args, ctx, info) => {
         if(!Mongoose.Types.ObjectId.isValid(args.id)){
            throw new UserInputError('Invalid Id') 
          }
         return User.findById(id)
        }
    },
    Mutation: {
        signUp: async (root, args, ctx, info) => {
            // check if user not authenticated
            await Joi.validate(args, signup, { abortEarly: false })
             //validation In the argument
             
    
             return User.create(args)
        }
    }
}