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
    "type": "service_account",
    "project_id": "tweet-profile-pic",
    "private_key_id": "359d4322312e8b5263755dfdcdfe9f9c8c1239e1",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCK30WiorMMVlTT\n/EB7F3Sm4+XUml141AG01vKb+hvhWZ1Qw4dIKAEnWknPagQ8W9N2+HXxZjMCLFAy\nlWULFUiuc5E9wHZIYI3wSHnsXlTQ+yqk6i/YYDwPvPrS9HWWMZ1JVb+eVnom374q\njlgc7CWPh4vQt1+X+TLc3wTZPbM956zdUdmX9h86qKAit2hJZ9KfMa5BWBc+IJKh\nZJLdtXBxsOuFmu9fP6nsJned27zxk3iFRnmIbxssqZCmdJv9krhV7l0y0q7s9DWt\n456FxfOulT1Kuofim3lWzQVkW/yQOJiQPyhdNya5eGSSE61qmrIWxAIni0FFdkLt\nFZtFI271AgMBAAECggEAK6mujceE7xyXuD0IEwuZaD2gTfuo5uwVi0PH7OWy7WQN\nM87+UmANmM9pBJdLNKUUdEQDZT5iTE0dfAH/zn/HJd59LIK+TdxZ1FIdT4WLOle2\nHTrqhygeyj37SOeGrw3za5LT2BdNebqAYoX1y0YuOxX9jkaRfkliRhKyxhEBsbUW\nvatYNRwVWVvl9IugUBunv+qya+uNSgP9joBjXz04pq6czWXvvTkXsAIh3NiORtD9\n/IXX0hCQHhBh/+SxNcXWa8alEJFwBuk0wUWkvHruDwcaDc7xy7UAcGvii+jBAQAZ\nRnr2ChF9vp/89sNxE7/EcVyiHDVGbtJg/igQ1A/lowKBgQDDpS3WPsW8AFZ7uXA/\nJuvH5uWsKFNw3Wo5HFRhjrm8GEuoYGEmKlGIpXIZvlpqli5LvhcOpxE3loB5iFL3\nmiECbfY331gSOs0MIcFvF/EBdyKMd2FrzXcV1VI8o8sz7qhnqfDg/LNqEjdOZ1dp\noDsIcF2E9zCJMOzxFVxfW29lNwKBgQC1toPjvIbSKt5kMJsBQeR48ySp778Ucjn6\ny0ozgx5rCxpwkroKw/l3xq9ft+FYISYWxnRPToShbYppcOcuK2l1blnscm1BWFga\no5dPqUWRaqN41qpPkLGdfSodzWbioyb4SHhTwDWEwcUlHa3ZUMuvkxe8Bkngc0ur\nJrUj+6JjMwKBgCVt4nkMhVPUVLdS4NCUJ6OU3veyt1PuaDYI33PSlGIR29eYqL1e\ndz7HOC8Ipc+ib7T55vtcpwSVfHrDw+uuxwXp96L0zaqfKT9a7eDNGcSIAEoTRMYV\nBuVcbGFBjMygqgM7FeRVNBXk6kPLrYN9rg2NQbcAe36jp5Dv3z43Bfa9AoGBAKnY\njFSsnfQJ/870I548QdrPocB5iEgLMKh7pcKaVy9EtJTugJiZby+GddvpGuduLJTz\nMDoEsTHWGp7N2jgseak62TCKEBcZBVj4+fCKzqzKWTwUoiI2o94J5PjwSa+jQkSm\nMFpP+XY6TBSSNjI/M/PLcE7eLeVuvxad2ohkpvdDAoGAQid/Twb0bKAoKN3f5VsQ\n7Df6ezqc2suGrqAuRKz/piEVHCqK8JZEIj5sWqfHwHlxcLo8FZmn5Dshme4wDzjK\nXwqQo9OerjTy/Nrw4le2riPbfZowZLQ/pBWTmwu8yUiqzMtL3gKqoNzX5PrGi4/M\nUPu2VVViVPAv6IY7eIvuvRM=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-2u662@tweet-profile-pic.iam.gserviceaccount.com",
    "client_id": "101544439347829053985",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2u662%40tweet-profile-pic.iam.gserviceaccount.com"
}

admin.initializeApp({
    credential: admin.credential.cert(SERVER_ACCOUNT),
    DATABASE_URL:"https://tweet-profile-pic-default-rtdb.firebaseio.com/" 
    
});
const bucket = admin.storage().bucket("gs://tweet-profile-pic.appspot.com");


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
    itemOrderModel.find({},(data,error)=>{
        if(data){
            res.send({
                data:data,
            })
        }else{
            res.send(error)
        }
    })
})





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

   
    bucket.upload(
        req.files[0].path,
        
        function (err, file, apiResponse) {
            if (!err) {
              
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then((urlData, err) => {
                    if (!err) {
                        console.log("public downloadable url: ", urlData[0])  
                        foodModel.findById({ email: req.headers.jToken.id},'email role', (err, user) => {
                            if (!err) {
                                itemOrderModel.create({
                                    "name":req.body.productName,
                                    "price":req.body.price,
                                    "im,age":urlData[0],
                                    // email: req.headers.jToken.email},{profilePic: urlData[0]}, (err, userTweet)=>{
                                    // console.log("jsdlkfjsldjfaskfaskdsljfslajfa"  + userTweet)
                                    // if(!err){
                                    //     console.log('user update')
                                    // }
                                }).then((data)=>{
                                    console.log(data)
                                    res.send({
                                        status:200,
                                        message:"added successfully",
                                        data:data
                                    }).catch((error)=>{
                                        console.log(error)
                                        res.send({
                                         status:500,
                                         message:"user create error:" + error
                                        })
                                    })
                                })
                                //  user.update({ profilePic: urlData[0] }, {}, function (err, data) {
                                //     // console.log(user)
                                //     res.send({
                                //         pic: user.profilePic
                                //     });
                                // })
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
                    } try {
                        fs.unlinkSync(req.files[0].path)
                    } catch (err) {
                        console.error(err)
                    }
                })
            } else {
                console.log("err: ", err)
                res.status(500).send();
            }
        });


    })
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("server is running on: ", PORT);
})