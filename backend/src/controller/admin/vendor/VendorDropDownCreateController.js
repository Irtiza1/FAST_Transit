
//job done

import connection from "../../../db/index.js";
const insertRowsAndSeats = async (transactionConnection, busID, leftRows, leftSeatsPerRow, rightRows, rightSeatsPerRow, freeRowSeats,MaleRows,FemaleRows) => {
    const rowSql = `
        INSERT INTO ROW (BusID, NumberOfSeats, RowCategory)
        VALUES (?, ?, ?);
    `;
    
    const seatSql = `
        INSERT INTO SEAT (RowID, SeatNumber, OccupancyStatus, BookingStatus)
        VALUES (?, ?, 'Available', 'Not Booked');
    `;
    // Ensure MaleRows and FemaleRows are arrays
    MaleRows = Array.isArray(MaleRows) ? MaleRows : [MaleRows];
    FemaleRows = Array.isArray(FemaleRows) ? FemaleRows : [FemaleRows];
   // Function to determine row category
   const getRowCategory = (rowIndex) => {
       if (MaleRows.includes(rowIndex)) {
           return "Male";
       } else if (FemaleRows.includes(rowIndex)) {
           return "Female";
       } else {
           return 'Free'; // Unspecified/Free row
       }
   };
        // Insert Left Rows and Seats
    for (let i = 1; i <= leftRows; i++) {
        const rowCategory = getRowCategory(i);
        const [leftRowResult] = await transactionConnection.query(rowSql, [busID, leftSeatsPerRow, rowCategory]);
        console.log(`Left row ${i} inserted with RowID: ${leftRowResult.insertId}`);
        const rowID = leftRowResult.insertId;

        for (let seatNumber = 1; seatNumber <= leftSeatsPerRow; seatNumber++) {
            await transactionConnection.query(seatSql, [rowID, seatNumber]);
            console.log(`Seat ${seatNumber} inserted in Left Row ${rowID}`);
        }
    }

    // Insert Right Rows and Seats
    for (let i = leftRows + 1; i <= leftRows + rightRows; i++) {
        const rowCategory = getRowCategory(i);
        const [rightRowResult] = await transactionConnection.query(rowSql, [busID, rightSeatsPerRow, rowCategory]);
        console.log(`Right row ${i - leftRows} inserted with RowID: ${rightRowResult.insertId}`);
        const rowID = rightRowResult.insertId;

        for (let seatNumber = 1; seatNumber <= rightSeatsPerRow; seatNumber++) {
            await transactionConnection.query(seatSql, [rowID, seatNumber]);
            console.log(`Seat ${seatNumber} inserted in Right Row ${rowID}`);
        }
    }

    // Insert the Final Free Row
    const totalSeatsInFreeRow = freeRowSeats;
    const [freeRowResult] = await transactionConnection.query(rowSql, [busID, totalSeatsInFreeRow, "FREE"]);
    console.log(`Free row inserted with RowID: ${freeRowResult.insertId}`);
    const freeRowID = freeRowResult.insertId;
    let seatNumber ;
    for (seatNumber = 1; seatNumber <= (leftSeatsPerRow + rightSeatsPerRow +1); seatNumber++) {
        await transactionConnection.query(seatSql, [freeRowID, seatNumber]);
        console.log(`Seat ${seatNumber} inserted in Free Row ${freeRowID}`);
    }
};
/*
const insertRowsAndSeats = async (transactionConnection, busID, leftRows, leftSeatsPerRow, rightRows, rightSeatsPerRow, MaleRows, FemaleRows) => {
    const rowSql = `
        INSERT INTO ROW (BusID, NumberOfSeats, RowCategory)
        VALUES (?, ?, ?);
    `;
    
    const seatSql = `
        INSERT INTO SEAT (RowID, SeatNumber, OccupancyStatus, BookingStatus)
        VALUES (?, ?, 'Available', 'Not Booked');
    `;
     // Ensure MaleRows and FemaleRows are arrays
     MaleRows = Array.isArray(MaleRows) ? MaleRows : [MaleRows];
     FemaleRows = Array.isArray(FemaleRows) ? FemaleRows : [FemaleRows];
    // Function to determine row category
    const getRowCategory = (rowIndex) => {
        if (MaleRows.includes(rowIndex)) {
            return "Male";
        } else if (FemaleRows.includes(rowIndex)) {
            return "Female";
        } else {
            return null; // Unspecified/Free row
        }
    };

    // Insert Left Rows and Seats
    for (let i = 1; i <= leftRows; i++) {
        const rowCategory = getRowCategory(i);
        const [leftRowResult] = await transactionConnection.query(rowSql, [busID, leftSeatsPerRow, rowCategory]);
        console.log(`Left row ${i} inserted with RowID: ${leftRowResult.insertId}`);
        const rowID = leftRowResult.insertId;

        for (let seatNumber = 1; seatNumber <= leftSeatsPerRow; seatNumber++) {
            await transactionConnection.query(seatSql, [rowID, seatNumber]);
            console.log(`Seat ${seatNumber} inserted in Left Row ${rowID}`);
        }
    }

    // Insert Right Rows and Seats
    for (let i = leftRows + 1; i <= leftRows + rightRows; i++) {
        const rowCategory = getRowCategory(i);
        const [rightRowResult] = await transactionConnection.query(rowSql, [busID, rightSeatsPerRow, rowCategory]);
        console.log(`Right row ${i - leftRows} inserted with RowID: ${rightRowResult.insertId}`);
        const rowID = rightRowResult.insertId;

        for (let seatNumber = 1; seatNumber <= rightSeatsPerRow; seatNumber++) {
            await transactionConnection.query(seatSql, [rowID, seatNumber]);
            console.log(`Seat ${seatNumber} inserted in Right Row ${rowID}`);
        }
    }
};*/

