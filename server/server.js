const express = require('express');
const bodyParser = require('body-parser');


// local require
const { mongoose } =  require('./db/mongoose');
const { Users } = require('./models/user');
const { Todo } = require('./models/todo');
const { ObjectID } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;
console.log(port);
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
  }).catch(e => {
    res.status(404).send(e);
  });
});
app.get('/todos',(req, res ) => {
  Todo.find().then((todos)=> {
    res.status(200).send({todos}); 
  }, e => {
   res.status(400).send(e);
  });
});

// find by Id
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  if(!ObjectID.isValid(id)) {
    res.status(404).send({});
  } 
  Todo.findById(id).then((todos) => {
    if(!todos) {
      res.status(404).send({});
    } 
    res.status(200).send({todos});
  }).catch(e => {
    res.status(404).send({});
  });
});
app.listen( port, () => {
 console.log(`listening on port ${port}`);
});

module.exports = { app };