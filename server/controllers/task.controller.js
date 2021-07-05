const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Task = mongoose.model('Task');
const axios = require('axios');

mongoose.set('useFindAndModify', false);

module.exports.store = (req, res, next) => {
  var task = new Task();
  // console.log(req.body);
  task.name = req.body.name;
  task.email = req.body.email;
  task.password = req.body.password;
  task.save((err, doc) => {
    if (!err)
      res.send(doc);
    else {
      if (err.code === 11000)
        res.json({err: 'Duplicate email adrress found.'});
      else
        return next(err);
    }
  });
}

module.exports.getTasks = async (req, res) => {
  const titles = await axios.get('https://lorem-faker.vercel.app/api?quantity=' + req.query.number)
  for(let i = 0; i < titles.data.length; i++){
    var task = new Task();
    task.title = titles.data[i];
    await task.save();
  }

  const history = await Task.find().sort({_id: -1}).limit(Number(req.query.number));
  res.send(history);
}

module.exports.completed = (req, res) => {
  Task.findOneAndUpdate({_id:req.body.taskID}, {mark: 1}, function (err, place) {
    res.send(place);
  });
}
