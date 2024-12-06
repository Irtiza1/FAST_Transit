
import connection from "../../../db/index.js";

export const studentDropDownCreate = async (req, res) => {
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
            else if (user === 'Booking') {
                const { userID, BusID, RowNumber, SeatNumber, Role } = req.body;
            
           
                    // 1. Retrieve User Information (VendorID, Gender, BusID)
                    let sql = `
                        SELECT VendorID, Gender, BusID FROM User WHERE UserID = ?;
                    `;
                    let [userResult] = await transactionConnection.query(sql, [userID]);
                    if (userResult.length === 0) {
                        throw new Error('Invalid User');
                    }
            
                    const { VendorID, Gender, BusID: UserBusID } = userResult[0];
            
                    // Validate if the User's Bus ID matches the provided Bus ID and Vendor ID
                    if (UserBusID !== BusID) {
                        throw new Error('User is not assigned to this bus');
                    }
            
                    // 2. Retrieve Row Information and Validate RowCategory matches User's Gender
                    sql = `
                        SELECT RowID, RowCategory FROM Row WHERE BusID = ? AND RowNumber = ?;
                    `;
                    let [rowResult] = await transactionConnection.query(sql, [BusID, RowNumber]);
                    if (rowResult.length === 0) {
                        throw new Error('Invalid Row Number');
                    }
            
                    const { RowID, RowCategory } = rowResult[0];
            
                    if (
                        (RowCategory === 'Male' && Gender !== 'Male') ||
                        (RowCategory === 'Female' && Gender !== 'Female')
                    ) {
                        throw new Error('Gender does not match the row category');
                    }
            
                    // 3. Check if the Seat is Available
                    sql = `
                        SELECT SeatID, OccupancyStatus, BookingStatus FROM Seat 
                        WHERE RowID = ? AND SeatNumber = ?;
                    `;
                    let [seatResult] = await transactionConnection.query(sql, [RowID, SeatNumber]);
                    if (seatResult.length === 0) {
                        throw new Error('Invalid Seat Number');
                    }
            
                    const { SeatID, OccupancyStatus, BookingStatus } = seatResult[0];
                    if (OccupancyStatus === 'Occupied' || BookingStatus !== 'Available') {
                        throw new Error('Seat is already booked or unavailable');
                    }
            
                    // 4. Book the Seat: Insert into Student or Faculty Table based on Role
                    if (Role === 'Student') {
                        sql = `
                            INSERT INTO Student (UserID, SeatID) VALUES (?, ?);
                        `;
                    } else if (Role === 'Faculty') {
                        sql = `
                            INSERT INTO Faculty (UserID, SeatID) VALUES (?, ?);
                        `;
                    } else {
                        throw new Error('Invalid Role');
                    }
                    await transactionConnection.query(sql, [userID, SeatID]);
            
                    // 5. Update Seat OccupancyStatus and BookingStatus
                    sql = `
                        UPDATE Seat 
                        SET OccupancyStatus = 'Occupied', BookingStatus = 'Booked' 
                        WHERE SeatID = ?;
                    `;
                    await transactionConnection.query(sql, [SeatID]);
        
                    sql = `
                        UPDATE Bus 
                        SET TotalOccupiedSeats = TotalOccupiedSeats + 1 
                        WHERE BusID = ?;
                    `;
                    await transactionConnection.query(sql, [BusID]);
        
                    await transactionConnection.commit();
        
                    console.log('Seat booked successfully');
                    res.status(200).json({
                        message: 'Seat booked successfully!',
                    });
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



// studentDropDownCreate