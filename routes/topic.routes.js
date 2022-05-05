const router = require("express").Router();
const TopicModel = require("../models/Topic.model");
const UserModel = require("../models/User.model");

// "C"RUD

router.post("/create-topic/:userId", async (req, res) => {
  try {
    const createdTopic = await TopicModel.create({
      ...req.body,
      owner: req.params.userId,
    });

    const foundedUser = await UserModel.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { userTopics: createdTopic._id } },
      { runValidators: true, new: true }
    );

    return res.status(200).json(createdTopic);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.delete("/delete-topic/:topicId/:userId", async (req, res) => {
  try {
    const deletedTopic = await TopicModel.deleteOne({
      _id: req.params.topicId,
    });

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: req.params.userId },
      { $pullAll: { userTopics: [req.params.topicId] } }
    );

    return res.status(200).json(deletedTopic);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
