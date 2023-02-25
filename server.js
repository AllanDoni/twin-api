const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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
    const existingUser = db.users.findOne({ phoneNumber: 758588 });
    const tenet = new Users({
      name : req.body.name,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password
  })
  
  const result = tenet.save();
  console.log(res)
  console.log(req)
    res.send(existingUser);
    // res.sendFile(path.join(`${__dirname}/favicon.ico`));
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
