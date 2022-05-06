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
    const getTopic = await TopicModel.findOne({ _id: req.params.topicId });

    if (getTopic.owner.toString() !== req.params.userId) {
      return res
        .status(401)
        .json({ msg: "Você não tem permissão para excluir esse topico" });
    }

    const deletedTopic = await TopicModel.deleteOne({
      _id: req.params.topicId,
    });

    await UserModel.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { userTopics: req.params.topicId } }
    );

    return res.status(200).json(deletedTopic);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// CR"U"D

router.patch("/edit-topic/:topicId/:userId", async (req, res) => {
  try {
    const { topicId, userId } = req.params;
    const getTopic = await TopicModel.findOne({ _id: topicId });

    if (getTopic.owner.toString() !== userId) {
      return res
        .status(401)
        .json({ msg: "Você não tem permissão para excluir esse topico" });
    }

    const updateTopic = await TopicModel.findOneAndUpdate(
      { _id: topicId },
      { ...req.body },
      { runValidators: true, new: true }
    );

    return res.status(200).json(updateTopic);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET ALL TOPICS

router.get("/all-topics", async (req, res) => {
  try {
    const allTopics = await TopicModel.find();

    return res.status(200).json(allTopics);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET TOPICS BY CATEGORIA

router.get("/topics/:categoria", async (req, res) => {
  try {
    const topicsByCategoria = await TopicModel.find({
      categoria: req.params.categoria,
    });

    return res.status(200).json(topicsByCategoria);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
