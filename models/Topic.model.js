const { Schema, model, default: mongoose } = require("mongoose");

const topicSchema = new Schema({
  title: { type: String, minlength: 1, maxlength: 280, required: true },
  body: { type: String, minlength: 1, required: true },
  owner: { type: mongoose.Types.ObjectId, ref: "User" },
  categoria: {
    type: String,
    enum: ["State", "Hooks", "Components", "Effect", "Props"],
  },
  answers: [{ type: mongoose.Types.ObjectId, ref: "Answer" }],
});

const TopicModel = model("Topic", topicSchema);

module.exports = TopicModel;
