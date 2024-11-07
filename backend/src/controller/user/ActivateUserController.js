import jwt from 'jsonwebtoken';
import connection from "../../db/index.js";

export const ActivateUser= async (req,res)=>{
    const {token} = req.params
    
    if(!token){
        return res.status(500).json({message: 'Token is required.'})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const userId=decoded.userId

        const sql= 'UPDATE USERS SET isActive= ? WHERE UserID= ?'
        await connection.query(sql,[true,userId])

        res.status(200).json({message: 'Your account has been activated successfully!'})
        // res.redirect('/login')
    }
    catch(error){
        console.error('Activation Failed!', error);
        res.status(400).json({ message: 'Invalid token.' });
    }
}
