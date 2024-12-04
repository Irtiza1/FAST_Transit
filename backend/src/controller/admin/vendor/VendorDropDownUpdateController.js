/*// import connection from "../../db/index.js";

// export const adminDropDownUpdate = async (req, res) => {
//     const { operations, user, id } = req.params;
//     const updateData = req.body; 
//     console.log("Operation:", operations);
//     console.log("User:", user);
//     console.log("ID:", id);
//     console.log("Update Data:", updateData);

//     let transactionConnection;

//     try {
//         if (operations !== "Update") {
//             return res.status(400).send("Invalid operation specified");
//         }

//         transactionConnection = await connection.getConnection();
//         await transactionConnection.beginTransaction();
//         console.log("Transaction begins");

//         let sql = "";
//         let params = [];

//         if (user === "Vendor") {
//             sql = `UPDATE VENDOR SET VendorName = ?, VendorContact = ? WHERE VendorID = ?;`;
//             params = [updateData.name, updateData.contact, id];
//         } else if (user === "Student") {
//             sql = `UPDATE STUDENT SET StudentName = ?, StudentEmail = ? WHERE StudentID = ?;`;
//             params = [updateData.name, updateData.email, id];
//         } else if (user === "Faculty") {
//             sql = `UPDATE FACULTY SET FacultyName = ?, FacultyDepartment = ? WHERE FacultyID = ?;`;
//             params = [updateData.name, updateData.department, id];
//         } else if (user === "Contract") {
//             sql = `UPDATE CONTRACT SET ContractName = ?, ContractValue = ? WHERE ContractID = ?;`;
//             params = [updateData.name, updateData.value, id];
//         } else if (user === "Route") {
//             sql = `UPDATE ROUTE SET RouteName = ?, RouteDistance = ? WHERE RouteID = ?;`;
//             params = [updateData.name, updateData.distance, id];
//         } else if (user === "Stop") {
//             sql = `UPDATE STOP SET StopName = ?, StopLocation = ? WHERE StopID = ?;`;
//             params = [updateData.name, updateData.location, id];
//         } else if (user === "Complaint") {
//             sql = `UPDATE COMPLAINT SET ComplaintDetails = ?, ComplaintStatus = ? WHERE ComplaintID = ?;`;
//             params = [updateData.details, updateData.status, id];
//         } else if (user === "Alert") {
//             sql = `UPDATE ALERT SET AlertMessage = ?, AlertType = ? WHERE AlertID = ?;`;
//             params = [updateData.message, updateData.type, id];
//         } else {
//             return res.status(400).send("Invalid user type specified");
//         }

//         console.log("SQL Query:", sql);
//         const [result] = await transactionConnection.query(sql, params);

//         if (result.affectedRows === 0) {
//             throw new Error(`${user} with ID ${id} not found for update`);
//         }

//         console.log(`${user} updated successfully`);
//         await transactionConnection.commit();
//         console.log("Transaction committed successfully");

//         return res.status(200).json({
//             message: `${user} updated successfully`,
//             affectedRows: result.affectedRows,
//         });
//     } catch (error) {
//         if (transactionConnection) {
//             console.log("Transaction rollback initiated due to error:", error.message);
//             await transactionConnection.rollback();
//         }
//         console.error("Error occurred:", error);
//         res.status(500).send({
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


// import connection from "../../db/index.js";

// export const adminDropDownUpdate = async (req, res) => {
//     const { operations, user, id } = req.params;
//     const updateData = req.body; // Assuming data to update comes from the request body
//     console.log("Operation:", operations);
//     console.log("User:", user);
//     console.log("ID:", id);
//     console.log("Update Data:", updateData);

//     let transactionConnection;
//     let fields; // Declare fields outside try block for accessibility in catch

//     try {
//         if (operations !== "Update") {
//             return res.status(400).send("Invalid operation specified");
//         }

//         const tableMap = {
//             Vendor: "VENDOR",
//             Student: "STUDENT",
//             Faculty: "FACULTY",
//             Contract: "CONTRACT",
//             Route: "ROUTE",
//             Stop: "STOP",
//             Complaint: "COMPLAINT",
//             Alert: "ALERT",
//         };

//         const idFieldMap = {
//             Vendor: "VendorID",
//             Student: "StudentID",
//             Faculty: "FacultyID",
//             Contract: "ContractID",
//             Route: "RouteID",
//             Stop: "StopID",
//             Complaint: "ComplaintID",
//             Alert: "AlertID",
//         };

//         if (!tableMap[user] || !idFieldMap[user]) {
//             return res.status(400).send("Invalid user type specified");
//         }

//         const tableName = tableMap[user];
//         const idField = idFieldMap[user];

//         fields = Object.keys(updateData); 
//         if (fields.length === 0) {
//             return res.status(400).send("No update data provided");
//         }

//         const setClauses = fields.map((field) => `${field} = ?`).join(", ");
//         const params = [...fields.map((field) => updateData[field]), id];

//         const sql = `UPDATE ${tableName} SET ${setClauses} WHERE ${idField} = ?;`;

//         console.log("SQL Query:", sql);
//         console.log("Parameters:", params);

//         transactionConnection = await connection.getConnection();
//         await transactionConnection.beginTransaction();
//         console.log("Transaction begins");

//         const [result] = await transactionConnection.query(sql, params);

//         if (result.affectedRows === 0) {
//             throw new Error(`${user} with ID ${id} not found for update`);
//         }

//         console.log(`${user} updated successfully`);
//         await transactionConnection.commit();
//         console.log("Transaction committed successfully");

//         return res.status(200).json({
//             message: `${user} updated successfully`,
//             affectedRows: result.affectedRows,
//         });
//     } catch (error) {
//         if (transactionConnection) {
//             console.log("Transaction rollback initiated due to error:", error.message);
//             await transactionConnection.rollback();
//         }
//         console.error("Error occurred:", error);

//         res.status(500).send({
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
*/
import connection from "../../../db/index.js";

