import jwt from "jsonwebtoken"

export const authorizeRole= (...allowedRoles) =>{
    return (req,res, next)=>{
        const token= req.headers.authorization?.split(' ')[1]

        if(!token){
            res.status(403).json({message: 'Access denied. No token provided'})
        }

        jwt.verify(token,process.env.JWT_SECRET,(err,decoded) =>{
            if(err){
                return res.status(403).json({message: 'Invalid token'})
            }

            if(!allowedRoles.includes(decoded.role)){
                return res.status(403).json({message: 'Access denied. Insufficient permissions'})
            }

            req.user= decoded;
            next()
        })
    }

}

// export default authorizeRole :not using as i am importing wiht curly brackts