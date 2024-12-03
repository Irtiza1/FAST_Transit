/*
import connection from "../../../db/index.js";

export const addBusWithLayout = async (req, res) => {
    const {
        BusNumber,
        RouteID,
        VendorID,
        DepartureTime,
        ArrivalTime,
        Status = "Operational",
        Latitude = 0.0,
        Longitude = 0.0,
        NumberOfRowsLeft,
        SeatsPerRowLeft,
        NumberOfRowsRight,
        SeatsPerRowRight,
        SeatsInLastRow
    } = req.body;

    let transactionConnection;

    try {
        // Begin the transaction
        transactionConnection = await connection.getConnection();
        await transactionConnection.beginTransaction();
        console.log("Transaction begins");

        // Insert the Bus details into the BUS table
        const busSql = `
            INSERT INTO BUS (
                BusNumber, RouteID, VendorID, DepartureTime, ArrivalTime, Status, Latitude, Longitude, TotalSeats, TotalOccupiedSeats
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
        const totalSeats =
            NumberOfRowsLeft * SeatsPerRowLeft +
            NumberOfRowsRight * SeatsPerRowRight +
            SeatsInLastRow;

        const [busResult] = await transactionConnection.query(busSql, [
            BusNumber,
            RouteID,
            VendorID,
            DepartureTime,
            ArrivalTime,
            Status,
            Latitude,
            Longitude,
            totalSeats,
            0 // Initially, no seats are occupied
        ]);

        if (busResult.affectedRows === 0) {
            throw new Error("Bus not added");
        }

        const busID = busResult.insertId;
        console.log("Bus added successfully, BusID:", busID);

        // Function to insert rows and seats
        const insertRowsAndSeats = async (numberOfRows, seatsPerRow, rowCategory) => {
            for (let i = 0; i < numberOfRows; i++) {
                const rowSql = `
                    INSERT INTO ROW (BusID, NumberOfSeats, RowCategory)
                    VALUES (?, ?, ?);
                `;
                const [rowResult] = await transactionConnection.query(rowSql, [
                    busID,
                    seatsPerRow,
                    rowCategory
                ]);

                if (rowResult.affectedRows === 0) {
                    throw new Error("Row not added");
                }

                const rowID = rowResult.insertId;
                console.log(`Row ${i + 1} added successfully, RowID:`, rowID);

                // Insert seats for the row
                for (let j = 1; j <= seatsPerRow; j++) {
                    const seatSql = `
                        INSERT INTO SEAT (RowID, SeatNumber, OccupancyStatus, BookingStatus)
                        VALUES (?, ?, ?, ?);
                    `;
                    const [seatResult] = await transactionConnection.query(seatSql, [
                        rowID,
                        j,
                        "Available",
                        "Not Booked"
                    ]);

                    if (seatResult.affectedRows === 0) {
                        throw new Error("Seat not added");
                    }
                }
            }
        };

        // Insert rows and seats for the left side
        await insertRowsAndSeats(NumberOfRowsLeft, SeatsPerRowLeft, "Male");

        // Insert rows and seats for the right side
        await insertRowsAndSeats(NumberOfRowsRight, SeatsPerRowRight, "Female");

        // Insert last row and seats if applicable
        if (SeatsInLastRow > 0) {
            await insertRowsAndSeats(1, SeatsInLastRow, "Male"); // Assuming the last row is Male by default
        }

        // Commit the transaction
        console.log("About to commit the transaction...");
        await transactionConnection.commit();
        console.log("Transaction committed successfully!");

        res.status(200).json({
            message: "Bus, rows, and seats added successfully!",
            busID: busID
        });
    } catch (error) {
        if (transactionConnection) {
            console.log("Transaction rollback initiated due to error:", error.message);
            await transactionConnection.rollback();
        }
        console.error("Error occurred:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    } finally {
        if (transactionConnection) {
            console.log("Releasing connection...");
            transactionConnection.release();
        }
    }
};
*/



// import connection from "../../../db/index.js";

