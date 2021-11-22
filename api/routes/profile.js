const User = require("../models/User");
const mongoose = require("mongoose");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

mongoose.Types.ObjectId.isValid;

const { findOneAndDelete } = require("../models/User");
const { Mongoose } = require("mongoose");
router.put("/:id", async (req, res) => {
  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Account has been updated");
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
