const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true,'must provid name'] ,     // k cho phep bo trong
        trim: true,                             // k cho phep cac dau cach o giua ( vd '    a   ')
        maxlength: [20,'name cannot be more than 20 characters'],
    },
    completed:{
        type: Boolean,
        default: false,
    },
    
})

module.exports = mongoose.model('task', TaskSchema)