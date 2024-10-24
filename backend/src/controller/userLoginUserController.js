// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from '../db/index.js';

export const LoginUser=async(req,res) => {
    const { Role, Email , Password }= req.body
    try{
        const sql= 'SELECT * FROM USERS WHERE Email= ? AND Role= ? AND Password= ? ';
        const  [user] = await connection.query(sql, [Email,Role,Password])
        if(!user.length){
            return res.status(404).json({message: 'User not found!'})
        }
        else{
        // const isPasswordValid= (Password === user.Password)
        // if(!isPasswordValid){
        //     return res.status(500).json({message: 'Invalid Password'})
        // }

        const token=jwt.sign({UserId:user.UserID, Role: user.Role}, process.env.JWT_SECRET,{expiresIn: '1h'})

        res.status(200).json({message: 'Login Successful!', token})
        }
    }
    catch(error){
        console.error('Login Failed!',error)
        es.status(500).json({message: 'Internal Server Error!', token})
    }
}