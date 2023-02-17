require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const projectROutes = require("./routes/projectRoute");
//express app
const app = express();

//port
const port = process.env.PORT || 4000;

//middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);

  next();
});

//routes
app.use("/api/projects", projectROutes);

//mongodb
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    //listen for request
    app.listen(port, () => {
      console.log(`connected to mongo and Listening on port ${port} `);
    });
  })
  .catch((err) => {
    console.log(err);
  });
