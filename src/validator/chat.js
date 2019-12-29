import Joi from 'joi'
export const startChat = userId =>
 Joi.object({
    title: Joi.string().min(4).max(50).label('Title'),
    usersID: Joi.array().min(1).max(100).unique().items(
        Joi.string().not(userId).label('UserId')
    ).label('UsersID')
})