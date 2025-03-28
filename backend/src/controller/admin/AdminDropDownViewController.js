import connection from "../../db/index.js";

export const adminDropDownView = async (req, res) => {
    const { operations, user, id } = req.params;
    console.log('Operation:', operations);
    console.log('User:', user);
    console.log('ID:', id);


    try {
        let sql = '';
        let result;

        if (operations === 'View') {
           if (user === 'User'){
                try {
                    let status = 'non-registered'
                    sql = id ? 'SELECT * FROM USERS WHERE UserID = ? AND Status= ?' : 'SELECT * FROM USERS WHERE Status= ?';
                    console.log('SQL Query:', sql);
                    
                    [result] = await connection.query(sql, id ? [id,status] : [status]);
                    if (result.length === 0) {
                        return res.status(404).send('User not found');
                    }
                    const users = result.map(user => ({
                        UserID: user.UserID,
                        UserName: user.FirstName + " " + user.LastName,
                        Email: user.Email,
                        ContactInfo: user.PhoneNumber,
                    }));
                    // console.log('yaha')
                    return res.status(200).json({ users });
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    return res.status(500).send('Internal Server Error');
                }
            } else if (user === 'Vendor') {
                try {
                    sql = id ? 'SELECT * FROM VENDOR WHERE VendorID = ?' : 'SELECT * FROM VENDOR';
                    console.log('SQL Query:', sql);
                    [result] = await connection.query(sql, id ? [id] : []);
                    if (result.length === 0) {
                        return res.status(404).send('Vendor not found');
                    }
                    const vendors = result.map(vendor => ({
                        VendorID: vendor.VendorID,
                        VendorName: vendor.VendorName,
                        Email: vendor.Email,
                        ContactInfo: vendor.ContactInfo,
                    }));
                    console.log('yaha')
                    return res.status(200).json({ vendors });
                } catch (error) {
                    console.error('Error fetching vendor data:', error);
                    return res.status(500).send('Internal Server Error');
                }
            } else if (user === 'Student') {
                try {
                    sql = id ? 
                        'SELECT * FROM STUDENT S INNER JOIN USERS U ON S.UserID = U.UserID INNER JOIN Department D ON S.DepartmentID = D.DepartmentID WHERE StudentID = ?' :
                        'SELECT * FROM STUDENT S INNER JOIN USERS U ON S.UserID = U.UserID INNER JOIN Department D ON S.DepartmentID = D.DepartmentID';
                    console.log('SQL Query:', sql);
                    [result] = await connection.query(sql, id ? [id] : []);
                    if (result.length === 0) {
                        return res.status(404).send('Student not found');
                    }
                    const students = result.map(student => ({
                        StudentID: student.StudentID,
                        FirstName: student.FirstName,
                        LastName: student.LastName,
                        DepartmentName: student.DepartmentName,
                        Batch: student.Batch,
                        Semester: student.Semester,
                        Email: student.Email,
                        ContactInfo: student.PhoneNumber,
                        Gender: student.Gender,
                        CNIC: student.CNIC,
                        Role: student.Role,
                        Location: student.Location,
                        BusID: student.BusID,
                        SeatID: student.SeatID,
                        VendorID: student.VendorID,
                        AccountActivated: student.isActive,
                        RegisterationStatus: student.status,
                    }));
                    return res.status(200).json({ students });
                } catch (error) {
                    console.error('Error fetching student data:', error);
                    return res.status(500).send('Internal Server Error');
                }
            } else if (user === 'Faculty') {
                try {
                    sql = id ? 
                        'SELECT * FROM FACULTY F INNER JOIN USERS U ON F.UserID = U.UserID INNER JOIN Department D ON F.DepartmentID = D.DepartmentID WHERE FacultyID = ?' :
                        'SELECT * FROM FACULTY F INNER JOIN USERS U ON F.UserID = U.UserID INNER JOIN Department D ON F.DepartmentID = D.DepartmentID';
                    console.log('SQL Query:', sql);
                    [result] = await connection.query(sql, id ? [id] : []);
                    if (result.length === 0) {
                        return res.status(404).send('Faculty not found');
                    }
                    const faculties = result.map(faculty => ({
                        FacultyID: faculty.FacultyID,
                        FirstName: faculty.FirstName,
                        LastName: faculty.LastName,
                        DepartmentName: faculty.DepartmentName,
                        Email: faculty.Email,
                        ContactInfo: faculty.PhoneNumber,
                        Gender: faculty.Gender,
                        CNIC: faculty.CNIC,
                        Role: faculty.Role,
                        Location: faculty.Location,
                        BusID: faculty.BusID,
                        SeatID: faculty.SeatID,
                        VendorID: faculty.VendorID,
                        AccountActivated: faculty.isActive,
                    }));
                    return res.status(200).json({ faculties });
                } catch (error) {
                    console.error('Error fetching faculty data:', error);
                    return res.status(500).send('Internal Server Error');
                }
            } else if (user === 'Contract') {
                try {
                    sql = id ? 
                        'SELECT * FROM CONTRACT C INNER JOIN UNIVERSITY U ON C.UniversityID = U.UniversityID INNER JOIN VENDOR V ON C.VendorID = V.VendorID WHERE ContractID = ?' :
                        'SELECT * FROM CONTRACT C INNER JOIN UNIVERSITY U ON C.UniversityID = U.UniversityID INNER JOIN VENDOR V ON C.VendorID = V.VendorID';
                    console.log('SQL Query:', sql);
                    [result] = await connection.query(sql, id ? [id] : []);
                    if (result.length === 0) {
                        return res.status(404).send('Contract not found');
                    }
                    const contracts = result.map(contract => ({
                        ContractID: contract.ContractID,
                        UniversityID: contract.UniversityID,
                        UniversityName: contract.UniversityName,
                        VendorID: contract.VendorID,
                        VendorName: contract.VendorName,
                        ContractDetails: contract.ContractDetails,
                        ContractStatus: contract.Status,
                        StartDate: contract.StartDate.toISOString().split('T')[0],
                        EndDate: contract.EndDate.toISOString().split('T')[0],
                        VendorContactInfo: contract.ContactInfo,
                        UniversityEmail: contract.Email,
                    }));
                    return res.status(200).json({ contracts });
                } catch (error) {
                    console.error('Error fetching contract data:', error);
                    return res.status(500).send('Internal Server Error');
                }
            } else if (user === 'Route') {
                try {
                    sql = id ? 
                        'SELECT R.RouteID, R.RouteName, R.StartPoint, R.EndPoint, COUNT(S.StopID) AS NumberOfStops, ' +
                        'GROUP_CONCAT(CONCAT(S.StopID, ":", R.RouteID, ":", S.StopName, ":", S.Latitude, ":", S.Longitude) ORDER BY S.StopID) AS StopDetails ' +
                        'FROM ROUTE R JOIN STOP S ON R.RouteID = S.RouteID ' +
                        'WHERE R.RouteID = ? ' +
                        'GROUP BY R.RouteID, R.RouteName, R.StartPoint, R.EndPoint' :
                        'SELECT R.RouteID, R.RouteName, R.StartPoint, R.EndPoint, COUNT(S.StopID) AS NumberOfStops, ' +
                        'GROUP_CONCAT(CONCAT(S.StopID, ":", R.RouteID, ":", S.StopName, ":", S.Latitude, ":", S.Longitude) ORDER BY S.StopID) AS StopDetails ' +
                        'FROM ROUTE R JOIN STOP S ON R.RouteID = S.RouteID ' +
                        'GROUP BY R.RouteID, R.RouteName, R.StartPoint, R.EndPoint';
                
                    console.log('SQL Query:', sql);
                
                    [result] = await connection.query(sql, id ? [id] : []);
                    
                    if (result.length === 0) {
                        return res.status(404).send('Route not found');
                    }
                
                    const routes = result.map(route => ({
                        RouteID: route.RouteID,
                        RouteName: route.RouteName,
                        RouteStartPoint: route.StartPoint,
                        RouteEndPoint: route.EndPoint,
                        NumberOfStops: route.NumberOfStops,
                        StopDetails: route.StopDetails ? route.StopDetails.split(',').map(detail => {
                            const [StopID, RouteID, StopName, Latitude, Longitude] = detail.split(':');
                            return { StopID, RouteID, StopName, Latitude, Longitude };
                        }) : [],
                    }));
                
                    return res.status(200).json({ routes });
                } catch (error) {
                    console.error('Error fetching route data:', error);
                    return res.status(500).send('Internal Server Error');
                }
                
            } else if (user === 'Stop') { //updated and working correctly!

                try {
                    let id1, id2;
                    // console.log('id1: ',id1)
                    // console.log('id2: ',id2)
                    // If the ID is in the format of ["StopID.RouteID"]
                    if (id && id.includes('.')) {
                        [id1, id2] = id.split('.');
                    } 
                    else if (id) {
                        console.error('Invalid ID format');
                        return res.status(400).send('Invalid ID format');
                    }
                    console.log('id1: ',id1)
                    console.log('id2: ',id2)
                    
                    const stop= id ? `
                    SELECT S.StopID, S.RouteID, R.RouteName, S.StopName,S.Latitude,S.Longitude,S.Address,S.EstimatedArrivalTime FROM STOP S INNER JOIN ROUTE R ON S.RouteID = R.RouteID WHERE S.StopID = ? AND S.RouteID= ?;
                    ` : `
                    SELECT S.StopID, S.RouteID, R.RouteName, S.StopName,S.Latitude,S.Longitude,S.Address,S.EstimatedArrivalTime FROM STOP S INNER JOIN ROUTE R ON S.RouteID = R.RouteID;
                    `;

                    console.log(stop)
                    const [stopResults] = await connection.query(stop, id ? [id1, id2] : []);
                    console.log(stopResults)
                    return res.status(200).json({Stops: stopResults});            
                } catch (error) {
                    console.error('Error fetching data:', error);
                    res.status(500).send('Internal Server Error');
                }
            } else if (user === 'Bus') { // updated the api and working perfectly
                try {
                    sql = id
                        ? `
                            SELECT 
                                B.BusID, 
                                B.BusNumber, 
                                DATE_FORMAT(B.DepartureTime, '%Y-%m-%d %H:%i:%s') AS DepartureTime,
                                DATE_FORMAT(B.ArrivalTime, '%Y-%m-%d %H:%i:%s') AS ArrivalTime,
                                B.Status, 
                                B.RouteID, 
                                R.RouteName,
                                B.VendorID, 
                                V.VendorName,
                                B.DriverID,
                                U.FirstName
                            FROM BUS B 
                            INNER JOIN ROUTE R ON B.RouteID = R.RouteID
                            INNER JOIN VENDOR V ON B.VendorID = V.VendorID
                            INNER JOIN USERS U ON B.BusID = U.BusID
                            WHERE B.BusID = ? AND U.Role= 'Driver';

                        `
                        : `
                            SELECT 
                                B.BusID, 
                                B.BusNumber, 
                                DATE_FORMAT(B.DepartureTime, '%Y-%m-%d %H:%i:%s') AS DepartureTime,
                                DATE_FORMAT(B.ArrivalTime, '%Y-%m-%d %H:%i:%s') AS ArrivalTime,
                                B.Status, 
                                B.RouteID, 
                                R.RouteName,
                                B.VendorID, 
                                V.VendorName,
                                B.DriverID,
                                U.FirstName
                            FROM BUS B 
                            INNER JOIN ROUTE R ON B.RouteID = R.RouteID
                            INNER JOIN VENDOR V ON B.VendorID = V.VendorID
                            INNER JOIN USERS U ON B.BusID = U.BusID
                            WHERE U.Role= 'Driver';
                        `;
            
                    console.log('Executing SQL:', sql, id ? [id] : []);
                    const [result] = await connection.query(sql, id ? [id] : []);
            
                    if (result.length === 0) {
                        return res.status(404).send('No Bus data found.');
                    }
            
                    return res.status(200).json(result);
                } catch (error) {
                    console.error('Error fetching Bus data:', error);
                    return res.status(500).send('Internal Server Error');
                }
            } else if (user === 'Driver') { 
                try {
                    console.log('id: ', id)
                    sql = id ? 
                    `SELECT 
                        BD.DriverID, 
                        CONCAT(U.FirstName, ' ', U.LastName) AS DriverName, 
                        U.PhoneNumber,
                        U.BusID,
                        U.VendorID, 
                        BD.LicenseNumber,
                        CASE
                            WHEN U.BusID IS NULL THEN 'Not Assigned'
                            ELSE 'Assigned'
                        END AS AssignmentStatus
                        FROM
                        BUS_DRIVER BD
                        INNER JOIN
                        USERS U ON BD.UserID = U.UserID
                        WHERE
                        BD.DriverID = ?;

                    `
                    :
                    `
                   SELECT 
                        BD.DriverID, 
                        CONCAT(U.FirstName, ' ', U.LastName) AS DriverName, 
                        U.PhoneNumber,
                        IF(U.BusID IS NULL, 'No Bus Assigned', U.BusID) AS BusID,
                        U.VendorID, 
                        BD.LicenseNumber
                    FROM
                        BUS_DRIVER BD
                    INNER JOIN
                        USERS U ON BD.UserID = U.UserID;

                    `;
                
                    [result] = await connection.query(sql, id ? [id] : []);
                    return res.status(200).json(result);
                
                } catch (error) {
                    console.error('Error fetching Driver data:', error);
                    return res.status(500).send('Internal Server Error'); 
                }
                                

            } else if (user === 'Attendance') { 
                if (id) {
                    console.log('hel')
                    // Split the id into components [USERID:BUSID:DATE:SHIFT] [U1:B1:2024-10-22:Morning]
                    const [userIdRaw, busIdRaw, date, shift] = id.split(':');
        
                    
                    const userId = userIdRaw && userIdRaw.startsWith('U') ? userIdRaw.slice(1) : null;
        
                    
                    const busId = busIdRaw && busIdRaw.startsWith('B') ? busIdRaw.slice(1) : null;
        
                    // Date ('yyyy-mm-dd')
                    let conditions = [];
                    let values = [];
        
                    if (userId) {
                        conditions.push('UserID = ?');
                        values.push(userId);
                    }
                    if (busId) {
                        conditions.push('BusID = ?');
                        values.push(busId);
                    }
                    if (date) {
                        conditions.push(`DATE_FORMAT(Timestamp,'%Y-%m-%d') = ?`);
                        values.push(date);
                    }
                    if (shift) {
                        conditions.push('Shift = ?');
                        values.push(shift);
                    }
        
                    if (conditions.length > 0) {
                        console.log('hel1')
                        sql = `SELECT * FROM ATTENDANCE WHERE ${conditions.join(' AND ')}`;
                        [result] = await connection.query(sql, values);
                    } else {
                        
                        return res.status(400).send('Invalid ID format. Please provide at least one filter condition.');
                    }
                } else {
                    
                    const currentDate = new Date().toISOString().split('T')[0]; 
                    // const currentDate= '2024-10-22'
                    sql = `SELECT * FROM ATTENDANCE WHERE DATE_FORMAT(Timestamp,'%Y-%m-%d') = ?`;
                    [result] = await connection.query(sql, [currentDate]);
                }
        
                if (result.length > 0) {
                    return res.status(200).json({
                        AttendanceRecords: result,
                        totalRecords: result.length
                    });
                } else {
                    return res.status(404).send('No attendance records found for the given filters.');
                }

            } else if (user === 'Complaint') {
                try {
                    sql = id ? 
                    `
                    SELECT 
                        C.ComplaintID, 
                        C.ComplaintText, 
                        C.Status, 
                        DATE_FORMAT(C.DateField, '%Y-%m-%d') AS DateField, 
                        B.BusID, 
                        B.BusNumber, 
                        U.UserID, 
                        CONCAT(U.FirstName, ' ', U.LastName) AS UserName, 
                        V.VendorID, 
                        V.VendorName, 
                        V.ContactInfo 
                    FROM
                        COMPLAINT C
                    INNER JOIN 
                        BUS B ON C.BusID = B.BusID
                    INNER JOIN 
                        USERS U ON C.UserID = U.UserID
                    INNER JOIN
                        VENDOR V ON U.VendorID = V.VendorID
                    WHERE
                        C.ComplaintID = ?
                    GROUP BY
                        C.ComplaintID, C.ComplaintText, C.Status, C.DateField, B.BusID, B.BusNumber, U.UserID, U.FirstName, U.LastName, 
                        V.VendorID, V.VendorName, V.ContactInfo
                    `
                    :
                    `
                    SELECT 
                        C.ComplaintID, 
                        C.ComplaintText, 
                        C.Status, 
                        DATE_FORMAT(C.DateField, '%Y-%m-%d') AS DateField, 
                        B.BusID, 
                        B.BusNumber, 
                        U.UserID, 
                        CONCAT(U.FirstName, ' ', U.LastName) AS UserName, 
                        V.VendorID, 
                        V.VendorName, 
                        V.ContactInfo 
                    FROM
                        COMPLAINT C
                    INNER JOIN 
                        BUS B ON C.BusID = B.BusID
                    INNER JOIN 
                        USERS U ON C.UserID = U.UserID
                    INNER JOIN
                        VENDOR V ON U.VendorID = V.VendorID
                    GROUP BY
                        C.ComplaintID, C.ComplaintText, C.Status, C.DateField, B.BusID, B.BusNumber, U.UserID, U.FirstName, U.LastName, 
                        V.VendorID, V.VendorName, V.ContactInfo
                    `;
                
                    [result] = await connection.query(sql, id ? [id] : []);
                     
                    const statusCounts = result.reduce((counts, complaint) => {
                        const status = complaint.Status.toLowerCase();
                        counts[status] = (counts[status] || 0) + 1;
                        return counts;
                    }, {});

                    
                    const response =id? {
                        complaints: result
                    }
                    :
                    {
                        totalComplaints: result.length,
                        statusCounts: {
                            pending: statusCounts.pending || 0,
                            resolved: statusCounts.resolved || 0,
                            inprogress: statusCounts.inprogress || 0
                        },
                        complaints: result
                    }
                    ;

                    return res.status(200).json(response);
                
                } catch (error) {
                    console.error('Error fetching Complaint data:', error);
                    return res.status(500).send('Internal Server Error'); 
                }                                

            } else if (user === 'Traffic Alert') {
                try {
                    sql = id ? `
                        SELECT A.AlertID, A.AlertDetails,
                        DATE_FORMAT(A.Timestamp, '%Y-%m-%d') AS Date, TIME(A.Timestamp) AS Time,
                        A.Severity, R.RouteID, R.RouteName
                        FROM TRAFFIC_ALERT A
                        INNER JOIN ROUTE R ON A.RouteID = R.RouteID
                        WHERE A.AlertID = ?
                    ` : `
                        SELECT A.AlertID, A.AlertDetails,
                        DATE_FORMAT(A.Timestamp, '%Y-%m-%d') AS Date, TIME(A.Timestamp) AS Time,
                        A.Severity, R.RouteID, R.RouteName
                        FROM TRAFFIC_ALERT A
                        INNER JOIN ROUTE R ON A.RouteID = R.RouteID
                    `;
                
                    
                    [result] = await connection.query(sql, id ? [id] : []);
                
                    
                    const alertCounts = result.reduce((counts, alert) => {
                        const severity = alert.Severity.toLowerCase();
                        counts[severity] = (counts[severity] || 0) + 1;
                        return counts;
                    }, {});
                
                    
                    const response = id ? {
                        traffic_alert: result
                    } : {
                        totalAlert: result.length,
                        AlertSeverityCounts: {
                            low: alertCounts.low || 0,
                            medium: alertCounts.medium || 0,
                            high: alertCounts.high || 0
                        },
                        traffic_alert: result
                    };
                
                    return res.status(200).json(response);
                } catch (error) {
                    console.error('Error fetching Traffic Alert data:', error);
                    return res.status(500).send('Internal Server Error');
                }
                

            } else if (user === 'Notification') { 
                try {
                    if (id) {
                        
                        sql = `SELECT N.NotificationID, N.NotificationText,
                                DATE_FORMAT(N.DateSent, '%Y-%m-%d') AS Date,
                                N.Type, U.UserID, CONCAT(U.FirstName, ' ', U.LastName) AS UserName
                                FROM NOTIFICATION N
                                INNER JOIN USERS U ON N.UserID = U.UserID
                                WHERE N.NotificationID = ?`;
                
                        [result] = await connection.query(sql, [id]);
                        if (result.length > 0) {
                            const response = {
                                Notification: result
                            };
                            return res.status(200).json(response);
                        }
                
                        
                        sql = `SELECT adminID, vendorID FROM NOTIFICATION WHERE NotificationID = ?`;
                        let [adminVendorCheck] = await connection.query(sql, [id]);
                
                        if (adminVendorCheck.length > 0) {
                            const { adminID, vendorID } = adminVendorCheck[0];
                
                            if (adminID) {
                                
                                sql = `SELECT N.NotificationID, N.NotificationText,
                                        DATE_FORMAT(N.DateSent, '%Y-%m-%d') AS Date,
                                        N.Type, UN.UniversityID AS AdminID, UN.UniversityName AS AdminName
                                        FROM NOTIFICATION N
                                        INNER JOIN UNIVERSITY UN ON N.adminID = UN.UniversityID
                                        WHERE N.NotificationID = ?`;
                            } else if (vendorID) {
                               
                                sql = `SELECT N.NotificationID, N.NotificationText,
                                        DATE_FORMAT(N.DateSent, '%Y-%m-%d') AS Date, 
                                        N.Type, V.VendorID AS VendorID, V.VendorName AS VendorName
                                        FROM NOTIFICATION N
                                        INNER JOIN VENDOR V ON N.vendorID = V.VendorID
                                        WHERE N.NotificationID = ?`;
                            }
                
                            if (sql) {  
                                [result] = await connection.query(sql, [id]);
                                const response = {
                                    Notification: result
                                };
                                return res.status(200).json(response);
                            } else {
                                throw new Error("SQL query could not be constructed.");
                            }
                        }
                    } else {
                        
                        let sql1 = `SELECT N.NotificationID, N.NotificationText,
                                    DATE_FORMAT(N.DateSent, '%Y-%m-%d') AS Date,
                                    N.Type, U.UserID, CONCAT(U.FirstName, ' ', U.LastName) AS UserName
                                    FROM NOTIFICATION N
                                    INNER JOIN USERS U ON N.UserID = U.UserID`;
                
                        [result] = await connection.query(sql1);
                
                        
                        let sql2 = `SELECT adminID, vendorID, NotificationID FROM NOTIFICATION`;
                
                        let adminVendorResults;
                        [adminVendorResults] = await connection.query(sql2);
                
                        let combinedAdminVendorResults = [];
                        for (let notification of adminVendorResults) {
                            let sql;
                            if (notification.adminID) {
                                sql = `SELECT N.NotificationID, N.NotificationText,
                                        DATE_FORMAT(N.DateSent, '%Y-%m-%d') AS Date, 
                                        N.Type, UN.UniversityID AS AdminID, UN.UniversityName AS AdminName
                                        FROM NOTIFICATION N
                                        INNER JOIN UNIVERSITY UN ON N.adminID = UN.UniversityID
                                        WHERE N.NotificationID = ?`;
                            } else if (notification.vendorID) {
                                sql = `SELECT N.NotificationID, N.NotificationText,
                                        DATE_FORMAT(N.DateSent, '%Y-%m-%d') AS Date, 
                                        N.Type, V.VendorID AS VendorID, V.VendorName AS VendorName
                                        FROM NOTIFICATION N
                                        INNER JOIN VENDOR V ON N.vendorID = V.VendorID
                                        WHERE N.NotificationID = ?`;
                            }
                
                            if (sql) {
                                let [adminVendorResult] = await connection.query(sql, [notification.NotificationID]);
                                combinedAdminVendorResults.push(...adminVendorResult);
                            }
                        }
                
                        
                        let combinedResults = [...result, ...combinedAdminVendorResults].sort((a, b) => a.NotificationID - b.NotificationID);
                
                        const notificationCounts = combinedResults.reduce((counts, notification) => {
                            const type = notification.Type.toLowerCase();
                            counts[type] = (counts[type] || 0) + 1;
                            return counts;
                        }, {});
                
                        const response = {
                            totalNotification: combinedResults.length,
                            NotificationTypeCounts: {
                                info: notificationCounts.info || 0,
                                warning: notificationCounts.warning || 0,
                                alert: notificationCounts.alert || 0
                            },
                            Notification: combinedResults
                        };
                
                        return res.status(200).json(response);
                    }
                } catch (error) {
                    console.error('Error fetching Notification data:', error);
                    return res.status(500).send('Internal Server Error');
                }
                
                                      

            } else if (user === 'Payment') {
                try{
                    sql = id ? `
                        SELECT P.PaymentID, P.Amount,
                            DATE_FORMAT(P.PaymentDate, '%Y-%m-%d') AS Date, P.PaymentStatus,
                            U.UserID, CONCAT(U.FirstName, ' ', U.LastName) AS UserName,
                            V.VendorID, V.VendorName
                        FROM PAYMENT P
                        INNER JOIN USERS U ON P.UserID = U.UserID
                        INNER JOIN VENDOR V ON U.VendorID = V.VendorID
                        WHERE P.PaymentID = ?

                    ` : `
                        SELECT P.PaymentID, P.Amount,
                            DATE_FORMAT(P.PaymentDate, '%Y-%m-%d') AS Date, P.PaymentStatus,
                            U.UserID, CONCAT(U.FirstName, ' ', U.LastName) AS UserName,
                            V.VendorID, V.VendorName
                        FROM PAYMENT P
                        INNER JOIN USERS U ON P.UserID = U.UserID
                        INNER JOIN VENDOR V ON U.VendorID = V.VendorID
                    `;
                
                    
                    [result] = await connection.query(sql, id ? [id] : []);
                
                    
                    const PaymentCounts = result.reduce((counts, payment) => {
                        const status = payment.PaymentStatus.toLowerCase();
                        counts[status] = (counts[status] || 0) + 1;
                        return counts;
                    }, {});
                
                    
                    const response = id ? {
                        Payment: result
                    } : {
                        totalPayment: result.length,
                        PaymentStatusCounts: {
                            pending: PaymentCounts.pending || 0,
                            warning: PaymentCounts.failed || 0,
                            alert: PaymentCounts.paid || 0
                        },
                        Payment: result
                    };
                
                    return res.status(200).json(response);
                }
                catch(error){
                    console.error('Error fetching Payment data:', error);
                    return res.status(500).send('Internal Server Error'); 
                }

            } else {
                res.status(400).send('Invalid user type for view operation');
            }
        }
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('Internal server error');
    }
}