export const vendorDropDownCreate = async (req, res) => {
    const { operations, user } = req.params;
    console.log("Operation:", operations);
    console.log("User:", user);
    console.log("hello-1");

    let transactionConnection;
    
    try {
        // Begin the transaction
        transactionConnection = await connection.getConnection();
        await transactionConnection.beginTransaction();
        console.log("Transaction begins");
        // console.log("hello0");

        if (operations === "Add") {
            let sql = "";
            let result;
            // console.log("hello1");
            if (user === "Notification") {
                const { adminID, NotificationText, Type } = req.body;
                sql = `
                    INSERT INTO NOTIFICATION (adminID, NotificationText, Type) 
                    VALUES (?, ?, ?);
                `;
                [result] = await transactionConnection.query(sql, [adminID, NotificationText, Type]);
                if (result.affectedRows === 0) throw new Error("Notification not added");
                console.log("Notification added successfully");
                res.status(200).json({ message: "Notification added", notificationID: result.insertId });
            }
            else if (user === "Bus") {
                const { BusNumber, RouteID, DriverID, LeftRows, LeftSeatsPerRow, RightRows, RightSeatsPerRow, VendorID } = req.body;
                // const VendorID = req.vendorID || req.params.vendorID;
                let {MaleRows,FemaleRows}=req.body;
                console.log("hello2");
                // Calculate the total number of seats for the bus
                const totalFreeRowSeats = LeftSeatsPerRow + RightSeatsPerRow + 1;
                const totalSeats = (LeftRows * LeftSeatsPerRow) + (RightRows * RightSeatsPerRow) + totalFreeRowSeats;
                 // Ensure MaleRows and FemaleRows are arrays
                MaleRows = Array.isArray(MaleRows) ? MaleRows : [MaleRows];
                FemaleRows = Array.isArray(FemaleRows) ? FemaleRows : [FemaleRows];
                console.log("About to insert bus...");
                // Insert Bus into the database
                const busInsertQuery = `
                    INSERT INTO BUS (BusNumber, RouteID, VendorID, DriverID, TotalSeats) 
                    VALUES (?, ?, ?, ?, ?);
                `;
                const [busResult] = await transactionConnection.query(busInsertQuery, [BusNumber, RouteID, VendorID, DriverID, totalSeats]);
                const BusID = busResult.insertId;
                console.log("Bus added successfully with BusID:", BusID);
                // MaleRows = Array.isArray(MaleRows) ? MaleRows : [];
                // FemaleRows = Array.isArray(FemaleRows) ? FemaleRows : [];

                // Insert Rows and Seats
                console.log("Inserting rows and seats...");
                await insertRowsAndSeats(transactionConnection, BusID, LeftRows, LeftSeatsPerRow, RightRows, RightSeatsPerRow, totalFreeRowSeats,MaleRows,FemaleRows);
            
                console.log("Sending response for Bus creation...");
                res.status(201).json({
                    message: "Bus, rows, and seats created successfully.",
                    busID: BusID,
                    totalSeats: totalSeats
                });
            }
            else if (user === "Driver") {
                const { FirstName, LastName, Email, Password, PhoneNumber, CNIC, Location, LicenseNumber, BusID, Gender = "Male", Role = "Driver", isActive = 1, Status = "Registered" ,VendorID} = req.body;
                // const VendorID = req.vendorID || req.params.vendorID;

                sql = `
                    INSERT INTO USERS (FirstName, LastName, Email, Password, PhoneNumber, Gender, CNIC, Role, Location, BusID, VendorID, isActive, Status)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
                `;
                [result] = await transactionConnection.query(sql, [FirstName, LastName, Email, Password, PhoneNumber, Gender, CNIC, Role, Location, BusID, VendorID, isActive, Status]);
                if (result.affectedRows === 0) throw new Error("User not added");
                
                const userID = result.insertId;
                console.log("User added successfully, UserID:", userID);

                // Insert into BUS_DRIVER table
                sql = `INSERT INTO BUS_DRIVER (LicenseNumber, BusID, UserID) VALUES (?, ?, ?)`;
                [result] = await transactionConnection.query(sql, [LicenseNumber, BusID, userID]);
                if (result.affectedRows === 0) throw new Error("Bus driver not added");

                console.log("Bus driver added successfully");
                res.status(200).json({ message: "Bus driver and user added successfully!", userID: userID });
            }
            else if (user === "Traffic Alert") {
                const { RouteID, AlertDetails, Severity } = req.body;
                sql = `
                    INSERT INTO TRAFFIC_ALERT (RouteID, AlertDetails, Severity) 
                    VALUES (?, ?, ?);
                `;
                [result] = await transactionConnection.query(sql, [RouteID, AlertDetails, Severity]);
                if (result.affectedRows === 0) throw new Error("Traffic Alert not added");
                console.log("Traffic Alert added successfully");
                res.status(200).json({ message: "Traffic Alert added successfully!", alertID: result.insertId });
            }
            else if(user === 'Maintenance'){
                const { BusID, VendorID,MaintenanceDate, IssueDetails, Status } = req.body;
                sql = `
                    INSERT INTO MAINTENANCE (BusID, VendorID,MaintenanceDate,IssueDetails,Status) 
                    VALUES (?, ?, ?,?, ?);
                `;
                [result] = await transactionConnection.query(sql, [BusID, VendorID,MaintenanceDate, IssueDetails, Status]);
                if (result.affectedRows === 0) throw new Error("Maintenance Update not added");
                console.log("Maintenance Update added successfully");
                res.status(200).json({ message: "Maintenance Update added successfully!", maintenanceID: result.insertId });
            }
        }

        console.log("Committing transaction...");
        await transactionConnection.commit();
        console.log("Transaction committed successfully!");
    } catch (error) {
        if (transactionConnection) {
            console.log("Transaction rollback initiated due to error:", error.message);
            await transactionConnection.rollback();
        }
        console.error("Error occurred:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    } finally {
        if (transactionConnection) {
            console.log("Releasing connection...");
            transactionConnection.release();
        }
    }
};
