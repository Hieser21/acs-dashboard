var mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    phone: {
        type: String
    },
    name: String,
    address: String,
    verified: {
        type: Boolean,
        default: false
    },
    gender: String,
    approved: Boolean    
},

    {
        timestamps: true
    
  
})

module.exports =  mongoose.model('user', userSchema)