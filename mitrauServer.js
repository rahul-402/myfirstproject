const mongoose = require('mongoose');
var express = require('express');
const {User, validate} = require('./Models/User');

const app = express();

mongoose.connect('mongodb://localhost/user',{ useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

  app.get('/', async (req, res) => {

  const user = await User.find().sort('name');
  res.send(user);
});


  app.post('/', async (req, res) => {
  console.log(req.body);
  let user = await User.findOne({email: req.body.email});
  if(user) return res.status(400).send("user already exists");

  user = new User({
  	name: req.body.name,
  	email: req.body.email,
  	password: req.body.password
  });

  await user.save();
  res.send(user);
});

   const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));