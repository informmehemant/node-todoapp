const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
const { app } = require('../server');
const { Todo } = require('../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'Todos 1'
},
{
    _id: new ObjectID(),
    text: 'Todos 2'
}];
beforeEach((done) => {
 Todo.deleteMany({}).then(() =>  {
    return Todo.insertMany(todos, (err, docs) => {
        if(err) {
            done();
        }
    });
 }).then(() => done());
});
describe('POST /todos', ( ) => {
    it('should create a new todo', (done) => {
        const text = 'Test todo text';
        request(app)
        .post('/todos')
        .send({ text })
        .expect(200)
        .expect((res)=> {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if(err) {
                return done(err);
            }
            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            })
            .catch(e => done(e));
        });      
    });
    it('should not create database with the valid data', (done) => {
        request(app)
        .post('/todos')
        .send()
        .expect(400)
        .end((err, res)=> {
           if(err) {
               return done(err);
           }
           Todo.find().then(( todos ) => {
               expect(todos.length).toBe(2);
               done();
           }).
           catch(e => done(e));
        });
    });
});

describe(' GET Todos id: ', () => {
  it('should return todo doc ', ( done ) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
        expect(res.body.todos.text).toBe(todos[0].text);
    })
    .end(done);
  });
  it('should return 404 , if todo not found', (done)=> {
     const id = new ObjectID().toHexString(); 
     request(app)
     .get(`/todos/${id }`)
     .expect(404)
     .end(done);
  });
  it('should return 404 , if id is invalid', (done)=> {
    request(app)    
    .get(`/todos/123`)
    .expect(404)
    .end(done);
  });
});
describe('Delete /todos/:id ', ( ) => {
   it('should remove a single todo ', ( done ) => {
    Todo.find({}, (err, list) =>{
        console.log(list);
    })
     var hexId = todos[0]._id.toHexString();
     console.warn(hexId)
     request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, docs) => {
            if(err) {
                return done(err);
            }
            console.log(docs.body.todo);

        });
        //query not existing id
        Todo.findById(hexId).then((todo) => {
            expect(todo).not.toBeTruthy();
            done();
        }).catch( e => done(e));
   });
//    it('should return 404 , if todo not found', (done)=> {
//     const id = new ObjectID().toHexString(); 
//     request(app)
//     .delete(`/todos/${id }`)
//     .expect(404)
//     .end(done);
//  });
//  it('should return 404 , if id is invalid', (done)=> {
//    request(app)    
//    .delete(`/todos/123`)
//    .expect(404)
//    .end(done);
//  });
});