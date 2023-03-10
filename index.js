const express = require('express');
const app =  express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();



// Database connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser : true}).then(() => console.log('DB connected'));

mongoose.connection.on("error", err =>{
    console.log(`DBcd  connection error: ${err.message}`)
});


// Bring in routes
const attendeeRoutes = require("./routes/attendee");
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/event");


//middleware
app.use(express.json());

app.use("/", attendeeRoutes);
app.use("/", authRoutes);
app.use("/", eventRoutes);

app.get ("/", (req, res) =>{
    res.send("Event Management System");
});

const port = process.env.PORT || 8002;
app.listen(port, ()=> { 
    console.log ( `A Node JS API is listening on port : ${port}`)
}); 