var mongoose = require('mongoose')

//Trust Data
var trustSchema = new mongoose.Schema({

    newToken : {
        type : String,
        required : true
    },

    preToken : {
        type : String,
        required : true
    },

    type : {
        type : String,
        required : true
    },

    price : {
        type : Number,
        required : true
    },

    trustProfit : {
        type : Number,
        required : false
    },

    negligenceProfit : {
        type : Number,
        required : false
    },

    purpose : {
        type : String,
        required : true
    },

    periodStart : {
        type : Date,
        required : true
    },

    periodEnd : {
        type : Date,
        required : true
    },
    
    etc : {
        type : String,
        required : false
    },

    Attachments : {
            type : Buffer, 
            contentType : String,
            required : false
    }

})

module.exports = mongoose.model('Trust', trustSchema)