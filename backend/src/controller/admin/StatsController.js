import connection from "../../db/index.js";

export const viewStats = async (req, res) => {
    try {
        const sql = `
            SELECT 
                (SELECT COUNT(*) FROM VENDOR) AS vendorCount,
                (SELECT COUNT(*) FROM STUDENT) AS studentCount,
                (SELECT COUNT(*) FROM FACULTY) AS facultyCount,
                (SELECT COUNT(*) FROM BUS_DRIVER) AS driverCount,
                (SELECT COUNT(*) FROM USERS) AS userCount,
                (SELECT COUNT(*) FROM USERS WHERE Status = 'registered') AS registeredUserCount,
                (SELECT COUNT(*) FROM USERS WHERE Status = 'non-registered') AS nonRegisteredUserCount,
                (SELECT COUNT(*) FROM BUS) AS busesCount,
                (SELECT COUNT(*) FROM BUS WHERE Status = 'Operational') AS operationalBusesCount,
                (SELECT COUNT(*) FROM BUS WHERE Status = 'Under Maintenance') AS underMaintenanceBusesCount,
                (SELECT COUNT(*) FROM BUS WHERE Status = 'Inactive') AS inActiveBusesCount,
                (SELECT COUNT(*) FROM ROUTE) AS routeCount,
                (SELECT COUNT(*) FROM STOP) AS stopCount;
        `;

        
        const [stats] = await connection.query(sql);

        // console.log(stats);  


        if (!stats || stats.length === 0) {
            return res.status(500).json({ message: 'No data found in the database.' });
        }

        
        const response = {
            vendorCount: stats[0].vendorCount,
            studentCount: stats[0].studentCount,
            facultyCount: stats[0].facultyCount,
            driverCount: stats[0].driverCount,
            userCount: stats[0].userCount,
            registeredUserCount: stats[0].registeredUserCount,
            nonRegisteredUserCount: stats[0].nonRegisteredUserCount,
            busesCount: stats[0].busesCount,
            operationalBusesCount: stats[0].operationalBusesCount,
            underMaintenanceBusesCount: stats[0].underMaintenanceBusesCount,
            inActiveBusesCount: stats[0].inActiveBusesCount,
            routeCount: stats[0].routeCount,
            stopCount: stats[0].stopCount
        };

        
        return res.status(200).json({
            message: 'Statistics retrieved successfully',
            data: response
        });
    } catch (error) {
        console.error("Error retrieving statistics:", error);
        return res.status(500).json({ message: 'An error occurred while retrieving statistics.', error });
    }
};
