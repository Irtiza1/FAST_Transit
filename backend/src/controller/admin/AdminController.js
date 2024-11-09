// controllers/universityController.js
import connection from '../../db/index.js';

export const getAllUniversity = async (req, res) => {
  try {
    const sql = 'SELECT * FROM UNIVERSITY';
    const [results] = await connection.query(sql);  // Using the promise version of query
    res.status(200).json({ message: 'Universities retrieved successfully', data: results });
  } catch (error) {
    console.error('Error fetching universities:', error);
    res.status(500).json({ message: 'Error fetching universities', error });
  }
};
