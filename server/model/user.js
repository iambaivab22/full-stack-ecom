const mongoose = require('./index');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: String,
    role: {
        type: String,
        default: 'user'
    },
    mobile: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    street: String,
    houseNo: String
})


const User = mongoose.model('user',UserSchema);
module.exports = User;