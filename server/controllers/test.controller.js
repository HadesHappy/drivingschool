const Test = require("../models/Test")
const History = require('../models/History')
const User = require('../models/User')

const readTodoStudyProblems = async (req, res) => {
  try {
    const test = await Test.findOne({ _id: req.params.id })
    let datas = test.problems
    const historyData = await History.find({ id: req.params.id, category: 'todotest' })
    let studyData = []
    if (historyData.length) {
      const totalUsers = historyData.length
      for (let i = 0; i < datas.length; i++) {
        let histories = [{
          choice: 'choice1',
          userNum: 0,
          users: [],
          images: [],
          percentage: 0,
        }, {
          choice: 'choice2',
          userNum: 0,
          users: [],
          images: [],
          percentage: 0,
        }, {
          choice: 'choice3',
          userNum: 0,
          users: [],
          images: [],
          percentage: 0,
        }, {
          choice: 'choice4',
          userNum: 0,
          users: [],
          images: [],
          percentage: 0,
        }]
        for (let j = 0; j < totalUsers; j++) {
          const choice = historyData[j].choices[i].choice
          const num = choice.slice(6, 7)
          const userName = historyData[j].user
          const user = await User.findOne({ name: userName })
          const image = user.image
          if (!histories[Number(num) - 1].users.includes(userName)) {
            histories[Number(num) - 1].users.push(userName)
            histories[Number(num) - 1].images.push(image)
          }
          histories[Number(num) - 1].userNum++
          histories[Number(num) - 1].percentage = Math.floor(histories[Number(num) - 1].userNum / totalUsers * 100)
        }
        let newData = {
          title: datas[i].title,
          image: datas[i].image,
          choice1: datas[i].choice1,
          choice2: datas[i].choice2,
          choice3: datas[i].choice3,
          choice4: datas[i].choice4,
          answer: datas[i].answer,
          tema: datas[i].tema,
          category: datas[i].category,
          video: datas[i].video,
          difficulty: datas[i].difficulty,
          history: histories
        }
        studyData.push(newData)
      }
    }
    else {
      for (let i = 0; i < datas.length; i++) {
        let newData = {
          title: datas[i].title,
          image: datas[i].image,
          choice1: datas[i].choice1,
          choice2: datas[i].choice2,
          choice3: datas[i].choice3,
          choice4: datas[i].choice4,
          answer: datas[i].answer,
          tema: datas[i].tema,
          category: datas[i].category,
          video: datas[i].video,
          difficulty: datas[i].difficulty,
        }
        studyData.push(newData)
      }
    }
    res.status(200).send(studyData)
  }
  catch (error) {
    res.status(403).send(error)
  }
}

const readbyName = async (req, res) => {
  try {
    const name = req.params.name
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

      const myHistories = await History.find({ test: groups[i].no, category: name, user: myName }, {}, { sort: { 'createdAt': -1 } })
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

const testData = async (id, name) => {
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
  return datas
}

const readbyNameAndId = async (req, res) => {
  try {
    const id = req.params.id - 1
    const name = req.params.name
    const datas = await testData(id, name)
    res.status(200).send(datas)
  }
  catch (error) {
    res.status(401).send(error)
  }
}

const readStudyByNameAndId = async (req, res) => {
  try {
    const id = req.params.id - 1
    const name = req.params.name
    let datas = await testData(id, name)
    const historyData = await History.find({ test: req.params.id, category: name })
    let studyData = []
    if (historyData.length) {
      const totalUsers = historyData.length
      for (let i = 0; i < datas.length; i++) {
        let histories = [{
          choice: 'choice1',
          userNum: 0,
          users: [],
          images: [],
          percentage: 0,
        }, {
          choice: 'choice2',
          userNum: 0,
          users: [],
          images: [],
          percentage: 0,
        }, {
          choice: 'choice3',
          userNum: 0,
          users: [],
          images: [],
          percentage: 0,
        }, {
          choice: 'choice4',
          userNum: 0,
          users: [],
          images: [],
          percentage: 0,
        }]
        for (let j = 0; j < totalUsers; j++) {
          const choice = historyData[j].choices[i].choice
          const num = choice.slice(6, 7)
          const userName = historyData[j].user
          const user = await User.findOne({ name: userName })
          const image = user.image
          if (!histories[Number(num) - 1].users.includes(userName)) {
            histories[Number(num) - 1].users.push(userName)
            histories[Number(num) - 1].images.push(image)
          }
          histories[Number(num) - 1].userNum++
          histories[Number(num) - 1].percentage = Math.floor(histories[Number(num) - 1].userNum / totalUsers * 100)
        }
        let newData = {
          title: datas[i].title,
          image: datas[i].image,
          choice1: datas[i].choice1,
          choice2: datas[i].choice2,
          choice3: datas[i].choice3,
          choice4: datas[i].choice4,
          answer: datas[i].answer,
          tema: datas[i].tema,
          category: datas[i].category,
          video: datas[i].video,
          difficulty: datas[i].difficulty,
          history: histories
        }
        studyData.push(newData)
      }
    }
    else {
      for (let i = 0; i < datas.length; i++) {
        let newData = {
          title: datas[i].title,
          image: datas[i].image,
          choice1: datas[i].choice1,
          choice2: datas[i].choice2,
          choice3: datas[i].choice3,
          choice4: datas[i].choice4,
          answer: datas[i].answer,
          tema: datas[i].tema,
          category: datas[i].category,
          video: datas[i].video,
          difficulty: datas[i].difficulty,
        }
        studyData.push(newData)
      }
    }
    res.status(200).send(studyData)
  }
  catch (error) {
    res.status(403).send(error)
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
      const myHistories = await History.find({ id: tests[i].id, category: 'todotest', user: name }, {}, { sort: { 'createdAt': -1 } })
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

const readLiveResults = async (req, res) => {
  try {
    const id = req.params.id
    const name = req.params.name
    let datas
    if (name === 'todotest')
      datas = await History.find({ id: id, category: name, examType: 'study' }, {}, { sort: { 'createdAt': -1 } })
    else
      datas = await History.find({ test: id, category: name, examType: 'study' }, {}, { sort: { 'createdAt': -1 } })
    let results = []
    if (datas.length) {
      let count = datas.length
      if (datas.length > 10) {
        count = 10
      }
      for (let i = 0; i < count; i++) {
        const userName = datas[i].user
        const user = await User.findOne({ name: userName })
        const image = user.image
        let data = {
          name: userName,
          image: image,
          isPass: datas[i].isPass,
          incorrect: datas[i].falseNum,
          video: datas[i].videoNum,
          time: datas[i].createdAt,
        }
        results.push(data)
      }
    }
    res.status(200).send(results)
  }
  catch (error) {
    res.status(403).send(error)
  }
}

module.exports = {
  readTodoStudyProblems,
  readTodoTest,
  readbyNameAndId,
  readStudyByNameAndId,
  readbyName,
  readLiveResults,
}