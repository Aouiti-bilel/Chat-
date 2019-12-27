import User from "../models/User"
import { Mongoose } from "mongoose"
import  { UserInputError } from 'apollo-server-express'

export default {
    Query: {
        users: (root, {  id }, ctx, info) => {
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
        signUp: (root, args, ctx, info) => {
            // check if user not authenticated

             //validation In the argument
             
    
             return User.create(args)
        }
    }
}