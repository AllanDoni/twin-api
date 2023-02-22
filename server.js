const Mongoose = require("Mongoose");
const express = require("express");
const mongoUrl = "mongodb://localhost:27017/twin";
const app=express();
// Mongoose.set("strictQuery", false);
Mongoose.set("strictQuery", false);
// Mongoose.connect(mongoUrl, {useNewUrlParser: true})
Mongoose.connect("mongodb://localhost:27017/twin", { 
  useNewUrlParser: true
});
// const con = Mongoose.connection;
// con.on('open',function(){
  console.log('sssssssssss');
// });

app.listen(3000,()=>{
  console.log("on port 3000!")
})