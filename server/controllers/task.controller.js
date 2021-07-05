const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const bcrypt = require('bcryptjs');

const User = mongoose.model('User');

module.exports.store = (req, res, next) => {
  var user = new User();
  // console.log(req.body);
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save((err, doc) => {
    if (!err)
      res.send(doc);
    else {
      if (err.code === 11000)
        res.json({err:'Duplicate email adrress found.'});
      else
        return next(err);
    }
  });
}

module.exports.getTasks = (req, res) => {
  console.log(req.body.number);
  User.find((err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  })
}

module.exports.update = (req, res) => {
  if (req.body.email === '') {
    User.findByIdAndRemove({_id: req.body.id}, function (err, item) {
      if (err) res.json(err);
      else res.json('Successfully removed');
    });
  } else {
    User.findById(req.body.id, function (err, item) {
      if (!item)
        return next(new Error('Could not load Document'));
      else {
        item.email = req.body.email;

        item.save().then(item => {
          res.json('Update complete');
        })
          .catch(err => {
            res.status(400).send("unable to update the database");
          });
      }
    });
  }
}
