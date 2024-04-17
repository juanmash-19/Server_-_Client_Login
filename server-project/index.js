const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import routes
const addressRoutes = require("./routes/address");
const userRoutes = require("./routes/user_routes");
const superheroRoutes = require("./routes/superhero_routes");

const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3001;
// Midelware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// http://localhost:3001/

// http://localhost:3001/api/v1/users/new-user
app.use("/api/v1/users", userRoutes);

// http://localhost:3001/api/v1/superheros/new-superheroe
app.use("/api/v1/superheros", superheroRoutes);

// http://localhost:3001/api/v1/address/new-address
app.use("/api/v1/address", addressRoutes);

// Connect to MongoDB
const getConnection = async () => {
    try { 
        const conn = await mongoose.connect(process.env.MONGO_DB_CONNECTION);
    if (conn) {
        console.log(`MongoDB Connected on ${conn.connection.host}`);
    } else {
        console.log("Failed to connect DB");
    }
    app.listen(PORT, () => console.log("Server is running in port", PORT));
    } catch (error) {
    console.log(`Failed with error: ${error.message}`);
    }
};

getConnection();