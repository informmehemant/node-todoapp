const { mongoose } = require('../db/mongoose'); 
const Users = mongoose.model('User', {
    name: {
        type: String,
        reqiured: true,
        min: 1,
        trim: true
    },
    email: {
        type: String,
        min: 1,
        required: true,
        trim: true
    }
 });
 module.exports = {
   Users
 };