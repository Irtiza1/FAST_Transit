import connection from "../db/index.js";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
export const SignUpUser = async (req, res) => {
    try {
        const { FirstName, LastName, Email, Password, PhoneNumber, Gender, CNIC, Role, Location } = req.body;

        const sql = 'INSERT INTO USERS (FirstName, LastName, Email, Password, PhoneNumber, Gender, CNIC, Role, Location) VALUES (?,?,?,?,?,?,?,?,?)';

        const [results] = await connection.query(sql, [FirstName, LastName, Email, Password, PhoneNumber, Gender, CNIC, Role, Location]);

        const userId=results.insertId;

        const token= jwt.sign({userId},process.env.JWT_SECRET,{expiresIn: '1h'})

        const activationLink=`http://localhost:8000/user/activate/${token}`

        const transporter=nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        const mailOptions= {
            from: process.env.EMAIL_USER,
            to: Email,
            subject: 'Email Activation',
            text: `Hello ${FirstName},\n\nuserID:${userId},\n\nPlease activate your account by clicking the link: \n${activationLink}\n,\n\n NOTE: Activation link will be live for 1 hour`
        }

        transporter.sendMail(mailOptions, (error,info)=>{
            if(error){
                console.error('Error sending Email: ', error)
                return res.status(500).json({message: 'Failed to send the activiation email.'})
            }
            return res.status(200).json({message:'Registration successful! Please check your email to activate your account.'})
        })
        // res.status(200).json({
        //     message: 'Registration Successful!',
        //     userId: results.insertId, 
        //     affectedRows: results.affectedRows 
        // });
    } catch (error) {
        console.error('Registration Failed!', error);
        res.status(500).json({
            message: 'Registration Failed!',
            error: error.message
        });
    }
};
