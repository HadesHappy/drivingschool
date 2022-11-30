const mongoose = require('mongoose')
const modelName = 'Test'

const TestSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true
  },
  problems: [{
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    choice1: {
      type: String,
      default: ''
    },
    choice2: {
      type: String,
      default: ''
    },
    choice3: {
      type: String,
      default: ''
    },
    choice4: {
      type: String,
      default: ''
    },
    answer: {
      type: String,
      default: ''
    },
    tema: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true
    },
    video: {
      type: String,
      default: '',
    },
    difficulty: {
      type: Number,
      default: 0
    },
    killertest: {
      type: Boolean,
      default: false,
    },
    gemela: {
      type: Boolean,
      default: false,
    },
    newpregunta: {
      type: Boolean,
      default: false
    },
  }]
},
  {
    timestamps: true,
  }
)

module.exports = mongoose.model(modelName, TestSchema)