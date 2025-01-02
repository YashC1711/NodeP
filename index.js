const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const PORT = 8000;

//connection
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log("Mongo Error", err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
