const User = require("../models/user")

async function handleGetAllUser (req,res){
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById (req,res){
    const user = await User.findById(req.params.id);
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
}

async function handleUpdateUserById (req,res){
    await User.findByIdAndUpdate(req.params.id, {
        last_name: "yz",
      });
  
      return res.json({
        Status: "Succss",
      });
}

async function handleDeleteUserById (req,res){
    await User.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ msg: `succesfully deleted ${req.params.id}` });
}

async function handleCreateUserById (req,res){
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
  return res.status(201).json({ msg: "Success" ,id: result._id});
}

module.exports = {
    handleGetAllUser,handleGetUserById,handleUpdateUserById,handleDeleteUserById,handleCreateUserById
}