// export const vendorDropDownCreate = async (req, res) => {
//     const { operations, user } = req.params;
//     console.log("Operation:", operations);
//     console.log("User:", user);

//     let transactionConnection;

//     try {
//         // Begin the transaction
//         transactionConnection = await connection.getConnection();
//         await transactionConnection.beginTransaction();
//         console.log("Transaction begins");

//         if (operations === "Add") {
//             let sql = "";
//             let result;
//             if (user === "Notification") {
//                 const { adminID, NotificationText, Type } = req.body;
//                 sql = `
//                     INSERT INTO NOTIFICATION (adminID, NotificationText, Type) 
//                     VALUES (?, ?, ?);
//                 `;
//                 [result] = await transactionConnection.query(sql, [
//                     adminID,
//                     NotificationText,
//                     Type,
//                 ]);
//                 if (result.affectedRows === 0) {
//                     throw new Error("Notification not added");
//                 }
//                 console.log("Notification added successfully");
//                 res.status(200).json({
//                     message: "Notification added successfully!",
//                     notificationID: result.insertId,
//                 });
//             }
//             else if (user === "Bus") {
//                 /*const {
//                     BusNumber,
//                     RouteID,    
//                     DriverID,
//                 } = req.body;
//                 const VendorID = req.vendorID || req.params.vendorID;
//                 sql = `
//                     INSERT INTO BUS (BusNumber, RouteID, VendorID, DriverID) 
//                     VALUES (?, ?, ?, ?);
//                 `;
//                 [result] = await transactionConnection.query(sql, [
//                     BusNumber,
//                     RouteID || null,
//                     VendorID,
//                     // DepartureTime,
//                     // ArrivalTime,
//                     DriverID || null,
//                 ]);
//                 if (result.affectedRows === 0) {
//                     throw new Error("Bus not added");
//                 }
//                 console.log("Bus added successfully");
//                 res.status(200).json({
//                     message: "Bus added successfully!",
//                     busID: result.insertId,
//                 });*/

//                 const {
//                     BusNumber,
//                     RouteID,
//                     DriverID,

//                     // VendorID,
//                     // DepartureTime,
//                     // ArrivalTime,
//                     // Latitude = 0.00000000,
//                     // Longitude = 0.00000000,
//                     // Status = "Operational",
//                     // TotalSeats,
//                     LeftRows,
//                     LeftSeatsPerRow,
//                     RightRows,
//                     RightSeatsPerRow,
//                     MaleRows,
//                     FemaleRows,
//                 } = req.body;
//                 const VendorID = req.vendorID || req.params.vendorID;
//                 transactionConnection = await connection.getConnection();
//                 await transactionConnection.beginTransaction();
//                 console.log("Transaction begins");
        
//                 // Step 1: Insert Bus Details
//                 const busInsertQuery = `
//                     INSERT INTO bus (
//                         BusNumber, RouteID, VendorID, DriverID, TotalSeats
//                     ) VALUES (?, ?, ?, ?, ?);
//                 `;
//                 const totalSeats =(LeftRows * LeftSeatsPerRow) +
//                                     (RightRows * RightSeatsPerRow) + LeftSeatsPerRow + RightSeatsPerRow +1;
                                   
//                 const [busResult] = await transactionConnection.query(busInsertQuery, [
//                     BusNumber,
//                     RouteID || null,
//                     VendorID,
//                     DriverID || null,
//                     // DepartureTime,
//                     // ArrivalTime,
//                     // Status,
//                     // Latitude,
//                     // Longitude,
//                     totalSeats,
//                     0 // TotalOccupiedSeats initially set to 0
//                 ]);
        
//                 const BusID = busResult.insertId;
//                 console.log("Bus added successfully with BusID:", BusID);
        
//                 // Step 2: Insert Rows and Seats
//                 const rows = [];
//                 const seatInsertQuery = `
//                     INSERT INTO seat (RowID, SeatNumber, OccupancyStatus, BookingStatus)
//                     VALUES (?, ?, 'Available', 'Not Booked');
//                 `;
        
