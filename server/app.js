

const path = require('path');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

const users = require('./routes/user');
const categories = require('./routes/categories');
const products = require('./routes/products');
const shippingAddress = require('./routes/shippingAddress');
const order = require('./routes/order');

const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbUrl = 'mongodb://127.0.01:27017/mall';

mongoose.connect(dbUrl, {useNewUrlParser: true}, function(err) {
    if (err) {
        console.log('Mongo Connection Error:' +err);
    } else {
        console.log('Mongo Connection Success');
    }
})

app.use(session({
    secret: 'mail',
    name: 'login-user',  //设置cookie的name，默认是connect.sid 
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 5
    },
    store: new MongoStore({
        url: dbUrl,
        collection: 'sessions'
    }),
    resave: false,
    saveUninitialized: true
}))

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/categories', categories);
app.use('/products', products);
app.use('/shippingAddress', shippingAddress);
app.use('/order', order);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})

app.set('port', 3030);
let server = app.listen(app.get('port'), function() {
    console.log('端口：' + server.address().port);
    console.log('mongoDB: ' + dbUrl);
})

app.use(function (err, req, res, next) {

})