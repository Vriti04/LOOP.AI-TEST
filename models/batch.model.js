const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    batch_id:{
        type:String,
        required:true
    },
    ingestion_id:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['yet to start', 'triggered', 'completed'],
        default:'yet to start'
    },
    ids:[Number]
},{timestamps:true});

module.exports = mongoose.model('Batch', batchSchema);