/*import connection from "../../db/index.js";

export const adminDropDownCreate = async (req, res) => {
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
            if (user === 'Vendor') {
                const { Email, Password, VendorName, ContactInfo } = req.body;
                sql = `
                    INSERT INTO VENDOR (Email, Password, VendorName,ContactInfo) 
                    VALUES (?, ?, ?, ?);
                `;
                [result] = await transactionConnection.query(sql, [
                    Email, Password, VendorName,ContactInfo
                ]);
                if (result.affectedRows === 0) {
                    throw new Error('Vendor not added');
                }
                console.log('Vendor added successfully');
                res.status(200).json({
                    message: 'Vendor added successfully!',
                    vendorID: result.insertId,
                });

            } else if (user === 'Contract') {
                const { UniversityID, VendorID, StartDate, EndDate, ContractDetails, Status } = req.body;
                sql = `
                    INSERT INTO CONTRACT (UniversityID, VendorID, StartDate, EndDate, ContractDetails, Status) 
                    VALUES (?, ?, ?, ?, ?, ?);
                `;
                [result] = await transactionConnection.query(sql, [
                    UniversityID, VendorID, StartDate, EndDate, ContractDetails, Status,
                ]);
                if (result.affectedRows === 0) {
                    throw new Error('Contract not formed');
                }
                console.log('Contract added successfully');
                res.status(200).json({
                    message: 'Contract added successfully!',
                    contractID: result.insertId,
                });

            } else if (user === 'Route') {
                const { RouteName, StartPoint, EndPoint } = req.body;
                sql = `
                    INSERT INTO ROUTE (RouteName, StartPoint, EndPoint) 
                    VALUES (?, ?, ?);
                `;
                [result] = await transactionConnection.query(sql, [
                    RouteName, StartPoint, EndPoint,
                ]);
                if (result.affectedRows === 0) {
                    throw new Error('Route not added');
                }
                console.log('Route added successfully');
                res.status(200).json({
                    message: 'Route added successfully!',
                    routeID: result.insertId,
                });

            } else if (user === 'Stop') {
                const { RouteID, StopName, Latitude, Longitude, Address, EstimatedArrivalTime } = req.body;
                sql = `
                    INSERT INTO STOP (RouteID, StopName, Latitude, Longitude, Address, EstimatedArrivalTime) 
                    VALUES (?, ?, ?, ?, ?, ?);
                `;
                [result] = await transactionConnection.query(sql, [
                    RouteID, StopName, Latitude, Longitude, Address, EstimatedArrivalTime,
                ]);
                if (result.affectedRows === 0) {
                    throw new Error('Stop not added');
                }
                console.log('Stop added successfully');
                res.status(200).json({
                    message: 'Stop added successfully!',
                    stopID: result.insertId,
                });

            } else if (user === 'Notification') {
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
*/

import connection from "../../db/index.js";

export const 
adminDropDownCreate = async (req, res) => {
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

            if (user === 'Vendor') {
                const { Email, Password, VendorName, ContactInfo } = req.body;
                sql = `
                    INSERT INTO VENDOR (Email, Password, VendorName, ContactInfo) 
                    VALUES (?, ?, ?, ?);
                `;
                [result] = await transactionConnection.query(sql, [
                    Email, Password, VendorName, ContactInfo
                ]);
                if (result.affectedRows === 0) {
                    throw new Error('Vendor not added');
                }
                console.log('Vendor added successfully');
                res.status(200).json({
                    message: 'Vendor added successfully!',
                    vendorID: result.insertId,
                });

            } else if (user === 'Contract') {
                const { UniversityID, VendorID, StartDate, EndDate, ContractDetails, Status } = req.body;
                sql = `
                    INSERT INTO CONTRACT (UniversityID, VendorID, StartDate, EndDate, ContractDetails, Status) 
                    VALUES (?, ?, ?, ?, ?, ?);
                `;
                [result] = await transactionConnection.query(sql, [
                    UniversityID, VendorID, StartDate, EndDate, ContractDetails, Status,
                ]);
                if (result.affectedRows === 0) {
                    throw new Error('Contract not formed');
                }
                console.log('Contract added successfully');
                res.status(200).json({
                    message: 'Contract added successfully!',
                    contractID: result.insertId,
                });

            } else if (user === 'Route') {
                const { RouteName, StartPoint, EndPoint } = req.body;
                sql = `
                    INSERT INTO ROUTE (RouteName, StartPoint, EndPoint) 
                    VALUES (?, ?, ?);
                `;
                [result] = await transactionConnection.query(sql, [
                    RouteName, StartPoint, EndPoint,
                ]);
                if (result.affectedRows === 0) {
                    throw new Error('Route not added');
                }
                console.log('Route added successfully');
                res.status(200).json({
                    message: 'Route added successfully!',
                    routeID: result.insertId,
                });

            } else if (user === 'Stop') {
                // Handle single or multiple stops
                const stops = Array.isArray(req.body) ? req.body : [req.body];
                sql = `
                    INSERT INTO STOP (RouteID, StopName, Latitude, Longitude, Address, EstimatedArrivalTime) 
                    VALUES (?, ?, ?, ?, ?, ?);
                `;

                for (const stop of stops) {
                    const { RouteID, StopName, Latitude, Longitude, Address, EstimatedArrivalTime } = stop;
                    const [result] = await transactionConnection.query(sql, [
                        RouteID, StopName, Latitude, Longitude, Address, EstimatedArrivalTime,
                    ]);
                    if (result.affectedRows === 0) {
                        throw new Error(`Stop "${StopName}" not added`);
                    }
                    console.log(`Stop "${StopName}" added successfully with ID: ${result.insertId}`);
                }

                res.status(200).json({
                    message: 'Stops added successfully!',
                });

            } else if (user === 'Notification') {
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
