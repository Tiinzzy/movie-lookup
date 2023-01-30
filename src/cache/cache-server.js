var proxy = require('express-http-proxy');
var app = require('express')();

const NodeCache = require("node-cache");
const nodeCache = new NodeCache();
const DISABLE_CACHE = true;
const USE_SIMPLE_CACHE = false;
const CLEAR_CACHE_INTERVAL = 5; // minutes
let simpleCache = {};

setInterval(() => {
    resetCache();
}, CLEAR_CACHE_INTERVAL * 60 * 1000);


app.use('/download', function (req, res) {
    let url = 'http://localhost:5000/' + req.originalUrl.replace('download', 'get-movies-pdf');
    console.log(1, url);
    res.redirect(url);
});


app.use('/api', function handle(req, res, next) {
    let url = req.originalUrl.replaceAll('/', '_');
    console.log(2, url);
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
    if (DISABLE_CACHE) {
        return null;
    }

    console.log(new Date(), nodeCache.getStats());

    if (USE_SIMPLE_CACHE) {
        if (simpleCache.hasOwnProperty(key)) {
            console.log(new Date(), key + ' => served from cache!');
            return simpleCache[key];
        } else {
            return null;
        }
    } else {
        let value = nodeCache.get(key);
        value = value || null;
        if (value !== null) {
            console.log(new Date(), key + ' => served from cache!');
        }
        return value;
    }
}

// ------------------------------------------------------------------------------------------------
function putInCache(key, value) {
    if (!DISABLE_CACHE) {
        console.log(new Date(), key + ' => served back-end!')
        if (USE_SIMPLE_CACHE) {
            simpleCache[key] = value;
        } else {
            nodeCache.set(key, value);
        }
    }
}

// ------------------------------------------------------------------------------------------------
function resetCache() {
    if (!DISABLE_CACHE) {
        if (USE_SIMPLE_CACHE) {
            simpleCache = {};
        } else {
            nodeCache.flushAll();
        }
        console.log(new Date(), ' => chache cleared!');
    }
}