const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Machine = new Schema({
    macA: String,
    cpuLoad: Number,
    freemem: Number,
    totalMem: Number,
    usedMem: Number,
    memUseage: Number,
    osType: String,
    upTime: Number,
    cpuModel: String,
    numCores: Number,
    cpuSpeed: Number,
    cpuLoad: Number,
});

module.exports = mongoose.model('Machine',Machine);