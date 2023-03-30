const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const Leaderboard = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    default: "NoUser",
  },
  moves: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("leaderboard", Leaderboard);
