import Joi from 'joi'
import { startChat } from '../validator'
import { User, Chat } from '../models'
import { UserInputError } from 'apollo-server-express'
export default {
    Mutation: {
        startChat: async(root, args, { req }, info) =>{
          const { title, usersID } = args   
          const userId = req.user.id;
        await Joi.validate(args, startChat(userId) , {abortEarly: false})

        const idsFound = await  User.where('_id').in(usersID).countDocuments()
        if(idsFound !== usersID.length) {
          throw new UserInputError (' One Or more user id are Invalid')
        }

        usersID.push(userId)
        const chat = await Chat.create({ title, users: usersID })
         await  User.updateMany({ _id : { '$in': usersID } }, {
         $push: { chats: chat}
       })
        return chat 
    }
    
  }
}