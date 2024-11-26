import connection from "../../db/index.js";

export const adminDropDownDelete = async (req, res) => {
    const { operations, user, id } = req.params;
    console.log("Operation:", operations);
    console.log("User:", user);
    console.log("ID:", id);

    let transactionConnection;

    try {
        if (operations !== "Delete") {
            return res.status(400).send("Invalid operation specified");
        }

        transactionConnection = await connection.getConnection();
        await transactionConnection.beginTransaction();
        console.log("Transaction begins");

        let sql = "";
        let params = [];

        if (user === "Vendor") {
            sql = id 
                ? `DELETE FROM VENDOR WHERE VendorID = ?;` 
                : `DELETE FROM VENDOR;`;
            params = id ? [id] : [];
        } else if (user === "User") {
            sql = id 
                ? `DELETE FROM USERS WHERE UserID = ?;` 
                : `DELETE FROM USERS;`;
            params = id ? [id] : [];
        } else if (user === "Student") {
            sql = id 
                ? `DELETE FROM STUDENT WHERE StudentID = ?;` 
                : `DELETE FROM STUDENT;`;
            params = id ? [id] : [];
        } else if (user === "Faculty") {
            sql = id 
                ? `DELETE FROM FACULTY WHERE FacultyID = ?;` 
                : `DELETE FROM FACULTY;`;
            params = id ? [id] : [];
        } else if (user === "Contract") {
            sql = id 
                ? `DELETE FROM CONTRACT WHERE ContractID = ?;` 
                : `DELETE FROM CONTRACT;`;
            params = id ? [id] : [];
        } else if (user === "Route") {
            sql = id 
                ? `DELETE FROM ROUTE WHERE RouteID = ?;` 
                : `DELETE FROM ROUTE;`;
            params = id ? [id] : [];
        } else if (user === "Stop") {
            sql = id 
                ? `DELETE FROM STOP WHERE StopID = ?;` 
                : `DELETE FROM STOP;`;
            params = id ? [id] : [];
        } else if (user === "Notification") {
            sql = id 
                ? `DELETE FROM NOTIFICATION WHERE NotificationID = ?;` 
                : `DELETE FROM NOTIFICATION;`;
            params = id ? [id] : [];
        } else {
            return res.status(400).send("Invalid user type specified");
        }

        console.log("SQL Query:", sql);
        const [result] = await transactionConnection.query(sql, params);

        if (result.affectedRows === 0) {
            throw new Error(
                id ? `${user} with ID ${id} not found for deletion` : `No ${user}s found for deletion`
            );
        }

        console.log(`${user} deleted successfully`);
        await transactionConnection.commit();
        console.log("Transaction committed successfully");

        return res.status(200).json({
            message: id
                ? `${user} with ID ${id} deleted successfully`
                : `All ${user}s deleted successfully`,
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
