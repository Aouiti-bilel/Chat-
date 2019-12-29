import jwt from 'jsonwebtoken'
import  { UserInputError, AuthenticationError } from 'apollo-server-express'
export default function(req){
    
    // Get Token From Header
    const token = req.headers.authorization;
    // Check If Not Token 
    if(!token){
        throw new Error('NO Token, Authorization Denied !')
    }
    try {
        const decoded = jwt.verify(token, 'mustbesecret');
        req.user = decoded.user
       return  decoded.user
       
    } catch (error) {
        throw new AuthenticationError('Login Failed')
    }
};