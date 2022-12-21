const Test = require("../models/Test")
const History = require('../models/History')
const User = require('../models/User')
const Visit = require('../models/Visit')
const { categories } = require('../utils/constants')

const testProblems = async (id, category) => {
  try {
    const tests = await Test.find();
    let problems = [];
    for (let i = 0; i < tests.length; i++) {
      for (let j = 0; j < tests[i].problems.length; j++) {
        if (category.startsWith('category')) {
          if (tests[i].problems[j].category === category)
            problems.push(tests[i].problems[j])
        }
        else {
          if (tests[i].problems[j][category] === true) {
            problems.push(tests[i].problems[j])
          }
        }
      }
    }
    let datas = []
    for (let i = 0; i < 30; i++) {
      let iid = 30 * (id - 1) + i
      if (problems.length == iid) break
      datas = [...datas, problems[iid]]
    }
    return datas
  }
  catch (error) {
    return []
  }
}

const readTestData = async (req, res) => {
  try {
    const category = req.params.category
    const name = req.auth.name
    const tests = await Test.find()
    let length = 0  // Number of Tests
    if (category === 'todotest')
      length = tests.length
    else {
      let totalProblems = []
      for (let i = 0; i < tests.length; i++) {
        let problems = []
        if (category.startsWith('category'))
          problems = tests[i].problems.filter(problem => problem.category === category)
        else
          problems = tests[i].problems.filter(problem => problem[category] === true)

        if (problems.length) {
          for (let j = 0; j < problems.length; j++)
            totalProblems.push(problems[j])
        }
      }
      if (totalProblems.length)
        length = Math.floor(totalProblems.length / 30) + 1
    }
    let datas = [] // response data
    // Get Participants and User History
    for (let i = 0; i < length; i++) {
      let newItem = {}
      let histories
      let myHistories

      if (category === 'todotest') {
        newItem.id = tests[i].id
        newItem.num = i + 1
        histories = await History.find({ id: tests[i].id, category: category }, {}, { sort: { 'createdAt': -1 } })
        myHistories = await History.find({ id: tests[i].id, category: category, name: name }, {}, { sort: { 'createdAt': -1 } })

        // Visit
        let visits = await Visit.findOne({ category: 'todotest', id: tests[i].id })
        if (visits) {
          if (visits.visitors.includes(name))
            newItem.visited = true
          else {
            newItem.visited = false
            let newVisitor = []
            for (let k = 0; k < visits.visitors.length; k++) {
              newVisitor.push(visits.visitors[k])
            }
            newVisitor.push(name);
            await Visit.updateOne({ category: 'todotest', id: tests[i].id }, { visitors: newVisitor })
          }
        }
        else {
          newItem.visited = false
          let newVisitor = []
          newVisitor.push(name)

          const newVisit = new Visit({
            category: 'todotest',
            id: tests[i].id,
            visitors: newVisitor
          })
          await newVisit.save()
        }
      }
      else {
        newItem.id = i + 1
        histories = await History.find({ test: i + 1, category: category }, {}, { sort: { 'createdAt': -1 } })
        myHistories = await History.find({ test: i + 1, category: category, name: name }, {}, { sort: { 'createdAt': -1 } })
        // Visit
        const visits = await Visit.findOne({ category: category, id: i + 1 })
        if (visits) {
          if (visits.visitors.includes(name))
            newItem.visited = true
          else {
            newItem.visited = false
            let newVisitor = []
            for (let k = 0; k < visits.visitors.length; k++)
              newVisitor.push(visits.visitors[k])
            newVisitor.push(name);
            await Visit.updateOne({ category: category, id: i + 1 }, { visitors: newVisitor })
          }
        }
        else {
          newItem.visited = false
          let newVisitor = []
          newVisitor.push(name)
          const newVisit = new Visit({
            category: category,
            id: i + 1,
            visitors: newVisitor
          })
          await newVisit.save()
        }
      }

      // Get Participants
      if (histories.length) {
        let users = []
        let images = []
        for (let j = 0; j < histories.length; j++) {
          if (!users.includes(histories[j].name)) {
            users.push(histories[j].name)
            images.push(histories[j].image)
          }
        }
        newItem.totalUsers = users.length
        newItem.users = users
        newItem.images = images
      }

      // Get User History
      if (myHistories.length) {
        newItem.latestTime = myHistories[0].createdAt
        let length = myHistories.length < 3 ? myHistories.length : 3
        let results = []
        for (let j = 0; j < length; j++) {
          let result = {}
          result.isPass = myHistories[j].isPass
          result.falseNum = myHistories[j].falseNum
          result.type = myHistories[j].examType
          results.push(result)
        }
        newItem.results = results
      }
      datas.push(newItem)
    }
    res.status(200).send(datas)
  }
  catch (error) {
    res.status(403).send(error)
  }
}

