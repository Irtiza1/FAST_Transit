// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from '../db/index.js';

export const LoginUser=async(req,res) => {
    const { Role, Email , Password }= req.body
    try{
        const sql = 'SELECT * FROM USERS WHERE Email = ? AND Password = ?';
        const  [user] = await connection.query(sql, [Email,Password])
        if(!user.length){
            return res.status(404).json({message: 'User not found!'})
        }
        else{
            const userData = user[0]; // Get the first user object
            console.log(userData.Role); // Log the user's role
        
            const token = jwt.sign({ UserId: userData.UserID, Role: userData.Role }, process.env.JWT_SECRET, { expiresIn: '10m' });
        
            res.status(200).json({ message: 'Login Successful!', token });
        }
    }
    catch(error){
        console.error('Login Failed!',error)
        es.status(500).json({message: 'Internal Server Error!', token})
    }
}