import Joi from 'joi'

export default Joi.object().keys({
 email: Joi.string().email().required().label('Email') ,
 username: Joi.string().alphanum().min(4).max(30).required().label('Username') ,
 name: Joi.string().alphanum().max(300).required().label('name'),
 password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,30}$/).label('Password').options({
     language: { string: { regex: { base: ' Must have strong passsword' }}}
 })   
})