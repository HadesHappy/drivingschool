const History = require("../models/History");
const Test = require("../models/Test")

const saveHistory = async(req, res) => {
  let history = req.body
  history = {user: req.auth.name, ...history}
  const newHistory = new History(history);
  console.log('newHistory: ', newHistory)
  await newHistory.save()
  res.status(200).send('hi')
}

module.exports = {
  saveHistory,
}