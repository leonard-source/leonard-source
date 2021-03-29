const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const mongoose = require("mongoose")

const app = express();

// app.use(bodyParser.urlencoded({extended: true}));

    app.get("/", function(req, res) {
        res.sendFile(__dirname + '/index.html')
    });

    app.get("/signup.html", function(req, res) {
        res.sendFile(__dirname + '/signup.html')
    });

    app.get("/login.html", function(req, res) {
        res.sendFile(__dirname + '/login.html')
    });


    app.get("/dash.html", function(req, res) {
        res.sendFile(__dirname + '/dash.html')
    });

    app.get("/EditProfile.html", function(req, res) {
        res.sendFile(__dirname + '/EditProfile.html')
    });
    
    app.get("/EditPassword.html", function(req, res) {
        res.sendFile(__dirname + '/EditPassword.html')
    });
    
    
    app.get("/marketPage.html", function(req, res) {
        res.sendFile(__dirname + '/marketPage.html')
    });
    
    app.get("/CreatingOrderPage.html", function(req, res) {
        res.sendFile(__dirname + '/CreatingOrderPage.html')
    });


    mongoose.connect("mongodb://localhost:27017/userdb", { useNewUrlParser: true,  useUnifiedTopology: true});
    
    const db = mongoose.connection;
    
        db.on('error', console.error.bind(console, 'MongoDB connection error'));
    
    
        const bcrypt = require('bcryptjs');
        const SALT_WORK_FACTOR = 10;
     mongoose.Promise = global.Promise;   

    const schema = mongoose.schema;
        
        const userSchema = new mongoose.Schema({
            firstname: {type: String, trim: true, default: ""},
            lastname: {type: String, trim: true, default: ""},
            username: {type: String, trim: true, default: "", require: true, index: { unique: true}},
            email: {type: String, default: ""},
            password: { type: String, require: true, default: "", index: { unique: true}},
            date: {type: Date, default: Date.now},
        });
        module.exports = mongoose.model('User', userSchema);

        UserSchema.pre('save', function(next) {
            var user = this;
        
            // only hash the password if it has been modified (or is new)
            if (this.isModified('password') || this.isNew) {
    
            }
        
            // generate a salt
             bcrypt.genSalt(10, function(err, salt) {
                if (err) {
                return next(err)
                } else {
                       // hash the password using our new salt
             bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                   // override the cleartext password with the hashed one
               user.password = hash;
                   next();
                });
           });
           else {
               return next()
           }
        });
    
        userSchema.methods.comparePassword = function(candidatePassword, cb) {
                 bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
                      if (err) return cb(err);
                      cb(null, isMatch);
                     });
                  };


         const user = module.exports = mongoose.model("User", UserSchema)



    // app.post("/signup.html", function (req, res) {
     app.post("/signup.html", (req, res) => {
            var myData = user(req.body);
            myData.save()
              .then(user => {
                res.sendFile(__dirname + '/dash.html');
                // res.json("item saved to database");
              })
              .catch(err => {
                res.status(400).send("unable to save to database");
        });
        // console.log(req.body);
    
    
        // res.send('thanks');
    });
    
    app.post("/login.html", function (req, res) {
    
        console.log(req.body);
    
        res.send('thanks');
    });
    
 app.use("/static", express.static("static"));


app.listen(5000, function(){
    console.log("server is up and running");
}); 