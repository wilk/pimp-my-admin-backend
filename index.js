var express = require('express'),
    app = express(),
    http = require('http'),
    bodyParser = require('body-parser'),
    bunyan = require('bunyan'),
    _ = require('lodash'),
    logger = bunyan.createLogger({name: 'pimp-my-admin'}),
    cors = require('cors');
    
var posts = [{
    id: 0,
    title: "Foo",
    published_at: Date.now(),
    body: 'blablabla',
    teaser: 'lolololol',
    views: 10
}, {
    id: 2,
    title: "goatse",
    published_at: Date.now(),
    body: 'something something',
    teaser: 'darkside',
    views: 40
}, {
    id: 3,
    title: "gattini",
    published_at: Date.now(),
    body: 'clerofagia',
    teaser: 'mazomanzia',
    views: 60
}, {
    id: 4,
    title: "radioaktivitat",
    published_at: Date.now(),
    body: 'dark side',
    teaser: 'of the moon',
    views: 20
}, {
    id: 5,
    title: "viva tutto",
    published_at: Date.now(),
body: 'ful',
    teaser: 'fool',
    views: 666
}];

app.use(cors());    
app.use(function (req, res, next) {
    logger.info([req.method, req.url, req.ip].join(' '));
    next();
});

app.use(bodyParser.json());

app.get('/', function (req, res) {res.send('HELLO WORLD');});

app.get('/api/posts', function (req, res) {
    res.json(posts);
});
app.get('/api/posts/:postId', function (req, res) {
    var post = _.find(posts, function (post) {
        return post.id === parseInt(req.params.postId);
    });
    res.json(post);
});
app.put('/api/posts', function (req, res) {
    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];
        if (post.id === parseInt(req.body.id)) {
            posts[i] = req.body;
            break;
        }
    }
    
    res.json(post);
});
app.post('/api/posts', function (req, res) {
    var id = posts.push(req.body);
    
    req.body.id = id;
    
    res.json(req.body);
});
app.delete('/api/posts/:postId', function (req, res) {
    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];
        if (post.id === parseInt(req.params.postId)) {
            posts.splice(i, 1);
            break;
        }
    }
    
    res.json(post);
});

app.listen(process.env.PORT, function () {
    logger.info('Listening on port', process.env.PORT, process.env.IP);
});