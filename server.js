var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var app = express();
const cors = require('cors');
app.engine('html', ejs.renderFile);
app.set('view-engine', 'html');
app.use(express.static('js'));
app.use(express.static('css'));
app.use(express.static('svg'));
app.use(express.static('images'));
app.use(express.static('node_modules/grapesjs-parser-postcss/dist'));
app.use(express.static('node_modules/grapesjs/dist'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())

// Setup CORS
// var cors = require('cors')

// app.use(cors()) // Use this after the variable declaration
// app.options('*', cors());
// var corsOptions = {
//     origin: '*',
//     credentials: false
// };



app.get('/', function (req, res) {
    res.render('first-grapesjs-project.html');
});
app.get('/page-2', function (req, res){
    res.render('fgp-2.html');
});
app.get('/page-3', function (req, res) {
    res.render('fgp-3.html');
});
app.get('/page-4', function (req, res) {
    res.render('fgp-4.html');
});
app.get('/page-5', function (req, res) {
    res.render('fgp-5.html');
});
app.get('/page-6', function (req, res) {
    res.render('fgp-6.html');
});
app.get('/page-7', function (req, res) {
    res.render('fgp-7.html');
});
app.get('/page-8', function (req, res) {
    res.render('fgp-8.html');
});
app.get('/page-9', function (req, res) {
    res.render('fgp-9.html');
});
app.get('/page-10', function (req, res) {
    res.render('fgp-10.html');
});
app.get('/page-11', function (req, res) {
    res.render('fgp-11.html');
});
app.get('/page-12', function (req, res) {
    res.render('fgp-12.html');
});
app.get('/page-13', function (req, res) {
    res.render('fgp-13.html');
});
app.get('/page-14', function (req, res) {
    res.render('fgp-14.html');
});
app.get('/page-15', function (req, res) {
    res.render('fgp-15.html');
});
app.get('/page-16', function (req, res) {
    res.render('fgp-16.html');
});
app.get('/do-it', function (req, res){
    console.log(JSON.stringify(req.headers.credentials));
});
app.listen(8080);
console.log("Server listening at http://localhost:8080");