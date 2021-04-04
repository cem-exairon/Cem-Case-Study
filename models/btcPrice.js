const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bestAskPriceSchema = new Schema({
    bestAskPrice: {
        type: String
    },
    createdAt: {
        type: Date
        // default: Date.now
    },
});

module.exports = mongoose.model('BestAskPrice', bestAskPriceSchema);