const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');


// fetches root files from client/build
//app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
// May only be exist once in app
const db = mongoose.connect("mongodb://my_user:my_pwd@ec2-65-1-85-153.ap-south-1.compute.amazonaws.com:27017/mern", { useNewUrlParser: true });

const Schema = mongoose.Schema;
const memberSchema = new Schema({
    name: {type: String , default: ""},
    phoneNumber: {type: Number , default: ""},
    password: {type: String , default: ""}
});
const Users = mongoose.model("users", memberSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/register', (req, res) => {
    Users.findOne({phoneNumber: req.body.phoneNumber}, async function(err, user){
        if(err) {
            console.log(err);
          }
          var message;
          if(user) {
            console.log(user)
              message = "user exists";
              console.log(message)
          } else {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);
            const tenet = new Users({
                name : req.body.name,
                phoneNumber: req.body.phoneNumber,
                password: hash
            })
            message = "Registered Successfully";
            const result = tenet.save();
          }
          res.send({message: message});
    });
    
  console.log(res)
  console.log(req)
    // res.send(existingUser);
    // res.sendFile(path.join(`${__dirname}/favicon.ico`));
});

/**
 * Login 
 */
app.post('/login', (req, res) => {
    Users.findOne({ phoneNumber: req.body.phoneNumber }).then(
        (user) => {
          if (!user) {
            return res.status(401).json({
              error: 'User not found!'
            });
          }
          bcrypt.compare(req.body.password, user.password).then(
            (valid) => {
              if (!valid) {
                return res.status(401).json({
                  error: 'Incorrect password!'
                });
              }
              res.status(200).json({
                userId: user._id,
                // token: 'token'
              });
            }
          ).catch(
            (error) => {
              res.status(500).json({
                error: error
              });
            }
          );
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );
});

app.get('/users', (req, res) => {
    Users.find({}, "name email phoneNumber password").then(members => {
        if (members !== null && members.length > 0) {
            res.write(JSON.stringify(members));
        } else {
            res.write("No members found");
        }
        res.end();
    });
}).listen(8000);
