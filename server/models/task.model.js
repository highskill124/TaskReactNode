const mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  mark: {
    type: Number,
    default: 0
  }
});

mongoose.model('Task', TaskSchema);
