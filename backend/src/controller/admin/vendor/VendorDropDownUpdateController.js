//all done jsut revisit driver api
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
