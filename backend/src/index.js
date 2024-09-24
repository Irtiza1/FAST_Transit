import dotenv from 'dotenv'
dotenv.config({
    path:'./.env'
})
import { app } from './app.js'
import connection from './db/index.js' //connect to db 


const PORT = process.env.PORT || 3000;
app.on("error",(error)=>{
    console.log("Error in app",error);
})
app.listen(PORT, (err) => {
    if (err) {
      console.error(`Error occurred while starting the server: ${err.message}`);
    } else {
      console.log(`Server is running on port ${PORT}`);
    }
  });