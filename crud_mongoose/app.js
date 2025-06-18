const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userModel = require("./usermodel");  //imports mongoose model
mongoose.connect("mongodb+srv://sam:sam123@cluster0.0b81o8o.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));
app.get("/", function (req, res) {
  res.send("hey");
});

app.get("/create", async (req, res) => {
  let createduser = await userModel.create({  //asynchronous operation, so baad mei agar kuch likhege to wo pehle run ho jayega
                                              //to make it work one after other in order, we use async-await
    name: "vaibhav",
    email: "vaibhav@gmail.com",
    username: "vaibhav1",
  });

  res.send(createduser);
});

app.get("/update", async (req, res) => {
  let updateduser = await userModel.findOneAndUpdate(  //if two people with same usernme ezists, findOne returns the first one
    { username: "Samridhi1" }, //find krne k liye(username k basis p search kia)
    { name: "sam" },  //kya update krna h
    { new: true }  //you get the updates user
  );
  res.send(updateduser);
});

app.get("/read", async (req, res) => {
  let users = await userModel.find();  //find gives array, fineOne gives obj
  res.send(users);
});

app.get("/delete", async (req, res) => {
  let users = await userModel.findOneAndDelete({ username: "vaibhav1" });
  res.send(users);
});
app.listen(3000);