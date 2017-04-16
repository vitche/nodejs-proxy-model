var mongoose = require('mongoose');
exports.ensureIndices = function () {
    mongoose.connection.collections['proxies'].ensureIndex({
        ipv4: 1,
        port: 1,
        type: 1
    }, {
        unique: true,
        dropDups: true
    });
    // TODO: A proper index for "ipv6" proxies
};
exports.fromStringArray = function (proxies) {
    var models = [];
    for (var i = 0; i < proxies.length; i++) {
        var proxy = proxies[i];
        models.push({
            address: proxy
        });
    }
    return models;
};
exports.entities = {
    Proxy: mongoose.model('Proxy', {
        created: {
            type: Date,
            default: Date.now
        },
        ipv4: String,
        ipv6: String,
        metadata: Object,
        port: Number,
        type: {
            type: Number,
            enum: [
                1, // HTTPProxy
                2, // HTTPSProxy
                3, // SOCKS4Proxy
                4  // SOCKS5Proxy
            ]
        }
    })
};
