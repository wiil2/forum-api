const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 144 },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 1,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
  },
  userTopics: [{ type: mongoose.Types.ObjectId, ref: "Topic" }],
  userAnswers: [{ type: mongoose.Types.ObjectId, ref: "Answer" }],
});

const UserModel = model("User", userSchema);

module.exports = UserModel;
