import connection from "../../db/index.js";

export const adminDropDownDelete = async (req, res) => {
    const { operations, user, id } = req.params;
    console.log('Operation:', operations);
    console.log('User:', user);
    console.log('ID:', id);

    try {
        if (operations === 'Delete') {
            let sql = '';
            let params = [];

            if (user === 'Vendor') {
                sql = `DELETE FROM VENDOR WHERE VendorID = ?;`;
                params = [id];
            } else if (user === 'Student') {
                sql = `DELETE FROM STUDENT WHERE StudentID = ?;`;
                params = [id];
            } else if (user === 'Faculty') {
                sql = `DELETE FROM FACULTY WHERE FacultyID = ?;`;
                params = [id];
            } else if (user === 'Contract') {
                sql = `DELETE FROM CONTRACT WHERE ContractID = ?;`;
                params = [id];
            } else if (user === 'Route') {
                sql = `DELETE FROM ROUTE WHERE RouteID = ?;`;
                params = [id];
            } else if (user === 'Stop') {
                sql = `DELETE FROM STOP WHERE StopID = ?;`;
                params = [id];
            } else if (user === 'Notification') {
                sql = `DELETE FROM NOTIFICATION WHERE NotificationID = ?;`;
                params = [id];
            } else {
                return res.status(400).send('Invalid user type specified');
            }

            console.log('SQL Query:', sql);
            const [result] = await connection.query(sql, params);

            if (result.affectedRows === 0) {
                return res.status(404).send(`${user} not found for deletion`);
            }

            return res.status(200).json({
                message: `${user} deleted successfully`,
                affectedRows: result.affectedRows,
            });
        } else {
            return res.status(400).send('Invalid operation specified');
        }
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('Internal server error');
    }
};
