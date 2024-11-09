// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from '../../db/index.js';

export const LoginAdmin=async(req,res) => {
    const { Email , Password }= req.body
    try{
        const sql = 'SELECT * FROM UNIVERSITY WHERE Email = ? AND Password = ?';
        const  [admin] = await connection.query(sql, [Email,Password])
        if(!admin.length){
            return res.status(404).json({message: 'Admin not found!'})
        }
        else{
            const adminData = admin[0]; 
            // console.log(adminData.Role);
        
            const token = jwt.sign({ adminId: adminData.UniversityID }, process.env.JWT_SECRET, { expiresIn: '10m' });
        
            res.status(200).json({ message: 'Login Successful!',adminData,token });
        }
    }
    catch(error){
        console.error('Login Failed!',error)
        es.status(500).json({message: 'Internal Server Error!', token})
    }
}