const Test = require("../models/Test")

const add = async (req, res) => {
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

const read = async (req, res) => {
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

const update = async (req, res) => {
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

const readProblems = async (req, res) => {
  try {
    let test = await Test.findOne({ _id: req.params.id })
    const problems = test.problems
    res.status(200).send(problems)
  }
  catch (error) {
    res.status(400).send(error)
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

// const details = async (req, res) => {
//   try {
//     let query = Question.find();

//     const page = parseInt(req.query.page) || 1;
//     const pageSize = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * pageSize;
//     const total = await Question.countDocuments();

//     const pages = Math.ceil(total / pageSize);

//     query = query.skip(skip).limit(pageSize);

//     if (page > pages) {
//       return res.status(404).json({
//         status: "fail",
//         message: "No page found",
//       });
//     }
//     const result = await query;
//     res.status(200).send(result);
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: "Server Error",
//     });
//   }
// }

module.exports = {
  add,
  read,
  readProblems,
  update,
  deleteTest,
}