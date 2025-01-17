// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from '../../db/index.js';

export const LoginUser=async(req,res) => {
    const { Role, Email , Password }= req.body
    try{
        const sql = 'SELECT * FROM USERS WHERE Email = ? AND Password = ? AND Role = ?';
        const  [user] = await connection.query(sql, [Email,Password,Role])
        if(!user.length){
            return res.status(404).json({message: 'User not found!'})
        }
        else{
            const userData = user[0]; 
            console.log(userData.Role);
        
            const token = jwt.sign({ UserId: userData.UserID, Role: userData.Role }, process.env.JWT_SECRET, { expiresIn: '10m' });
        
            res.status(200).json({ message: 'Login Successful!',userData, token });
        }
    }
    catch(error){
        console.error('Login Failed!',error)
        es.status(500).json({message: 'Internal Server Error!', token})
    }
}