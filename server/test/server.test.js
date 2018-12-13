const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Todo } = require('../models/todo');

const todos = [{
    text: 'Todos 1'
},
{
    text: 'Todos 2'
}];
beforeEach((done) => {
 Todo.deleteMany({}).then(()=>  {
    return Todo.insertMany(todos);
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
        .end((err, res)=>{
           if(err) {
               return done(err);
           }
           Todo.find().then((todos)=> {
               expect(todos.length).toBe(2);
               done();
           }).
           catch(e => done(e));
        });
    });
});