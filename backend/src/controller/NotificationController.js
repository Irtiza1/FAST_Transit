import jwt from 'jsonwebtoken';
import connection from '../db/index.js';

export const PostNotification = async (req, res) => {
    const { token } = req.params;

    if (!token) {
        return res.status(500).json({ message: 'Token is required.' });
    }

    const { NotificationText, Type } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded); 

        const userId = decoded.UserID || null;
        const adminId = decoded.adminId || null; 

        
        if (userId === null && adminId === null) {
            return res.status(400).json({ message: 'Failed to retrieve your ID' });
        }

        const sql = 'INSERT INTO NOTIFICATION (UserID, adminID, NotificationText, Type) VALUES (?, ?, ?, ?)';
        const [result] = await connection.query(sql, [userId, adminId, NotificationText, Type]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Notification posting failed!' });
        } else {
            res.status(200).json({
                message: 'Notification posting Successful!',
                notification: {
                    id: result.insertId,
                    adminId,
                    NotificationText,
                    Type
                }
            });
        }
    } catch (error) {
        console.error('Notification posting failed!', error);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
};
