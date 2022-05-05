const { Schema, model, default: mongoose } = require("mongoose");

const answersSchema = new Schema({
  title: { type: String, maxlength: 280 },
  body: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, ref: "User" },
  refTopic: { type: mongoose.Types.ObjectId, ref: "Topic" },
});

const AnswerModel = model("Answer", answersSchema);

module.exports = AnswerModel;
