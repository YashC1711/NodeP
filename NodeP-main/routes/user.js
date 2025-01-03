const express = require("express");
const {handleGetAllUser,handleGetUserById,handleUpdateUserById,handleDeleteUserById,handleCreateUserById} = require("../controllers/user")
const router = express.Router();

router
.route("/")
.get(handleGetAllUser)
.post(handleCreateUserById)
router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;


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