//                 // Insert Left Side Rows
//                 for (let i = 1; i <= LeftRows; i++) {
//                     rows.push({ BusID, NumberOfSeats: LeftSeatsPerRow, RowCategory: MaleRows.includes(i) ? "Male" : "Female" });
//                 }
        
//                 // Insert Right Side Rows
//                 for (let i = 1; i <= RightRows; i++) {
//                     rows.push({
//                         BusID,
//                         NumberOfSeats: RightSeatsPerRow,
//                         RowCategory: FemaleRows.includes(i + LeftRows) ? "Female" : "Male",
//                     });
//                 }
        
//                 // Insert rows into the `row` table
//                 for (const row of rows) {
//                     const [rowResult] = await transactionConnection.query(
//                         `
//                         INSERT INTO row (BusID, NumberOfSeats, RowCategory)
//                         VALUES (?, ?, ?)
//                     `,
//                         [BusID, row.NumberOfSeats, row.RowCategory]
//                     );
        
//                     const RowID = rowResult.insertId;
        
//                     // Insert seats for each row
//                     for (let seatNumber = 1; seatNumber <= row.NumberOfSeats; seatNumber++) {
//                         await transactionConnection.query(seatInsertQuery, [RowID, seatNumber]);
//                     }
        
//                     console.log(`Row ${RowID} with ${row.NumberOfSeats} seats added successfully.`);
//                 }
//             }
//             else if (user === "Driver") {
//                 let sql = "";
//                 let result;

//                 // Handle 'Bus Driver' addition
//                 if (user === "BusDriver") {
//                     const {
//                         FirstName,
//                         LastName,
//                         Email,
//                         Password,
//                         PhoneNumber,
//                         CNIC,
//                         Location,
//                         LicenseNumber,
//                         BusID,
//                         Gender = "Male",
//                         Role = "Driver",
//                         isActive = 1,
//                         Status = "Registered",
//                     } = req.body;

//                     // Retrieve VendorID from token or params
//                     const VendorID = req.vendorID || req.params.vendorID;

//                     // Insert into USERS table
//                     sql = `
//                         INSERT INTO USERS (
//                             FirstName, LastName, Email, Password, PhoneNumber, Gender, CNIC, Role, Location, BusID, VendorID, isActive, Status
//                         ) 
//                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
//                     `;
//                     [result] = await transactionConnection.query(sql, [
//                         FirstName,
//                         LastName,
//                         Email,
//                         Password,
//                         PhoneNumber,
//                         Gender,
//                         CNIC,
//                         Role,
//                         Location,
//                         null, // Initially, BusID is null
//                         VendorID,
//                         isActive,
//                         Status,
//                     ]);

//                     if (result.affectedRows === 0) {
//                         throw new Error("User not added");
//                     }

//                     const userID = result.insertId;
//                     console.log("User added successfully, UserID:", userID);

//                     // Insert into BUS_DRIVER table
//                     sql = `
//                         INSERT INTO BUS_DRIVER (LicenseNumber, BusID, UserID)
//                         VALUES (?, ?, ?);
//                     `;
//                     [result] = await transactionConnection.query(sql, [
//                         LicenseNumber,
//                         BusID || null, // Use the provided BusID or null
//                         userID,
//                     ]);

//                     if (result.affectedRows === 0) {
//                         throw new Error("Bus driver not added");
//                     }

//                     console.log("Bus driver added successfully");

//                     res.status(200).json({
//                         message: "Bus driver and user added successfully!",
//                         userID: userID,
//                     });
//                 }
//             }
//             else if (user === "TrafficAlert") {
//                 const { RouteID, AlertDetails, Timestamp, Severity } = req.body;

