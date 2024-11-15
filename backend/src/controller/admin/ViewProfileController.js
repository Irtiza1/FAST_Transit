import connection from "../../db/index.js";

export const viewProfile = async (req, res) => {
    try {
        const sql = 'SELECT * FROM UNIVERSITY;';
        const [result] = await connection.query(sql);

        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'No data found in the database.' });
        }
        // console.log(result)
        return res.status(200).json({
            message: 'Statistics retrieved successfully',
            data: result[0]
        });
    } catch (error) {
        console.error("Error retrieving profile data:", error);
        return res.status(500).json({ message: 'An error occurred while retrieving profile data.', error: error.message });
    }
};
