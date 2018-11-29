// const mongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// // Connection url
// const url = 'mongodb://localhost:27017';
// const dbName = 'TodosApp';
// use Connection method to connect to clientt
// mongoClient.connect(url, { useNewUrlParser: true },(err, client) => {
//     assert.equal(null, err);
//     console.log('Connected successfully to the server');
//     const db = client.db(dbName);
//     db.collection('Todos').insertOne({
//         text: 'Some thing to do',
//         completed: false
//     },(err , result) =>{
//         if(err) {
//             return console.log('unable to connect db', err);
//         }
      
//     });
//     client.close();
// });
const { MongoClient, ObjectID } = require('mongodb');
const assert = require('assert');
// Connection url
const url ='mongodb://localhost:27017';
const dbName ='TodosApp';

let id = new ObjectID();
//use Connection method to connect to client
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) =>{
    assert.equal(null, err);
    console.log('Connected successfully to the server');
    const db = client.db(dbName);
    db.collection('Todos').insertOne({ 
        text: 'Learning basic angular completed',
        completed: true
    },( err, result) =>{
        if(err) {
            return console.log('unable to connect db', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    db.collection('User').insertOne({
      name: 'Baleshwar Singh',
      age: 56,
      address: 'Gangtok-sikkim'
    },(err, result)=> {
      assert.equal(null, err);
      console.log(JSON.stringify(result.ops, undefined, 2));
      console.log(result.ops[0]._id.getTimestamp());
    })
    client.close();
});