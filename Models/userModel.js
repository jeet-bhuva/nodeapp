const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        requird:true
    },
    password: {
        type: String,
        requird:true
    },
    email: {
        type: String,
        requird:true
    },
},
{
    timestamps:true
}
);

const User = mongoose.model('User', userSchema)

module.exports = User;