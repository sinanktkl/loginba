require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Routes = require("./Routes/route");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// Routes
app.use(Routes);

// DB connection + start server 
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
    app.get('/',(req,res)=>{
      res.send(`appserver Running Successfully in ${process.env.PORT}`)
  })
  })
  .catch((err) => console.error("DB Connection Error:", err));

 
 
