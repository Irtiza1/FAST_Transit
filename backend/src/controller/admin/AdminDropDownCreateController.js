import connection from "../../db/index.js";

export const adminDropDownCreate = async (req, res) => {
    const { operations, user, id } = req.params;
    console.log('Operation:', operations);
    console.log('User:', user);
    console.log('ID:', id);
    try {
        let sql = '';
        let result;

        if (operations === 'Add') {
            /*if (user === 'Vendor') {
                // direct toward the sigup vendor page
            } else if (user === 'Student') {
                // done by student themselve
            } else if (user === 'Faculty') {
                // done by student themselve
            } else */
            if (user === 'Contract') {
                /*
                    ContractID
                    UniversityID
                    VendorID
                    StartDate
                    EndDate
                    ContractDetails
                    Status */   
                const { UniversityID, VendorID, StartDate, EndDate, ContractDetails, Status } = req.body;

                try {
                    const sql = `
                        INSERT INTO CONTRACT 
                        (UniversityID, VendorID, StartDate, EndDate, ContractDetails, Status) 
                        VALUES (?, ?, ?, ?, ?, ?);
                    `;
                    console.log('SQL Query:', sql);

                    const [result] = await connection.query(sql, [
                        UniversityID, VendorID, StartDate, EndDate, ContractDetails, Status
                    ]);

                    if (result.affectedRows === 0) {
                        return res.status(404).send('Contract not formed');
                    }

                    return res.status(200).json({
                        message: 'Contract added successfully!',
                        contractID: result.insertId, // Use the auto-generated ID
                    });

                } catch (error) {
                    console.error('Error forming contract:', error);
                    return res.status(500).send('Internal Server Error');
                }

            } else if (user === 'Route') {
                /*
                    RouteID
                    RouteName
                    StartPoint
                    EndPoint 
                */
                const { RouteName, StartPoint, EndPoint } = req.body;
                console.log('Request Body:', req.body);

                try {
                    const sql = `
                        INSERT INTO ROUTE 
                        (RouteName, StartPoint, EndPoint) 
                        VALUES (?, ?, ?);
                    `;
                    console.log('SQL Query:', sql);

                    const [result] = await connection.query(sql, [
                        RouteName, StartPoint, EndPoint
                    ]);

                    if (result.affectedRows === 0) {
                        return res.status(404).send('Route not added');
                    }

                    return res.status(200).json({
                        message: 'Route added successfully!',
                        routeID: result.insertId, 
                    });

                } catch (error) {
                    console.error('Error adding route:', error);
                    return res.status(500).send('Internal Server Error');
                }

                
            } else if (user === 'Stop') {
                /*
                RouteID
                StopName
                Latitude
                Longitude
                Address
                EstimatedArrivalTime
                */
                const {RouteID,StopName, Latitude, Longitude, Address, EstimatedArrivalTime } = req.body;
                console.log('Request Body:', req.body);

                try {
                const sql = `
                    INSERT INTO STOP 
                    (RouteID, StopName, Latitude, Longitude, Address, EstimatedArrivalTime) 
                    VALUES (?, ?, ?, ?, ?, ?);
                `;
                console.log('SQL Query:', sql);

                const [result] = await connection.query(sql, [
                    RouteID,StopName, Latitude, Longitude, Address, EstimatedArrivalTime
                ]);

                if (result.affectedRows === 0) {
                    return res.status(404).send('Stop not added');
                }

                return res.status(200).json({
                    message: 'Stop added successfully!',
                    stopID: result.insertId, 
                });

                } catch (error) {
                console.error('Error adding stop:', error);
                return res.status(500).send('Internal Server Error');
                }


            } else if (user === 'Notification') {
                // Add logic for Notification
                /*adminID
                  NotificationText
                  Type */
                  const { adminID, NotificationText, Type } = req.body;

                  console.log('Request Body:', req.body);
                  
                  try {
                      const sql = `
                          INSERT INTO NOTIFICATION (adminID, NotificationText, Type) 
                          VALUES (?, ?, ?);
                      `;
                      console.log('SQL Query:', sql);
                      if (!adminID || !NotificationText || !Type) {
                        return res.status(400).send('Missing required fields');
                       }
                    
                      const [result] = await connection.query(sql, [
                          adminID, NotificationText, Type,
                      ]);
                  
                      if (result.affectedRows === 0) {
                          return res.status(404).send('Notification not added');
                      }
                  
                      return res.status(200).json({
                          message: 'Notification added successfully!',
                          notificationID: result.insertId,
                      });
                  
                  } catch (error) {
                      console.error('Error adding notification:', error);
                      return res.status(500).send('Internal Server Error');
                  }
                  

            }

        }
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('Internal server error');
    }
}