const readExamData = async (req, res) => {
  try {
    const id = req.params.id
    const category = req.params.category
    let datas
    if (category === 'todotest') {
      const test = await Test.findOne({ _id: id })
      datas = test.problems
    }
    else {
      datas = await testProblems(id, category)
    }
    res.status(200).send(datas)
  }
  catch (error) {
    res.status(403).send(error)
  }
}

const readStudyData = async (req, res) => {
  try {
    const id = req.params.id
    const category = req.params.category
    let datas // Exam Datas
    let historyData // History Datas
    let studyData = [] // Return Datas || Study Datas
    if (category === 'todotest') {
      const test = await Test.findOne({ _id: id })
      datas = test.problems
      historyData = await History.find({ id: id, category: category })
    }
    else {
      datas = await testProblems(id, category)
      historyData = await History.find({ test: id, category: category })
    }
    // Get Study Datas
    if (historyData.length) {
      const totalLength = historyData.length
      for (let i = 0; i < datas.length; i++) {
        // Initialize Histories
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
        for (let j = 0; j < totalLength; j++) {
          const choice = historyData[j].choices[i].choice
          const num = choice.slice(6, 7)
          const name = historyData[j].name
          const image = historyData[j].image
          if (!histories[Number(num) - 1].users.includes(name)) {
            histories[Number(num) - 1].users.push(name)
            histories[Number(num) - 1].images.push(image)
          }
          histories[Number(num) - 1].userNum++
          histories[Number(num) - 1].percentage = Math.floor(histories[Number(num) - 1].userNum / totalLength * 100)
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
          totalUser: totalLength,
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
    console.log(error)
    res.status(403).send(error)
  }
}

const readLiveResults = async (req, res) => {
  try {
    const id = req.params.id
    const category = req.params.category
    let datas
    if (category === 'todotest')
      datas = await History.find({ id: id, category: category, examType: 'study' }, {}, { sort: { 'createdAt': -1 } })
    else
      datas = await History.find({ test: id, category: category, examType: 'study' }, {}, { sort: { 'createdAt': -1 } })
    let results = []
    if (datas.length) {
      let count = datas.length
      if (datas.length > 10) {
        count = 10
      }
      for (let i = 0; i < count; i++) {
        let data = {
          name: datas[i].name,
          image: datas[i].image,
          isPass: datas[i].isPass,
          incorrect: datas[i].falseNum,
          cheatNum: datas[i].cheatNum,
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

const tabBadge = async (req, res) => {
  try {
    let category = req.params.category
    const name = req.auth.name
    const tests = await Test.find()
    let count = 0
    if (category === 'testportemas') {
      for (let l = 0; l < categories.length; l++) {
        let length = 0  // Number of Tests
        category = categories[l];
        let totalProblems = []
        for (let i = 0; i < tests.length; i++) {
          let problems = []
          problems = tests[i].problems.filter(problem => problem.category === category)
          if (problems.length) {
            for (let j = 0; j < problems.length; j++)
              totalProblems.push(problems[j])
          }
        }
        if (totalProblems.length)
          length = Math.floor(totalProblems.length / 30) + 1

        for (let i = 0; i < length; i++) {
          // Visit
          const visits = await Visit.findOne({ category: category, id: i + 1 })
          if (visits) {
            if (!visits.visitors.includes(name))
              count++
          }
          else {
            count++
          }
        }
      }
    }
    else {
      let length = 0  // Number of Tests
      if (category === 'todotest')
        length = tests.length
      else {
        let totalProblems = []
        for (let i = 0; i < tests.length; i++) {
          let problems = []
          if (category.startsWith('category'))
            problems = tests[i].problems.filter(problem => problem.category === category)
          else
            problems = tests[i].problems.filter(problem => problem[category] === true)

          if (problems.length) {
            for (let j = 0; j < problems.length; j++)
              totalProblems.push(problems[j])
          }
        }
        if (totalProblems.length)
          length = Math.floor(totalProblems.length / 30) + 1
      }
      for (let i = 0; i < length; i++) {
        if (category === 'todotest') {
          // Visit
          let visits = await Visit.findOne({ category: 'todotest', id: tests[i].id })
          if (visits) {
            if (!visits.visitors.includes(name))
              count++
          }
          else {
            count++
          }
        }
        else {
          // Visit
          const visits = await Visit.findOne({ category: category, id: i + 1 })
          if (visits) {
            if (!visits.visitors.includes(name))
              count++
          }
          else {
            count++
          }
        }
      }
    }

    const resData = {
      count: count
    }
    res.status(200).send(resData)
  }
  catch (error) {
    res.status(403).send(error)
  }
}

module.exports = {
  readTestData,
  readStudyData,
  readExamData,
  readLiveResults,
  tabBadge,
}