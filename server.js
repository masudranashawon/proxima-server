require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const projectRoutes = require("./routes/projectRoute");
const userRoutes = require("./routes/userRoute");
const healthRoute = require("./routes/healthRoute");

//Express App
const app = express();

//Port
const port = process.env.PORT || 4000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.use("/api/health", healthRoute);
app.use("/api/projects", projectRoutes);
app.use("/api/user", userRoutes);

//Mongodb
mongoose.set("strictQuery", false); //optional
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //Listening for request
    app.listen(port, () => {
      console.log(`Connected to moggo Listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
