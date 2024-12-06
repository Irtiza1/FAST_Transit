
import connection from "../../../db/index.js";

export const facultyDropDownCreate = async (req, res) => {
    const { operations, user } = req.params;
    console.log('Operation:', operations);
    console.log('User:', user);

    let transactionConnection;

    try {
        // Begin the transaction
        transactionConnection = await connection.getConnection();
        await transactionConnection.beginTransaction();
        console.log("Transaction begins");

        if (operations === 'Add') {
            let sql = '';
            let result;

            if (user === 'Notification') {
                const { adminID, NotificationText, Type } = req.body;
                sql = `
                    INSERT INTO NOTIFICATION (adminID, NotificationText, Type) 
                    VALUES (?, ?, ?);
                `;
                [result] = await transactionConnection.query(sql, [
                    adminID, NotificationText, Type,
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
            else if(user === 'Complaint'){
                const { userID, ComplaintText, BusID } = req.body;
                sql = `
                    INSERT INTO COMPLAINT (userID, ComplaintText, BusID) 
                    VALUES (?, ?, ?);
                `;
                [result] = await transactionConnection.query(sql, [
                    userID, ComplaintText, BusID,
                ]);
                if (result.affectedRows === 0) {
                    throw new Error('Complaint not added');
                }
                console.log('Complaint added successfully');
                res.status(200).json({
                    message: 'Complaint added successfully!',
                    notificationID: result.insertId,
                });
            }
            else if(user === 'Payment'){
                const { userID, Amount, VendorID} = req.body;
                sql = `
                    INSERT INTO PAYMENT (userID, Amount, VendorID) 
                    VALUES (?, ?, ?);
                `;
                [result] = await transactionConnection.query(sql, [
                    userID, Amount, VendorID,
                ]);
                if (result.affectedRows === 0) {
                    throw new Error('PAYMENT not added');
                }
                console.log('PAYMENT added successfully');
                res.status(200).json({
                    message: 'PAYMENT added successfully!',
                    notificationID: result.insertId,
                });
            } 
            else if (user ==='Booking'){
                
            }
        }

        // Commit the transaction
        console.log("About to commit the transaction...");
        await transactionConnection.commit();
        console.log("Transaction committed successfully!");

    } catch (error) {
        if (transactionConnection) {
            console.log("Transaction rollback initiated due to error:", error.message);
            await transactionConnection.rollback();
        }
        console.error("Error occurred:", error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    } finally {
        if (transactionConnection) {
            console.log("Releasing connection...");
            transactionConnection.release();
        }
    }
};


//facultyDropDownCreate