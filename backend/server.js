const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();


// Middleware
app.use(express.json());
app.use(cors());

// Import Routes
const authRoute = require("./routes/auth");
const studentRoute = require("./routes/student");

// Debug logs
console.log("Auth Route:", authRoute);
console.log("Student Route:", studentRoute);

// Use Routes
app.use("/api/auth", authRoute);
app.use("/api/student", studentRoute);

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Failed to connect to MongoDB", error);
      process.exit(1); // Exit the process if the database connection fails
    }
  };


  const documentRoute = require("./routes/document");

   app.use("/api/document", documentRoute);   
  
  connectDB(); // Call the function to connect to the database
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
