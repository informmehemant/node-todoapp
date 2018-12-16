const mongoose = require('mongoose');
const assert = require('assert');
const url = process.env.PROD_MONGODB || 'mongodb://localhost:27017/TodoApp';
mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true }, (err) =>{ 
   assert.equal(null, err);
});

module.exports = {
    mongoose,
    assert
};