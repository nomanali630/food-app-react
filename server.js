var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require("cors");
var morgan = require("morgan");
// var path = require("path")
// var jwt = require('jsonwebtoken')
var app = express()
var authRoutes = require('./auth/auth')

app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(morgan('dev'));
// app.use("/", express.static(path.resolve(path.join(__dirname, "public")));

app.get('/', (req, res, next) => {
    res.send("running")
    
})

app.use('/', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("server is running on: ", PORT);
})