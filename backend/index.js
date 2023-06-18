const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./userdetailschema');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const { body,matchedData,validationResult } = require('express-validator');

app.use(cors());
dotenv.config();

const url = process.env.URL;
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(fileUpload());


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connected");
    })
    .then(() => {
        app.listen(port);
        console.log("Server connected to port " + port);
    })
    .catch((err) => {
        console.log(err);
    })

const emailverify = body('email').isEmail();
const mobilenumberverify = body('mobilenumber').isInt().isLength({min:10,max:10});
const ageverify = body('age').isInt().isLength({min:1,max:3});

app.get('/', async (req, res) => {

    try {
        let doc = await User.find();
        res.send(doc);

    } catch (err) {
        console.log(err)
    }
})

app.post('/adduserdetail',emailverify,mobilenumberverify,ageverify, async (req, res) => {

    const result = validationResult(req); 
  
  if (result.isEmpty()) {
    const {
        fullname,
        gender,
        age,
        email,
        address,
        mobilenumber } = req.body;
    let profilepic = Date.now();
    try {
        if (fullname && gender && age && email && address && mobilenumber && req.files.uploadimage) {
            let doc = new User({
                fullname,
                gender,
                age,
                email,
                address,
                mobilenumber,
                profilepic
            });
            doc.save();

            let imagepath = req.files.uploadimage;
            imagepath.mv(__dirname + "/uploads/" + profilepic, (err) => {
                console.log(err);
            })
            res.send("success");
        } else {
            res.send("data error");
        }



    } catch (err) {
        console.log(err);
    }

}else{
    const data = matchedData(req);
    if(!data.email){
      res.send('check email address');
    }else if(!data.mobilenumber){
        res.send('check mobile number length');
    }else if(!data.age){
        res.send('check age');
    }
}
})


app.post('/edituserdetail',emailverify,mobilenumberverify,ageverify, async (req, res) => {
    const result = validationResult(req); 
  
    if (result.isEmpty()) {
    const {
        fullname,
        gender,
        age,
        email,
        address,
        mobilenumber,
        userid,
        imagename
    } = req.body;

    try {
        if (req.files) {
            let imagenamenew = Date.now();
            let imagepath = req.files.uploadimage;
            imagepath.mv(__dirname + "/uploads/" + imagenamenew, (err) => {
                console.log(err);
            })
            
            let doc = await User.findByIdAndUpdate(userid, {
                fullname,
                gender,
                age,
                email,
                address,
                mobilenumber,
                profilepic: imagenamenew
            });
            doc.save();
            res.send("success");
            fs.unlinkSync(`./uploads/${imagename}`);
        } else if (fullname && gender && age && email && address && mobilenumber) {
            let doc = await User.findByIdAndUpdate(userid, {
                fullname,
                gender,
                age,
                email,
                address,
                mobilenumber,
                profilepic: imagename
            });
            doc.save();
            res.send("success");
        }
    } catch (err) {
        console.log(err);
    }
}else{
    const data = matchedData(req);
    if(!data.email){
      res.send('check email address');
    }else if(!data.mobilenumber){
        res.send('check mobile number length');
    }else if(!data.age){
        res.send('check age');
    }
}
})


app.post('/deleteuserdetail', async (req, res) => {

    try {
        const { userid } = req.body;
        let doc = await User.findById(userid);
        await User.findByIdAndRemove(userid);
        res.send("success");
        fs.unlinkSync(`./uploads/${doc.profilepic}`);

    } catch (err) {
        console.log(err);
    }
})


app.get('/photos', async (req, res) => {
    try {
        let result = await User.find({ profilepic: req.query.source })
        if (result.length === 1) {
            res.sendFile(__dirname + '/uploads/' + req.query.source);
        }

    } catch (err) {
        console.log(err)
    }
})