const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// fetches root files from client/build
//app.use(express.static(path.join(__dirname, 'client', 'build')));
// app.use(bodyParser.urlencoded({extended:true}))
app.use(require('connect').bodyParser());
// May only be exist once in app
mongoose.connect("mongodb://my_user:my_pwd@ec2-65-1-85-153.ap-south-1.compute.amazonaws.com:27017/mern", { useNewUrlParser: true });

const Schema = mongoose.Schema;
const memberSchema = new Schema({
    firstName: String,
    lastName: String
});
const Member = mongoose.model("member", memberSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/register', (req, res) => {
    response = {
      message:"Hello, GFG Learner"
    }
    const tenet = new Member({
      firstName : req.body.name,
      lastName: "Christopher Nolan"
  })
  
  const result = tenet.save();
  console.log(res)
  console.log(req)
    res.send(req.body);
    // res.sendFile(path.join(`${__dirname}/favicon.ico`));
});

app.get('/members', (req, res) => {
    Member.find({}, "firstName lastName").then(members => {
        if (members !== null && members.length > 0) {
            res.write(JSON.stringify(members));
        } else {
            res.write("No members found");
        }
        res.end();
    });
}).listen(8000);
