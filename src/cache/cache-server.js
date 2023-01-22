var proxy = require('express-http-proxy');
var app = require('express')();

const NodeCache = require("node-cache");
const nodeCache = new NodeCache();
const USE_SIMPLE_CACHE = false;
let simpleCache = {};

setInterval(() => {
    resetCache();
    console.log('chache cleared!');
}, 5 * 60 * 1000);


app.use('/', function handle(req, res, next) {
    let url = req.originalUrl.replaceAll('/', '_');

    if (url === '_reset') {
        resetCache();
        return res.send({ 'message': 'all cache entries invalidated.' });
    }

    let cachedResult = getFromCache(url);
    if (cachedResult !== null) {
        return res.send(cachedResult);
    } else {
        proxy('http://localhost:5000', {
            userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
                data = JSON.parse(proxyResData.toString('utf8'));
                putInCache(url, data);
                return JSON.stringify(data);
            }
        })(req, res, next)
    }
});

app.listen(3333);


// ------------------------------------------------------------------------------------------------
function getFromCache(key) {
    console.log(new Date(), nodeCache.getStats());

    if (USE_SIMPLE_CACHE) {
        if (simpleCache.hasOwnProperty(key)) {
            console.log(new Date(), key + '  =>  served from cache!');
            return simpleCache[key];
        } else {
            return null;
        }
    } else {
        let value = nodeCache.get(key);
        value = value || null;
        if (value !== null) {
            console.log(new Date(), key + '  =>  served from cache!');
        }
        return value;
    }
}

// ------------------------------------------------------------------------------------------------
function putInCache(key, value) {
    console.log(new Date(), key + '  =>  served back-end!')
    if (USE_SIMPLE_CACHE) {
        simpleCache[key] = value;
    } else {
        nodeCache.set(key, value);
    }
}

// ------------------------------------------------------------------------------------------------
function resetCache() {
    if (USE_SIMPLE_CACHE) {
        simpleCache = {};
    } else {
        nodeCache.flushAll();
    }
}