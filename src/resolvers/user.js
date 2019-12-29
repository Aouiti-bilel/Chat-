import User from "../models/User"
import { Mongoose } from "mongoose"
import Joi from 'joi'
import  { UserInputError, AuthenticationError } from 'apollo-server-express'
import { signup } from '../validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import auth from "../config/auth"

export default {
    Query: {
        me: (root, args, { req }, info) => {
            console.log(req.user)
            return User.findById(req.user.id)
        },
        users: (root, { id }, { req }, info) => {
          // Test If User is authenticated,
          // projection . populate
          //pagination
          return User.find({})
        },
        user: (root, { id }, { req }, info) => {
         return User.findById(id)
        }
    },
    Mutation: {
        signUp: async (root, args, ctx, info) => {
            // check if user not authenticated
            await Joi.validate(args, signup, { abortEarly: false })
             //validation In the argument
             const user = await User.create(args)
             const payload = {
                user: {
                    id: user.id,
                }
             }
            const token = jwt.sign(payload, 'mustbesecret')
             
             return { user, token }
        },
        signIn: async (root, { email, password }, ctx, info) => {
            let user = await  User.findOne({ email });
            if(!user){
                return('Invalid Email')
            }
            const isMatch = bcrypt.compare(password, user.password)
            if(!isMatch){
                return 'Invalid Passsord'
            }
            const payload = {
                user: {
                    id: user.id
                }
            }
           const token= jwt.sign(payload, 'mustbesecret')
           return  { user, token }

        }
    },
    User: {
        chats: async (user, args, { req }, info) => {
          // TODO: should not be able to list other ppl's chats or read their msgs!
          return (await user.populate('chats').execPopulate()).chats
        }
      }
    }