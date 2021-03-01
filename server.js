var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require("cors");
var morgan = require("morgan");
// var path = require("path")
var jwt = require('jsonwebtoken')
var app = express()
var authRoutes = require('./auth/auth')
var {foodModel} = require("./database/module")
var {itemOrderModel}=require("./database/module")
var SERVER_SECRET  = '1255';

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

app.use(function (req, res, next) {

    console.log("req.cookies: ", req.cookies);
    if (!req.cookies.jToken) {
        res.status(401).send("include http-only credentials with every request")
        return;
    }
    jwt.verify(req.cookies.jToken, SERVER_SECRET, function (err, decodedData) {
        if (!err) {

            const issueDate = decodedData.iat * 1000;
            const nowDate = new Date().getTime();
            const diff = nowDate - issueDate;

            if (diff > 300000) {
                res.status(401).send("token expired")
            } else {
                var token = jwt.sign({
                    id: decodedData.id,
                    name: decodedData.name,
                    email: decodedData.email,
                    role:decodedData.role
                }, SERVER_SECRET)
                res.cookie('jToken', token, {
                    maxAge: 86_400_000,
                    httpOnly: true
                });
                req.body.jToken = decodedData
                req.headers.jToken = decodedData
                next();
            }
        } else {
            res.status(401).send("invalid token")
        }
    });
})

app.get("/profile", (req, res, next) => {

    console.log(req.body)

    foodModel.findById(req.body.jToken.id, 'name email phone  createdOn role',
        function (err, doc) {
            if (!err) {
                console.log("doc:", doc)
                res.send({
                    profile: doc
                })

            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        })


});
app.post("/order", (req,res,next)=>{
   
    if(!req.body.orderData || !req.body.Total){
        res.status(403).send(`
        please send order and total in json body.
            e.g:
            {
                "orders": "order",
                "total": "45785",
            }
        `)

        return;
    }

    foodModel.findOne({email: req.body.jToken.email},(error,user)=>{
        console.log('user:',user)

        if(user){
            itemOrderModel.create({
                name: req.body.name,
                phone: req.body.phone,
                address: req.body.address,
                total: req.body.Total,
                orders: req.body.orderData
            }).then((data)=>{
                res.send({
                    status:200,
                    message:"Order submitted",
                    data:data
                })
            }).catch(()=>{
                res.send({
                    status:500,
                    message:"submittion error, "+error
                })
            })
        }else{
            console.log("error",error)
        }
    })
})




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("server is running on: ", PORT);
})