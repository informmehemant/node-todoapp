const { MongoClient, ObjectID } = require('mongodb');
const assert  = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'TodosApp';

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    assert.equal(null, err);
    console.log('Mongodb Server responding well !!');
    const db = client.db(dbName);
    
    // delete Many

    // db.collection('Todos').deleteMany({ 
    //     text: "Some thing to do"
    // }).then((result) => {
    //     console.log(result);
    // });

    // delete one
    // db.collection('Todos').deleteOne({
    //     text: "Learning basic angular completed"
    // }).then((result) => {
    //   console.log(result);
    // }); 
    
    // findOneAndDelete() returns  deleted documents as well
    db.collection('User').findOneAndUpdate({
     _id: new ObjectID('5bfeb6fce5c14b5cd3f3c0ef')
    },{
      $set: {
        name: 'HemuDarling'
      },
      $inc: {
          age: 2
      }
    },
    {
        returnOriginal: false
    }).then((result) => {
      console.log(JSON.stringify(result, undefined, 2));
    }, ( err ) => {
        assert(null, err);
    });
});