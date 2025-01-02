const express = require("express");
const router = express.Router();

// router.get("/", async (req, res) => {
//   const allDbUsers = await User.find({});
//   const html = `
//           <ul>
//               ${allDbUsers
//                 .map((user) => `<li>${user.first_name} - ${user.email}</li>`)
//                 .join("")}
//           </ul>
//       `;
//   return res.send(html);
// });

router.get("/", async (req, res) => {
  const allDbUsers = await User.find({});

  return res.json(allDbUsers);
});

router
  .route("/:id")
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

router.post("/", async (req, res) => {
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

module.exports = router;
