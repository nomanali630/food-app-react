var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require("cors");
var morgan = require("morgan");
// var path = require("path")
var jwt = require('jsonwebtoken')
const multer = require('multer')
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
app.get("/getorder",(req,res,next)=>{
    foodModel.find({},(data,error)=>{
        if(data){
            res.send({
                data:data,
            })
        }else{
            res.send(error)
        }
    })
})


const multer = require('multer')
const storage = multer.diskStorage({ // https://www.npmjs.com/package/multer#diskstorage
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.filename}.${file.mimetype.split("/")[1]}`)
    }
})
var upload = multer({ storage: storage })


const admin = require("firebase-admin");
// https://firebase.google.com/docs/storage/admin/start

var SERVER_ACCOUNT = {
    apiKey: "AIzaSyDRA8t9oqePYW-xVtKDCxfmdfmJqjDrOFg",
    authDomain: "shop-products-78bc2.firebaseapp.com",
    databaseURL: "https://shop-products-78bc2-default-rtdb.firebaseio.com",
    projectId: "shop-products-78bc2",
    storageBucket: "shop-products-78bc2.appspot.com",
    messagingSenderId: "480543439300",
    appId: "1:480543439300:web:5d5612b981acf7ce468c91"
  };

admin.initializeApp({
    credential: admin.credential.cert(SERVER_ACCOUNT),
    DATABASE_URL: 'https://shop-products-78bc2-default-rtdb.firebaseio.com/'
    
});
const bucket = admin.storage().bucket("gs://shop-products-78bc2.appspot.com");


app.post("/upload", upload.any(), (req, res, next) => {  // never use upload.single. see https://github.com/expressjs/multer/issues/799#issuecomment-586526877

    console.log("req.body: ", req.body);
    console.log("req.body: ", JSON.parse(req.body.myDetails));
    console.log("req.files: ", req.files);

    console.log("uploaded file name: ", req.files[0].originalname);
    console.log("file type: ", req.files[0].mimetype);
    console.log("file name in server folders: ", req.files[0].filename);
    console.log("file path in server folders: ", req.files[0].path);

    // upload file to storage bucket 
    // you must need to upload file in a storage bucket or somewhere safe
    // server folder is not safe, since most of the time when you deploy your server
    // on cloud it makes more t2han one instances, if you use server folder to save files
    // two things will happen, 
    // 1) your server will no more stateless
    // 2) providers like heroku delete all files when dyno restarts (their could be lots of reasons for your dyno to restart, or it could restart for no reason so be careful) 


    console.log(" req.cookies.jToken: ", req.cookies.jToken);
    console.log(" req.headers.jToken ==============: ", req.headers.jToken);
    console.log(" req.body.jToken: ", req.body.jToken);

    // https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload-examples
    bucket.upload(
        req.files[0].path,
        // {
        //     destination: `${new Date().getTime()}-new-image.png`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
        // },
        function (err, file, apiResponse) {
            if (!err) {
                // console.log("api resp: ", apiResponse);

                // https://googleapis.dev/nodejs/storage/latest/Bucket.html#getSignedUrl
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then((urlData, err) => {
                    if (!err) {
                        console.log("public downloadable url: ", urlData[0]) // this is public downloadable url 
                        userModel.findOne({ email: req.headers.jToken.email }, (err, user) => {
                            if (!err) {
                                tweetModel.updateMany({email: req.headers.jToken.email},{profilePic: urlData[0]}, (err, userTweet)=>{
                                    console.log("jsdlkfjsldjfaskfaskdsljfslajfa"  + userTweet)
                                    if(!err){
                                        console.log('user update')
                                    }
                                })
                                 user.update({ profilePic: urlData[0] }, {}, function (err, data) {
                                    // console.log(user)
                                    res.send({
                                        pic: user.profilePic
                                    });
                                })
                            }
                            else {
                                res.send({
                                    message: "error"
                                });
                            }
                        })
                        // // delete file from folder before sending response back to client (optional but recommended)
                        // // optional because it is gonna delete automatically sooner or later
                        // // recommended because you may run out of space if you dont do so, and if your files are sensitive it is simply not safe in server folder
                        // try {
                        //     fs.unlinkSync(req.files[0].path)
                        //     //file removed
                        // } catch (err) {
                        //     console.error(err)
                        // }
                        // res.send("Ok");
                    }
                })
            } else {
                console.log("err: ", err)
                res.status(500).send();
            }
        });



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("server is running on: ", PORT);
})