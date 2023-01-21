var proxy = require('express-http-proxy');
var app = require('express')();

var cache = {};

setInterval(() => {
    cache = {};
    console.log('chache cleared!');
}, 5 * 60 * 1000);

app.use('/', function handle(req, res, next) {
    let url = req.originalUrl.replaceAll('/', '_');

    if (url === '_reset') {
        cache = {};
        return res.send({ 'message': 'all cache entries invalidated.' });
    }

    if (cache.hasOwnProperty(url)) {
        console.log(url + '  =>  served from cache!')
        return res.send(cache[url]);
    } else {
        proxy('http://localhost:5000', {
            userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
                data = JSON.parse(proxyResData.toString('utf8'));
                cache[url] = data;
                console.log(url + '  =>  served back-end!')
                return JSON.stringify(data);
            }
        })(req, res, next)
    }
});

app.listen(3333);


