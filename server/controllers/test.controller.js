const Test = require("../models/Test")
const History = require('../models/History')
const User = require('../models/User')

const details = async (req, res) => {
  try {
    let query = Question.find();

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await Question.countDocuments();

    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize);

    if (page > pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }
    const result = await query;
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
}

const addTest = async (req, res) => {
  try {
    const total = req.body.total;
    let newProblems = []
    for (let i = 0; i < total; i++) {
      const newQuestion = {
        title: req.body[`title${i}`],
        image: req.body[`image${i}`],
        choice1: req.body[`choice1${i}`],
        choice2: req.body[`choice2${i}`],
        choice3: req.body[`choice3${i}`],
        choice4: req.body[`choice4${i}`],
        answer: req.body[`answer${i}`],
        killertest: req.body[`killertest${i}`],
        gemela: req.body[`gemela${i}`],
        newpregunta: req.body[`newpregunta${i}`],
        tema: req.body[`tema${i}`],
        category: req.body[`category${i}`],
        video: req.body[`video${i}`],
        difficulty: req.body[`difficulty${i}`],
      }
      newProblems.push(newQuestion)
    }
    const newTest = new Test({
      total: total,
      problems: newProblems
    })
    await newTest.save()
    res.status(200).send('Test saved successfully.')
  }
  catch (error) {
    res.status(400).send('Error while saving test. Try again later.')
  }
}

const readTests = async (req, res) => {
  try {
    const tests = await Test.find();
    let data = []
    for (let i = 0; i < tests.length; i++) {
      data[i] = {
        id: tests[i].id,
        total: tests[i].total,
      }
    }
    res.status(200).send(data)
  }
  catch (error) {
    res.status(401).send(error)
  }
}

const updateTest = async (req, res) => {
  try {
    const total = req.body.total
    let test = await Test.findOne({ _id: req.params.id })
    let newProblems = []
    for (let i = 0; i < total; i++) {
      const newQuestion = {
        title: req.body[`title${i}`],
        image: req.body[`image${i}`],
        choice1: req.body[`choice1${i}`],
        choice2: req.body[`choice2${i}`],
        choice3: req.body[`choice3${i}`],
        choice4: req.body[`choice4${i}`],
        answer: req.body[`answer${i}`],
        killertest: req.body[`killertest${i}`],
        gemela: req.body[`gemela${i}`],
        newpregunta: req.body[`newpregunta${i}`],
        tema: req.body[`tema${i}`],
        category: req.body[`category${i}`],
        video: req.body[`video${i}`],
        difficulty: req.body[`difficulty${i}`],
      }
      newProblems.push(newQuestion)
    }
    test.total = total
    test.problems = newProblems
    await test.save()
    res.status(200).send('Test saved successfully.')

  }
  catch (error) {
    res.status(401).send(error)
  }
}

const deleteTest = async (req, res) => {
  try {
    await Test.deleteOne({ _id: req.params.id })
    res.status(200).send('Successfully Deleted.')
  }
  catch (error) {
    res.status(401).send(error)
  }
}

const readTodoTestProblems = async (req, res) => {
  try {
    let test = await Test.findOne({ _id: req.params.id })
    const problems = test.problems
    res.status(200).send(problems)
  }
  catch (error) {
    res.status(400).send(error)
  }
}

