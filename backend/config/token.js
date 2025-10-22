import jwt from 'jsonwebtoken'

const genToken = async(userId)=>{
    try {
         const token = await jwt.sign({userId},process.env.jwt_secret, {expiresIn : '7d'})
         return token
    } catch (error) {
        console.log(error);
        
    }
}   

export default genToken