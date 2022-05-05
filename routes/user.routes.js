const router = require("express").Router();
const UserModel = require("../models/User.model");

// "C"RUD

router.post("/signup", async (req, res) => {
  try {
    const createdUser = await UserModel.create(req.body);
    return res.status(201).json(createdUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// C"R"UD

router.get("/profile/:userId", async (req, res) => {
  try {
    const foundedUser = await UserModel.findOne({ _id: req.params.userId });
    return res.status(200).json(foundedUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// CR"U"D

router.patch("/update-profile/:userId", async (req, res) => {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: req.params.userId },
      { ...req.body },
      { runValidators: true, new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