const readbyName = async (req, res) => {
  try {
    const name = req.params.name
    console.log(name)
    const myName = req.auth.name
    const tests = await Test.find()
    let questions = []
    for (let i = 0; i < tests.length; i++) {
      let problems = tests[i].problems
      if (name.startsWith('category')) {
        problems = problems.filter(problem => problem.category === name)
      }
      else
        problems = problems.filter(problem => problem[name] === true)
      if (!problems.length) {
      }
      else {
        questions.push(problems)
      }
    }
    let length = questions.length
    let groups = [];
    // length is the total length which the name is category or specific condition is satisfied.
    if (length > 30) {
      for (let i = 0; i < Math.floor(length / 30); i++) {
        groups.push({
          no: i + 1,
          count: 30
        })
      }
    }

    if (length !== 0 && length % 30 !== 0) {
      groups.push({
        no: groups.length + 1,
        count: length % 30
      })
    }

    let datas = []
    for (let i = 0; i < groups.length; i++) {
      let newItem = {}
      newItem.id = groups[i].no
      const histories = await History.find({ test: groups[i].no, category: name }, {}, { sort: { 'createdAt': -1 } })
      if (histories.length) {
        let users = []
        let images = []
        for (let j = 0; j < histories.length; j++) {
          if (!users.includes(histories[j].user)) {
            users.push(histories[j].user)
            const user = await User.findOne({ name: histories[j].user })
            images.push(user.image)
          }
          newItem.totalUsers = users.length
          newItem.users = users
          newItem.images = images
        }
      }

      const myHistories = await History.find({ test: groups[i].no, category: name, user: myName, examType: 'exam' }, {}, { sort: { 'createdAt': -1 } })
      if (myHistories.length) {
        newItem.latestTime = myHistories[0].createdAt
        let length = myHistories.length < 3 ? myHistories.length : 3
        let results = []
        for (let j = 0; j < length; j++) {
          let result = {}
          result.isPass = myHistories[j].isPass
          result.falseNum = myHistories[j].falseNum
          results.push(result)
        }
        newItem.results = results
      }
      datas.push(newItem)
    }
    res.status(200).send(datas);
  }
  catch (error) {
    res.status(401).send(error)
  }
}

const readbyNameAndId = async (req, res) => {
  try {
    const id = req.params.id - 1
    const name = req.params.name
    console.log(id, name)
    const tests = await Test.find();
    let questions = [];
    for (let i = 0; i < tests.length; i++) {
      for (let j = 0; j < tests[i].problems.length; j++) {
        if (name.startsWith('category')) {
          if (tests[i].problems[j].category === name)
            questions.push(tests[i].problems[j])
        }
        else {
          if (tests[i].problems[j][name] === true) {
            questions.push(tests[i].problems[j])
          }
        }
      }
    }
    let datas = []
    for (let i = 0; i < 30; i++) {
      let iid = 30 * id + i
      if (questions.length == iid) break
      datas = [...datas, questions[iid]]
    }
    console.log('datas: ', datas)
    res.status(200).send(datas)
  }
  catch (error) {
    res.status(401).send(error)
  }
}

const readTodoTest = async (req, res) => {
  try {
    const name = req.auth.name
    const tests = await Test.find()
    let data = []

    for (let i = 0; i < tests.length; i++) {
      let newItem = {}
      newItem.id = tests[i].id
      const histories = await History.find({ id: tests[i].id, category: 'todotest' }, {}, { sort: { 'createdAt': -1 } })
      if (histories.length) {
        let users = []
        let images = []
        for (let j = 0; j < histories.length; j++) {
          if (!users.includes(histories[j].user)) {
            users.push(histories[j].user)
            const user = await User.findOne({ name: histories[j].user })
            images.push(user.image)
          }
          newItem.totalUsers = users.length
          newItem.users = users
          newItem.images = images
        }
      }
      const myHistories = await History.find({ id: tests[i].id, category: 'todotest', user: name, examType: 'exam' }, {}, { sort: { 'createdAt': -1 } })
      if (myHistories.length) {
        newItem.latestTime = myHistories[0].createdAt
        let length = myHistories.length < 3 ? myHistories.length : 3
        let results = []
        for (let j = 0; j < length; j++) {
          let result = {}
          result.isPass = myHistories[j].isPass
          result.falseNum = myHistories[j].falseNum
          results.push(result)
        }
        newItem.results = results
      }
      data.push(newItem)
    }
    res.status(200).send(data)
  }
  catch (error) {
    res.status(403).send(error)
  }
}

module.exports = {
  details,
  addTest,
  readTests,
  readTodoTestProblems,
  updateTest,
  deleteTest,
  readTodoTest,
  readbyNameAndId,
  readbyName,
}