const express = require('express');
const bodyParser = require('body-parser');


// local require
const { mongoose } =  require('./db/mongoose');
const { Users } = require('./models/user');
const { Todo } = require('./models/todo');

const app = express();

// creating a library middleware
app.use(bodyParser.json());

app.post('/todos', ( req, res ) => {
  let todo = new Todo({
      text: req.body.text
  });
  todo.save().then((doc)=> {
   res.send(doc);
  }, (e) =>{
    res.status(400).send(e);
  });
});
app.get('/todos',(req, res ) => {
  Todo.find().then((todos)=> {
    res.status(200).send({todos}); 
  }, e => {
   res.status(400).send(e);
  });
});

app.listen(3000, () =>{
 console.log('listening on port 3000');
});

module.exports = { app };