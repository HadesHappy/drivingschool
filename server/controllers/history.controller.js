const History = require("../models/History");
const Test = require("../models/Test")

const saveHistory = async(req, res) => {
  const data = req.body
  console.log(data)
  res.json('hi')
}

module.exports = {
  saveHistory,
}