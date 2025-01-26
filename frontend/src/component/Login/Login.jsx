import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import useApi from "../../hooks/useApi";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../redux/slices/userData/index.js";
import { setAdminData } from "../../features/adminSlice";
import { VENDOR_ENDPOINTS,USER_ENDPOINTS,ADMIN_ENDPOINTS } from "../../config/config";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const check = useSelector((state)=>state.user)
  console.log("fom redux:",check)
  // const adminData = useSelector((state)=>state.admin)
  // console.log(adminData)
  
  const [alert,setAlert] = useState({message:"",severity:"",open:false})
  const handleCloseAlert= () =>{
    setAlert({...alert,open:false})
  }
  const { response, loading, error, sendData } = useApi();
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
    Role: "",
  });
  //for role based API calling
  const roleApiMapping = {
    admin:ADMIN_ENDPOINTS.ADMIN_LOGIN,
    vendor:VENDOR_ENDPOINTS.VENDOR_LOGIN,
    // user:USER_ENDPOINTS.USER_LOGIN,
    student:USER_ENDPOINTS.STUDENT_LOGIN,
    faculty:USER_ENDPOINTS.FACULTY_LOGIN,
  } 
  const emailPattern = /^[a-zA-Z0-9._%+-]+@nu\.edu\.pk$/;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailPattern.test(formData.Email)) {
      setAlert({ message: "Please enter a valid email (e.g., xyz@nu.edu.pk)", severity: "error", open: true });
      return;
    }
    if(!roleApiMapping[formData.Role]){
      setAlert({ message: "Invalid Role Selected!", severity: "error", open: true });
      return;
    }
    const data = {
      Email:formData.Email,
      Password:formData.Password,
      Role:formData.Role,
    }
    try {
      //two api want role , two dont , a bit mix up but sending these 3 info to all
      const responseData = await sendData(roleApiMapping[data.Role],"POST",data)
      console.log(responseData.data)
      if(responseData.error){
        setAlert({ message: responseData.error || 'Incorrect Password or Email', severity: "error", open: true });
      }else{
        setAlert({ message: `You have logged in successfully as ${data.Email}`, severity: "success", open: true });
        dispatch(setData({payload:responseData.data}))
        //checking if redux is setup properly
        
      }

    } catch (err) {
      setAlert({ message: err.message, severity: "error", open: true });
    } finally{
      // navigate(`/${data.Role == 'student'||data.Role == 'faculty'? 'user': data.Role}`)
    }

  };

  return (
    <div className="flex h-full min-h-screen flex-col lg:flex-row ">
      <div className="bg-gray-950 text-gray-200 px-6 py-12 w-full lg:w-1/2 lg:px-10 lg:py-20 font-electrolize">
        <p className="my-2 text-7xl font-extrabold tracking-wider">FAST</p>
        <p className="font-bold text-5xl">Transit</p>
        <p className="mt-32 font-bold text-5xl text-yellow-500">
          <Typewriter
            words={["Continue your journey with us"]}
            loop={false}
            cursor
            cursorStyle="_"
            typeSpeed={200}
            deleteSpeed={150}
            delaySpeed={1000}
          />
        </p>
        <p className="mt-4 text-yellow-700 font-semibold text-2xl">
          Join the community that moves forward fast!
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg px-6 py-12 lg:w-1/2 lg:py-10 m-auto font-zendot"
      >
        <h2 className="mb-2 text-3xl font-bold">Sign In</h2>
        <a
          href="http://localhost:5173/register"
          className="mb-4 block font-bold text-gray-400 hover:text-gray-800"
        >
          Don't have an account?
        </a>

        <p className="mb-2 font-medium text-black">Are you a?</p>
        <div className="mb-2 flex flex-col gap-4 sm:flex-row">
          <select
            name="Role"
            value={formData.Role}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 rounded-md"
            required
          >
            <option value="">Please select from dropdown</option>

            {
              Object.keys(roleApiMapping).map((role)=>{
                return  <option key={role} value={role}>{role}</option>
              })
            }
          </select>
        </div>
        <input
          type="email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-2 border-2 rounded-md"
          placeholder="Email (e.g., abc@nu.edu.pk)"
          required
        />
        <input
          type="password"
          name="Password"
          value={formData.Password}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-2 border-2 rounded-md"
          placeholder="Password"
          required
        />

        <button
          type="submit"
          className={`w-full px-8 py-3 ${
            loading ? "bg-gray-400" : "bg-gray-300 hover:bg-gray-400"
          } rounded font-bold text-gray-900`}
          disabled={loading}
        >
          {loading ? "Logging In..." : "Sign In"}
        </button>
      </form>
      {/* Snackbar Alert */}
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity={alert.severity} onClose={handleCloseAlert} className="w-full max-w-md mx-auto text-sm sm:text-base font-medium text-center p-4">
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
