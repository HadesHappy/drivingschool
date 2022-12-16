const mongoose = require('mongoose')
const modelName = 'Visit'

const VisitSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  visitors: [{
    type: String,
    required: false,
  }],
},
  {
    timestamps: true,
  }
)

module.exports = mongoose.model(modelName, VisitSchema)