export const vendorDropDownUpdate = async (req, res) => {
    const updateData = req.body; // Get the whole update data from the request body
    const { operations, user } = req.params;

    console.log("Operation:", operations);
    console.log("User:", user);
    console.log("Update Data:", updateData);

    let transactionConnection;

    try {
        if (operations !== "Update") {
            return res.status(400).send("Invalid operation specified");
        }

        const tableMap = {
            // Vendor: "VENDOR",
            // Student: "STUDENT",
            // Faculty: "FACULTY",
            // Contract: "CONTRACT",
            // Route: "ROUTE",
            // Stop: "STOP",
            Complaint: "COMPLAINT",
            // Alert: "ALERT",
            Bus: "BUS",
            Driver : "BUS_DRIVER",
            Payment: "PAYMENT",
            Seat : "SEAT",
            // Card: "POINT_CARD",
            Maintenance: "MAINTENANCE",

        };

        const idFieldMap = {
            // Vendor: "VendorID",
            // Student: "StudentID",
            // Faculty: "FacultyID",
            Complaint: "ComplaintID",
            Bus: "BusID",   // Fixed the correct key here
            Driver: "DriverID",  // Driver related update
            Payment: "PaymentID",
            Seat: "SeatID",
            // Card: "CardID",  
            Maintenance: "MaintenanceID",
        };
        /*
        1- maintenance update : vendor id , [maintenanceid/busid] or also can give vendorid
        2- seat id : vendorid or busid or row & seat id
        3- payment : payment id, userid, status
        4- driver: driver id,
        5- bus: driverid, busid, 
        6- complaint: user, bus ,status

        */

        if (!tableMap[user] || !idFieldMap[user]) {
            return res.status(400).send("Invalid user type specified");
        }

        const tableName = tableMap[user];
        const idField = idFieldMap[user];

        // Check if id is provided in the updateData object
        if (!updateData[idField]) {
            return res.status(400).send(`ID field (${idField}) is required in the request body`);
        }

        const id = updateData[idField]; // Use id from the updateData object
        const fields = Object.keys(updateData).filter(field => field !== idField); // Exclude the ID field from the update data
        if (fields.length === 0) {
            return res.status(400).send("No update data provided");
        }

        // Create the SET clause for the SQL update
        const setClauses = fields.map((field) => `${field} = ?`).join(", ");
        const params = [...fields.map((field) => updateData[field]), id];

        const sql = `UPDATE ${tableName} SET ${setClauses} WHERE ${idField} = ?;`;

        console.log("SQL Query:", sql);
        console.log("Parameters:", params);

        transactionConnection = await connection.getConnection();
        await transactionConnection.beginTransaction();
        console.log("Transaction begins");

        const [result] = await transactionConnection.query(sql, params);

        if (result.affectedRows === 0) {
            throw new Error(`${user} with ID ${id} not found for update`);
        }

        console.log(`${user} updated successfully`);
        await transactionConnection.commit();
        console.log("Transaction committed successfully");

        return res.status(200).json({
            message: `${user} updated successfully`,
            affectedRows: result.affectedRows,
        });
    } catch (error) {
        if (transactionConnection) {
            console.log("Transaction rollback initiated due to error:", error.message);
            await transactionConnection.rollback();
        }
        console.error("Error occurred:", error);

        res.status(500).send({
            error: "Internal server error",
            details: error.message,
        });
    } finally {
        if (transactionConnection) {
            console.log("Releasing connection...");
            transactionConnection.release();
        }
    }
};
