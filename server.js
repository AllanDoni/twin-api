// const Mongoose = require("Mongoose");
const express = require("express");
const mongoUrl = "http://ec2-65-1-85-153.ap-south-1.compute.amazonaws.com:27017";
const app=express();
// Mongoose.set("strictQuery", false);
Mongoose.set("strictQuery", false);
// Mongoose.connect(mongoUrl, {useNewUrlParser: true})
// Mongoose.connect("http://ec2-65-1-85-153.ap-south-1.compute.amazonaws.com:27017", { 
//   useNewUrlParser: true
// });
// const con = Mongoose.connection;
// con.on('open',function(){
  console.log('sssssssssss');
// });

app.listen(3000,()=>{
  console.log("on port 3000!")
})