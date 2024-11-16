import connection from "../../db/index.js";

export const adminDropDown = async (req, res) => {
    const { operations, user, id } = req.params;
    console.log('Operation:', operations);
    console.log('User:', user);
    console.log('ID:', id);

    try {
        let sql = '';
        let result;

        if (operations === 'Add') {
            if (user === 'Vendor') {
                // Add logic for Vendor
                // You can implement SQL insert statements to add vendor here
            } else if (user === 'Student') {
                // Add logic for Student
            } else if (user === 'Faculty') {
                // Add logic for Faculty
            } else if (user === 'Contract') {
                // Add logic for Contract
            } else if (user === 'Route') {
                // Add logic for Route
            } else if (user === 'Stop') {
                // Add logic for Stop
            } else if (user === 'Notification') {
                // Add logic for Notification
            }

        } else if (operations === 'Delete') {
            if (user === 'Vendor') {
                // Delete logic for Vendor
                // Implement delete operation for Vendor
            } else if (user === 'Student') {
                // Delete logic for Student
            } else if (user === 'Faculty') {
                // Delete logic for Faculty
            } else if (user === 'Contract') {
                // Delete logic for Contract
            } else if (user === 'Route') {
                // Delete logic for Route
            } else if (user === 'Stop') {
                // Delete logic for Stop
            }

        } else if (operations === 'Update') {
            if (user === 'Vendor') {
                // Update logic for Vendor
                // You can implement SQL update statements for Vendor here
            } else if (user === 'Student') {
                // Update logic for Student
            } else if (user === 'Faculty') {
                // Update logic for Faculty
            } else if (user === 'Contract') {
                // Update logic for Contract
            } else if (user === 'Route') {
                // Update logic for Route
            } else if (user === 'Stop') {
                // Update logic for Stop
            } else if (user === 'Complaint') {
                // Update logic for Complaint
            } else if (user === 'Alert') {
                // Update logic for Alert
            }

        } else if (operations === 'View') {
            if (user === 'Vendor') {
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
                        'GROUP_CONCAT(CONCAT(S.StopID, ".", R.RouteID, ":", S.StopName) ORDER BY S.StopID) AS StopNames ' +
                        'FROM ROUTE R JOIN STOP S ON R.RouteID = S.RouteID ' +
                        'WHERE R.RouteID = ? ' +
                        'GROUP BY R.RouteID, R.RouteName, R.StartPoint, R.EndPoint' :
                        'SELECT R.RouteID, R.RouteName, R.StartPoint, R.EndPoint, COUNT(S.StopID) AS NumberOfStops, ' +
                        'GROUP_CONCAT(CONCAT(S.StopID, ".", R.RouteID, ":", S.StopName) ORDER BY S.StopID) AS StopNames ' +
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
                        StopNames: route.StopNames ? route.StopNames.split(',') : [],
                    }));
                    return res.status(200).json({ routes });
                } catch (error) {
                    console.error('Error fetching route data:', error);
                    return res.status(500).send('Internal Server Error');
                }
            }  else if (user === 'Stop') { //do check faculity quereis 

                try {
                    let id1, id2;
                    // console.log('id1: ',id1)
                    // console.log('id2: ',id2)
                    // If the ID is in the format of "StopID.RouteID"
                    if (id && id.includes('.')) {
                        [id1, id2] = id.split('.');
                    } 
                    else if (id) {
                        console.error('Invalid ID format');
                        return res.status(400).send('Invalid ID format');
                    }
                    console.log('id1: ',id1)
                    console.log('id2: ',id2)
                    // Query for Student Data
                    const sqlStudents = id ? `
                        SELECT 
                            DISTINCT (ST.StudentID),
                            CONCAT(S.StopID, '.', S.RouteID) AS StopID,
                            S.StopName,
                            S.Address,
                            S.EstimatedArrivalTime AS PointArrivalTime,
                            R.RouteName,
                            COUNT(ST.StudentID) AS StudentCount,
                            CONCAT(U.FirstName, ' ', U.LastName) AS StudentName,
                            U.PhoneNumber AS StudentContactInfo
                        FROM 
                            STOP S
                        JOIN 
                            ROUTE R ON S.RouteID = R.RouteID
                        JOIN 
                            BUS B ON R.RouteID = B.RouteID
                        JOIN 
                            USERS U ON B.BusID = U.UserID
                        JOIN 
                            STUDENT ST ON U.UserID = ST.UserID
                        WHERE 
                            S.StopID = ? AND R.RouteID= ?
                        GROUP BY 
                            ST.StudentID
                    ` : `
                        SELECT 
                            DISTINCT (ST.StudentID),
                            CONCAT(S.StopID, '.', S.RouteID) AS StopID,
                            S.StopName,
                            S.Address,
                            S.EstimatedArrivalTime AS PointArrivalTime,
                            R.RouteName,
                            COUNT(ST.StudentID) AS StudentCount,
                            CONCAT(U.FirstName, ' ', U.LastName) AS StudentName,
                            U.PhoneNumber AS StudentContactInfo
                        FROM 
                            STOP S
                        JOIN 
                            ROUTE R ON S.RouteID = R.RouteID
                        JOIN 
                            BUS B ON R.RouteID = B.RouteID
                        JOIN 
                            USERS U ON B.BusID = U.UserID
                        JOIN 
                            STUDENT ST ON U.UserID = ST.UserID
                        GROUP BY 
                            ST.StudentID
                    `;
                    console.log(sqlStudents)
                    const [studentResults] = await connection.query(sqlStudents, id ? [id1, id2] : []);
                    console.log(studentResults)
                    // Query for Faculty Data
                    
                    const sqlFaculties = id ? `
                        SELECT
                            F.FacultyID,  
                            COUNT(DISTINCT F.FacultyID) AS FacultyCount,  
                            CONCAT(U.FirstName, ' ', U.LastName) AS FacultyName,
                            U.PhoneNumber AS FacultyContactInfo
                        FROM 
                            STOP S
                        JOIN 
                            ROUTE R ON S.RouteID = R.RouteID
                        JOIN 
                            BUS B ON R.RouteID = B.RouteID
                        JOIN 
                            USERS U ON B.BusID = U.UserID 
                        JOIN 
                            FACULTY F ON U.UserID = F.UserID 
                        WHERE 
                            U.Role = 'Faculty' AND S.StopID = ? AND R.RouteID = ?
                        GROUP BY 
                            F.FacultyID, U.FirstName, U.LastName, U.PhoneNumber  
                        ` : `
                        SELECT 
                            F.FacultyID,  
                            COUNT(DISTINCT F.FacultyID) AS FacultyCount,  
                            CONCAT(U.FirstName, ' ', U.LastName) AS FacultyName,
                            U.PhoneNumber AS FacultyContactInfo
                        FROM 
                            STOP S
                        JOIN 
                            ROUTE R ON S.RouteID = R.RouteID
                        JOIN 
                            BUS B ON R.RouteID = B.RouteID
                        JOIN 
                            USERS U ON B.BusID = U.UserID
                        JOIN 
                            FACULTY F ON U.UserID = F.UserID
                        WHERE 
                            U.Role = 'Faculty'  
                        GROUP BY 
                            F.FacultyID, U.FirstName, U.LastName, U.PhoneNumber  
                        `;

                    console.log(sqlFaculties);
                    const [facultyResults] = await connection.query(sqlFaculties, id ? [id1, id2] : []);
                    console.log(facultyResults);

            
                    // Query for Bus and Vendor Info
                    const sqlBusInfo = id ? `
                        SELECT 
                            DISTINCT (B.BusID),
                            BV.VendorName,
                            BV.ContactInfo AS BusVendorContactInfo,
                            BD.DriverID,
                            CONCAT(U.FirstName, ' ', U.LastName) AS DriverName,
                            U.PhoneNumber AS DriverContactInfo
                        FROM 
                            STOP S
                        JOIN 
                            ROUTE R ON S.RouteID = R.RouteID
                        JOIN 
                            BUS B ON R.RouteID = B.RouteID
                        JOIN 
                            VENDOR BV ON B.VendorID = BV.VendorID
                        JOIN 
                            BUS_DRIVER BD ON B.BusID = BD.BusID
                        JOIN 
                            USERS U ON BD.DriverID = U.UserID
                        WHERE 
                            S.StopID = ? AND R.RouteID= ?
                        GROUP BY 
                            B.BusID
                    ` : `
                        SELECT 
                            DISTINCT (B.BusID),
                            BV.VendorName,
                            BV.ContactInfo AS BusVendorContactInfo,
                            BD.DriverID,
                            CONCAT(U.FirstName, ' ', U.LastName) AS DriverName,
                            U.PhoneNumber AS DriverContactInfo
                        FROM 
                            STOP S
                        JOIN 
                            ROUTE R ON S.RouteID = R.RouteID
                        JOIN 
                            BUS B ON R.RouteID = B.RouteID
                        JOIN 
                            VENDOR BV ON B.VendorID = BV.VendorID
                        JOIN 
                            BUS_DRIVER BD ON B.BusID = BD.BusID
                        JOIN 
                            USERS U ON BD.DriverID = U.UserID
                        GROUP BY 
                            B.BusID
                    `;
                    console.log(sqlBusInfo)
                    const [busResults] = await connection.query(sqlBusInfo, id ? [id1, id2] : []);
                    console.log(busResults)
                    // Combine results into response object
                    // const filteredFacultyData = facultyResults.map(faculty => {
                    //     const { StopID, ...rest } = faculty; // Removes StopID from each faculty entry
                    //     return rest;
                    // });
                    
                    // const filteredBusData = busResults.map(bus => {
                    //     const { StopID, ...rest } = bus; // Removes StopID from each bus entry
                    //     return rest;
                    // });
                    
            
                    // Send combined response
                    return res.status(200).json({
                        students: studentResults,
                        faculties: facultyResults,
                        busInfo: busResults});
            
                } catch (error) {
                    console.error('Error fetching data:', error);
                    res.status(500).send('Internal Server Error');
                }
            }
             else if (user === 'Bus') {
                try {
                    
                    sql = id ? 
                    `SELECT 
                        B.BusID, 
                        B.BusNumber, 
                        B.DepartureTime, 
                        B.ArrivalTime, 
                        B.Status, 
                        R.RouteID, 
                        R.RouteName,
                        V.VendorID, 
                        V.VendorName, 
                        V.ContactInfo, 
                        BD.DriverID, 
                        CONCAT(U.FirstName, ' ', U.LastName) AS DriverName
                    FROM
                        BUS B
                    INNER JOIN 
                        ROUTE R ON B.RouteID = R.RouteID
                    INNER JOIN
                        VENDOR V ON B.VendorID = V.VendorID
                    INNER JOIN
                        BUS_DRIVER BD ON B.DriverID = BD.DriverID
                    INNER JOIN 
                        USERS U ON BD.DriverID = U.UserID  
                    WHERE 
                        B.BusID = ?
                    GROUP BY 
                        B.BusID, B.BusNumber, B.DepartureTime, B.ArrivalTime, B.Status, R.RouteID, R.RouteName,
                        V.VendorID, V.VendorName, V.ContactInfo, BD.DriverID, U.FirstName, U.LastName
                    ` : 
                    `SELECT 
                        B.BusID, 
                        B.BusNumber, 
                        B.DepartureTime, 
                        B.ArrivalTime, 
                        B.Status, 
                        R.RouteID, 
                        R.RouteName,
                        V.VendorID, 
                        V.VendorName, 
                        V.ContactInfo, 
                        BD.DriverID, 
                        CONCAT(U.FirstName, ' ', U.LastName) AS DriverName
                    FROM
                        BUS B
                    INNER JOIN 
                        ROUTE R ON B.RouteID = R.RouteID
                    INNER JOIN
                        VENDOR V ON B.VendorID = V.VendorID
                    INNER JOIN
                        BUS_DRIVER BD ON B.DriverID = BD.DriverID
                    INNER JOIN 
                        USERS U ON BD.DriverID = U.UserID 
                    GROUP BY 
                        B.BusID, B.BusNumber, B.DepartureTime, B.ArrivalTime, B.Status, R.RouteID, R.RouteName,
                        V.VendorID, V.VendorName, V.ContactInfo, BD.DriverID, U.FirstName, U.LastName
                    `;
                
                    [result] = await connection.query(sql, id ? [id] : []);
                    return res.status(200).json(result);
                
                } catch (error) {
                    console.error('Error fetching Bus data:', error);
                    return res.status(500).send('Internal Server Error'); 
                }
                 

            } else if (user === 'Driver') { 
                try {
                    console.log('id: ', id)
                    sql = id ? 
                    `
                    SELECT 
                        BD.DriverID, 
                        CONCAT(U.FirstName, ' ', U.LastName) AS DriverName, 
                        U.PhoneNumber,
                        U.BusID,
                        U.VendorID, 
                        BD.LicenseNumber,  -- Ensure 'LicenseNumber' is a column in BUS_DRIVER or adjust if necessary
                        B.BusID, 
                        B.BusNumber
                    FROM
                        BUS_DRIVER BD
                    INNER JOIN
                        USERS U ON BD.UserID = U.UserID
                    INNER JOIN
                        BUS B ON U.BusID = B.BusID
                    WHERE
                        BD.DriverID = ?
                    GROUP BY
                        BD.DriverID, U.FirstName, U.LastName, U.PhoneNumber, U.BusID, U.VendorID, BD.LicenseNumber, B.BusID, B.BusNumber
                    `
                    :
                    `
                    SELECT 
                        BD.DriverID, 
                        CONCAT(U.FirstName, ' ', U.LastName) AS DriverName, 
                        U.PhoneNumber,
                        U.BusID,
                        U.VendorID, 
                        BD.LicenseNumber,  -- Ensure 'LicenseNumber' is a column in BUS_DRIVER or adjust if necessary
                        B.BusID, 
                        B.BusNumber
                    FROM
                        BUS_DRIVER BD
                    INNER JOIN
                        USERS U ON BD.UserID = U.UserID
                    INNER JOIN
                        BUS B ON U.BusID = B.BusID
                    GROUP BY
                        BD.DriverID, U.FirstName, U.LastName, U.PhoneNumber, U.BusID, U.VendorID, BD.LicenseNumber, B.BusID, B.BusNumber
                    `;
                
                    [result] = await connection.query(sql, id ? [id] : []);
                    return res.status(200).json(result);
                
                } catch (error) {
                    console.error('Error fetching Driver data:', error);
                    return res.status(500).send('Internal Server Error'); 
                }
                                

            } else if (user === 'Attendance') { //brainstorm
                try{
                    //extract the user id of respective 

                    // if (user)
                }
                catch(error){
                    console.error('Error fetching Attendance data:', error);
                    return res.status(500).send('Internal Server Error'); 
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
                     // Calculate the counts for each status
                    const statusCounts = result.reduce((counts, complaint) => {
                        const status = complaint.Status.toLowerCase();
                        counts[status] = (counts[status] || 0) + 1;
                        return counts;
                    }, {});

                    // Add counts and complaint list to the response
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
                        DATE(A.Timestamp) AS Date, TIME(A.Timestamp) AS Time,
                        A.Severity, R.RouteID, R.RouteName
                        FROM TRAFFIC_ALERT A
                        INNER JOIN ROUTE R ON A.RouteID = R.RouteID
                        WHERE A.AlertID = ?
                    ` : `
                        SELECT A.AlertID, A.AlertDetails,
                        DATE(A.Timestamp) AS Date, TIME(A.Timestamp) AS Time,
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
                                DATE(N.DateSent) AS Date, TIME(N.DateSent) AS Time,
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
                
                        sql = `SELECT N.NotificationID, N.NotificationText,
                                DATE(N.DateSent) AS Date, TIME(N.DateSent) AS Time,
                                N.Type, A.UniversityID AS AdminID, A.UniversityName AS AdminName
                                FROM NOTIFICATION N
                                INNER JOIN UNIVERSITY A ON N.adminID = A.UniversityID
                                WHERE N.NotificationID = ?`;
                
                        [result] = await connection.query(sql, [id]);
                        const response = {
                            Notification: result
                        };
                        return res.status(200).json(response);
                    } else {
                        let sql1 = `SELECT N.NotificationID, N.NotificationText,
                                    DATE(N.DateSent) AS Date, TIME(N.DateSent) AS Time,
                                    N.Type, U.UserID, CONCAT(U.FirstName, ' ', U.LastName) AS UserName
                                    FROM NOTIFICATION N
                                    INNER JOIN USERS U ON N.UserID = U.UserID`;
                
                        [result] = await connection.query(sql1);
                
                        let sql2 = `SELECT N.NotificationID, N.NotificationText,
                                    DATE(N.DateSent) AS Date, TIME(N.DateSent) AS Time,
                                    N.Type, UN.UniversityID, UN.UniversityName
                                    FROM NOTIFICATION N
                                    INNER JOIN UNIVERSITY UN ON N.adminID = UN.UniversityID`;
                
                        let result2;
                        [result2] = await connection.query(sql2);
                
                        // Merge the results and sort by NotificationID
                        let combinedResults = [...result, ...result2].sort((a, b) => a.NotificationID - b.NotificationID);
                
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
                            DATE(P.PaymentDate) AS Date, P.PaymentStatus,
                            U.UserID, CONCAT(U.FirstName, ' ', U.LastName) AS UserName,
                            V.VendorID, V.VendorName
                        FROM PAYMENT P
                        INNER JOIN USERS U ON P.UserID = U.UserID
                        INNER JOIN VENDOR V ON U.VendorID = V.VendorID
                        WHERE P.PaymentID = ?

                    ` : `
                        SELECT P.PaymentID, P.Amount,
                            DATE(P.PaymentDate) AS Date, P.PaymentStatus,
                            U.UserID, CONCAT(U.FirstName, ' ', U.LastName) AS UserName,
                            V.VendorID, V.VendorName
                        FROM PAYMENT P
                        INNER JOIN USERS U ON P.UserID = U.UserID
                        INNER JOIN VENDOR V ON U.VendorID = V.VendorID
                    `;
                
                    // Execute the query
                    [result] = await connection.query(sql, id ? [id] : []);
                
                    // Calculate the counts for each notification type
                    const PaymentCounts = result.reduce((counts, payment) => {
                        const status = payment.PaymentStatus.toLowerCase();
                        counts[status] = (counts[status] || 0) + 1;
                        return counts;
                    }, {});
                
                    // Construct the response
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
