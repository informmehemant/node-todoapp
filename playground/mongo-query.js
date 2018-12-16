const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { Users } = require('../server/models/user');
const { ObjectId } = require('mongodb');
// var id = '5c041701f4e5c1450f0ba081';
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todos', todo);
// });
// if(!ObjectId.isValid(id)){

// }
// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('Id not found');
//     }
//     console.log(todo);
// }).catch(e => {
//     console.log(e);
// });
const id = '5c027f50b3dbef101342b425';
Users.findById(id).then((user)=> {
   if(!user) {
       return console.log('no user found!');
   }
   console.log(user);
}).catch(e => {
  console.log(e);
});