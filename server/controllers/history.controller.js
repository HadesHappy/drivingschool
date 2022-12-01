const History = require("../models/History");
const Test = require("../models/Test")

const saveHistory = async(req, res) => {
  try{
    let history = req.body
    history = { user: req.auth.name, ...history }
    const newHistory = new History(history);
    await newHistory.save()
    res.status(200).send('success')
  }
  catch(error){
    res.status(403).send(error)
  }
}

module.exports = {
  saveHistory,
}