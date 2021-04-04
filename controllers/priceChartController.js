const BestAskPrice = require('../models/btcPrice');


exports.getIndexPage = (req, res, next) => {
    res.render('index');
}

exports.getBtcPrices = (req, res, next) => {
    // find all documents created within last 24 hours
    const yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));

    BestAskPrice.find({createdAt: { $gte: yesterday }}, function(err, prices) {
        const priceArray = [];

        prices.forEach(function(price) {
            priceArray.push(price);
        });
        res.send(priceArray);
    });
}

exports.postBtcPrices = (req, res, next) => {
    console.log('postBtcPrices req.body', req.body);
    const bestAskPrice = new BestAskPrice({
        bestAskPrice: req.body.bestAskPrice,
        createdAt: req.body.createdAt
    })
    bestAskPrice.save().then(result => {
        console.log("Data inserted")  // Success
    }).catch(error => {
        console.log(error)      // Failure
    });
}
