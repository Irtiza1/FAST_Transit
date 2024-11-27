import connection from "../../../db/index.js";

export const driverDropDownCreate = async (req, res) => {
    const { operations, user } = req.params;
    console.log('Operation:', operations);
    console.log('User:', user);

    let transactionConnection;

    try {
        transactionConnection = await connection.getConnection();
        await transactionConnection.beginTransaction();
        console.log("Transaction begins");

        if (operations === 'Add') {
            let sql = '';
            let result;
            if (user === 'Notification') {
                const {UserID, NotificationText, Type } = req.body;
                sql = `
                    INSERT INTO NOTIFICATION (UserID, NotificationText, Type) 
                    VALUES (?, ?, ?);
                `;
                [result] = await transactionConnection.query(sql, [
                    UserID, NotificationText, Type,
                ]);
                if (result.affectedRows === 0) {
                    throw new Error('Notification not added');
                }
                console.log('Notification added successfully');
                res.status(200).json({
                    message: 'Notification added successfully!',
                    notificationID: result.insertId,
                });
            }
            else if (user === 'Attendance'){
                
                const {UserID,BusID,Status,Shift } = req.body;
                sql = `
                    INSERT INTO ATTENDANCE (UserID, BusID, Status, Shift) 
                    VALUES (?, ?, ?, ?);
                `;
                [result] = await transactionConnection.query(sql, [
                    UserID,BusID,Status,Shift,
                ]);
                if (result.affectedRows === 0) {
                    throw new Error('Attendance not added');
                }
                console.log('Attendance added successfully');
                res.status(200).json({
                    message: 'Attendance added successfully!',
                    AttendanceID: result.insertId,
                });
            }
        }

        console.log("About to commit the transaction...");
        await transactionConnection.commit();
        console.log("Transaction committed successfully!");

    } catch (error) {
        if (transactionConnection) {
            console.log("Transaction rollback initiated due to error:", error.message);
            await transactionConnection.rollback();
        }
        res.status(500).json({ error: 'Internal server error', details: error.message });
    } finally {
        if (transactionConnection) {
            console.log("Releasing connection...");
            transactionConnection.release();
        }
    }
};


