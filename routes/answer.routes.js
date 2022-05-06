const router = require("express").Router();
const AnswerModel = require("../models/Answer.model");
const UserModel = require("../models/User.model");
const TopicModel = require("../models/Topic.model");

//"C"RUD

router.post("/create-answer/:topicId/:userId", async (req, res) => {
  try {
    const createdAnswer = AnswerModel.create({
      ...req.body,
      owner: req.params.userId,
      refTopic: req.params.topicId,
    });

    await UserModel.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { userAnswers: createdAnswer._id } },
      { runValidators: true }
    );

    await TopicModel.findOneAndUpdate(
      { _id: req.params.topicId },
      { $push: { answers: createdAnswer._id } },
      { runValidators: true }
    );

    return res.status(201).json(createdAnswer);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
