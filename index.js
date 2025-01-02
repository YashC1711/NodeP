const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fs = require("fs");
const PORT = 8000;

//connection
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log("Mongo Error", err));

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    job_title: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
        <ul>
            ${allDbUsers
              .map((user) => `<li>${user.first_name} - ${user.email}</li>`)
              .join("")}
        </ul>
    `;
  return res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});

  return res.json(allDbUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
      last_name: "yz",
    });

    return res.json({
      Status: "Succss",
    });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json({ msg: `succesfully deleted ${req.params.id}` });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });

  console.log(result);
  return res.status(201).json({ msg: "Success" });
});

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
