const History = require("../models/History");
const User = require("../models/User")

const saveHistory = async(req, res) => {
  try{
    let history = req.body
    const user = await User.findOne({ name: req.auth.name })
    history = { user: req.auth.name, image: user.image, ...history }
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