const Question = require("../models/Question");
const Test = require("../models/Test")

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

const add = async (req, res) => {
  try {
    const total = req.body.total;
    let no;
    const test = await Test.findOne({}, {}, { sort: { 'createdAt': -1 } })
    if (test) {
      no = test.no + 1
    }
    else {
      no = 1
    }
    const newTest = new Test({
      no: no,
      count: total
    })

    for (let i = 0; i < total; i++) {

      const newQuestion = new Question({
        test: no,
        id: req.body[`id${i}`],
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
      })
      await newQuestion.save()
    }

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
        no: tests[i].no,
        count: tests[i].count,
      }
    }
    res.status(200).send(data)
  }
  catch (error) {
    res.status(401).send(error)
  }
}

const readTest = async (req, res) => {
  try {
    const questions = await Question.find({ test: req.params.id })
    res.status(200).send(questions)
  }
  catch (error) {
    res.status(400).send(error)
  }
}

const updateTest = async (req, res) => {
  try {
    const test = await Test.findOne({ no: req.params.id })
    const total = req.body.total
    test.count = total
    await test.save()
    await Question.deleteMany({ test: req.params.id })

    for (let i = 0; i < total; i++) {

      const newQuestion = new Question({
        test: req.params.id,
        id: req.body[`id${i}`],
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
      })
      await newQuestion.save()
    }
    res.status(200).send('Test saved successfully.')

  }
  catch (error) {
    res.status(401).send(error)
  }
}

const deleteTest = async (req, res) => {
  try {
    await Test.deleteOne({ no: req.params.id })
    await Question.deleteMany({ test: req.params.id })
    res.status(200).send('Successfully Deleted.')
  }
  catch (error) {
    res.status(401).send(error)
  }
}

const readbyName = async (req, res) => {
  try {
    const name = req.params.name;
    let questions
    if (name.startsWith('category')) {
      questions = await Question.find({ category: name })
    }
    else {
      const query = {};
      query[name] = true;
      questions = await Question.find(query)
    }

    let datas = [];
    let data = [];
    let length = questions.length
    if (length > 30) {
      for (let i = 0; i < Math.floor(length / 30); i++) {
        datas.push({
          no: i + 1,
          count: 30
        })
      }
    }
    if (length !== 0) {
      datas.push({
        no: datas.length + 1,
        count: length % 30
      })
    }

    res.status(200).send(datas);
  }
  catch (error) {
    res.status(401).send(error)
  }

}

const readbyId = async (req, res) => {
  try {
    const id = req.params.id - 1
    const name = req.params.name
    let datas = []
    const query = {};
    name.startsWith('category') ?
      query['category'] = name
      :
      query[name] = true;
    const questions = await Question.find(query)

    for (let i = 0; i < 30; i++) {
      let iid = 30 * id + i
      if (questions.length == iid) break
      datas.push(questions[iid])
    }

    res.status(200).send(datas)
  }
  catch (error) {
    res.status(401).send(error)
  }
}

module.exports = {
  details,
  add,
  read,
  readTest,
  updateTest,
  deleteTest,
  readbyId,
  readbyName,
}