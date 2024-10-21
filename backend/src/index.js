// index.js
import dotenv from 'dotenv';
dotenv.config(); // Ensure this is loading the .env variables correctly

import { app } from './app.js';
import connection from './db/index.js'; 

// Use PORT from environment variable
const PORT = process.env.PORT || 3000;

app.on("error", (error) => {
  console.log("Error in app", error);
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error occurred while starting the server: ${err.message}`);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