//                 sql = `
//                     INSERT INTO TRAFFIC_ALERT (RouteID, AlertDetails, Timestamp, Severity) 
//                     VALUES (?, ?, ?, ?);
//                 `;
//                 [result] = await transactionConnection.query(sql, [
//                     RouteID,
//                     AlertDetails,
//                     Timestamp,
//                     Severity,
//                 ]);
//                 if (result.affectedRows === 0) {
//                     throw new Error("Traffic Alert not added");
//                 }
//                 console.log("Traffic Alert added successfully");
//                 res.status(200).json({
//                     message: "Traffic Alert added successfully!",
//                     alertID: result.insertId,
//                 });
//             }
//             else if( user == "Maintenance"){

//             }
//         }
//         console.log("About to commit the transaction...");
//         await transactionConnection.commit();
//         console.log("Transaction committed successfully!");
//     } catch (error) {
//         if (transactionConnection) {
//             console.log("Transaction rollback initiated due to error:", error.message);
//             await transactionConnection.rollback();
//         }
//         console.error("Error occurred:", error);
//         res.status(500).json({
//             error: "Internal server error",
//             details: error.message,
//         });
//     } finally {
//         if (transactionConnection) {
//             console.log("Releasing connection...");
//             transactionConnection.release();
//         }
//     }
// };


import connection from "../../../db/index.js";

// const insertRowsAndSeats = async (transactionConnection, busID, rows, seatsPerRow, rowCategory) => {
//     const rowSql = `
//         INSERT INTO ROW (BusID, NumberOfSeats, RowCategory)
//         VALUES (?, ?, ?);
//     `;
    
//     const seatSql = `
//         INSERT INTO SEAT (RowID, SeatNumber, OccupancyStatus, BookingStatus)
//         VALUES (?, ?, 'Available', 'Not Booked');
//     `;
    
//     for (let i = 0; i < rows; i++) {
//         const [rowResult] = await transactionConnection.query(rowSql, [busID, seatsPerRow, rowCategory]);
//         const rowID = rowResult.insertId;

//         for (let seatNumber = 1; seatNumber <= seatsPerRow; seatNumber++) {
//             await transactionConnection.query(seatSql, [rowID, seatNumber]);
//         }
//     }
// };

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

    // Insert the Final Free Row
    const totalSeatsInFreeRow = freeRowSeats;
    const [freeRowResult] = await transactionConnection.query(rowSql, [busID, totalSeatsInFreeRow, "FREE"]);
    console.log(`Free row inserted with RowID: ${freeRowResult.insertId}`);
    const freeRowID = freeRowResult.insertId;

    for (let seatNumber = 1; seatNumber <= totalSeatsInFreeRow; seatNumber++) {
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
        console.log("hello0");

        if (operations === "Add") {
            let sql = "";
            let result;
            console.log("hello1");
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
                const { FirstName, LastName, Email, Password, PhoneNumber, CNIC, Location, LicenseNumber, BusID, Gender = "Male", Role = "Driver", isActive = 1, Status = "Registered" } = req.body;
                const VendorID = req.vendorID || req.params.vendorID;

                sql = `
                    INSERT INTO USERS (FirstName, LastName, Email, Password, PhoneNumber, Gender, CNIC, Role, Location, BusID, VendorID, isActive, Status)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
                `;
                [result] = await transactionConnection.query(sql, [FirstName, LastName, Email, Password, PhoneNumber, Gender, CNIC, Role, Location, null, VendorID, isActive, Status]);
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

            else if (user === "TrafficAlert") {
                const { RouteID, AlertDetails, Timestamp, Severity } = req.body;
                sql = `
                    INSERT INTO TRAFFIC_ALERT (RouteID, AlertDetails, Timestamp, Severity) 
                    VALUES (?, ?, ?, ?);
                `;
                [result] = await transactionConnection.query(sql, [RouteID, AlertDetails, Timestamp, Severity]);
                if (result.affectedRows === 0) throw new Error("Traffic Alert not added");
                console.log("Traffic Alert added successfully");
                res.status(200).json({ message: "Traffic Alert added successfully!", alertID: result.insertId });
            }
            else if(user === 'Maintenance'){
                
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
