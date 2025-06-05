const mongoose = require('mongoose');

const ingestSchema = new mongoose.Schema({
    ingest_id: {
        type:String,
        required:true,
    },
    priority:{
        type:String,
        enum:['HIGH', 'MEDIUM', 'LOW'],
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('Ingestion', ingestSchema);