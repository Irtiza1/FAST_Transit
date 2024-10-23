import connection from "../db/index.js";

export const LoginUser=async(req,res) => {
    const { Role, Email , Password }= req.body

    const sql= 'SELECT  ';
}