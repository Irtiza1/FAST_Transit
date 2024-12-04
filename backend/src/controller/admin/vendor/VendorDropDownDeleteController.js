//done job
import connection from "../../../db/index.js";

export const vendorDropDownDelete = async (req, res) => {
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

        switch (user) {
            case "Notification":
                sql = id 
                    ? `DELETE FROM NOTIFICATION WHERE NotificationID = ?;` 
                    : `DELETE FROM NOTIFICATION;`;
                params = id ? [id] : [];
                break;

            case "Traffic Alert":
                sql = id 
                    ? `DELETE FROM TRAFFIC_ALERT WHERE AlertID = ?;` 
                    : `DELETE FROM TRAFFIC_ALERT;`;
                params = id ? [id] : [];
                break;

            case "Bus":
                sql = id 
                    ? `DELETE FROM BUS WHERE BusID = ?;` 
                    : `DELETE FROM BUS;`;
                params = id ? [id] : [];
                break;

            case "Driver":
                sql = id 
                    ? `DELETE FROM BUS_DRIVER WHERE DriverID = ?;` 
                    : `DELETE FROM BUS_DRIVER;`;
                params = id ? [id] : [];
                break;

            default:
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
