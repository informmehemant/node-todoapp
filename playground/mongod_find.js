const { MongoClient, ObjectID } = require('mongodb');
const assert = require('assert');
const url = 'mongodb://localhost:27017/';
const dbName = 'TodosApp';
MongoClient.connect(url,{ useNewUrlParser: true} , (err, client)=> {
    assert.equal(null, err);
    console.log('Mongodb Server responding well!');
    db = client.db(dbName);
    // db.collection('Todos').find({_id: new ObjectID('5bfed192db2e1079de20fffc')}).toArray().then((doc) => { 
    //   console.log(JSON.stringify(doc, undefined, 2));
    // }, (err) => {
    //   assert.equal(null, err);
    // });
    // db.collection('Todos').find().count().then((count)=>{
    //     console.log(`Total count ${count}`);
    // }, (err) => {
    //     assert.equal(null, err);
    // });
    db.collection('User').find({name: 'Hemant Singh'}).toArray().then((doc) =>{
       console.log(JSON.stringify(doc, undefined, 2));
    }, (err) => {
        assert(null, err);
    });
    db.collection('User').find({name: 'Hemant Singh'}).count().then((count) =>{
        console.log(`count is ${count}`);
     }, (err) => {
         assert(null, err);
     });
});
