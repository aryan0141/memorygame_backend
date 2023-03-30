const express = require("express");
const router = express();
const Leaderboard = require("../models/Leaderboard");
const auth = require("../middleWare/auth");

// Get the leaderboard
router.get("/getLeaderboard", auth, async (req, res) => {
  try {
    const data = await Leaderboard.find();
    return res.status(200).json({ data, status: 200 });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err });
  }
});

// Post inside the leaderboard
router.post("/addLeaderboard", auth, async (req, res) => {
  try {
    const { time, moves } = req.body;
    const NewLeaderboard = new Leaderboard({
      user: req.user._id,
      name: req.user.name,
      moves,
      time,
    });
    await NewLeaderboard.save();
    return res.status(201).json({ NewLeaderboard, status: 201 });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
