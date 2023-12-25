require('dotenv').config();

const express = require('express');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const PORT = 3000;

var bodyParser = require('body-parser');
const mysql = require('mysql');
var session = require('express-session');
var app = express();

app.set('view engine','pug');
app.use(express.static('src'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

var con = mysql.createConnection({
    host: 'db-mysql-nyc1-91845-do-user-13696149-0.b.db.ondigitalocean.com',
    port : '25060',
    user: 'doadmin',
    password: 'console#1094',
    database: 'vaikunthsthan',
    multipleStatements: true,
});

con.connect((err)=> {
if(!err)
    console.log('Connection Established Successfully');
else
    console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
});

function getLeads(){
    return new Promise(function(resolve, reject) {
        con.query('SELECT * FROM leadmaster',(err, rows) => {
        if (!err)
            resolve(rows);
        else
            reject(err);
        })
    });
}

function setLead(data){
    return new Promise(function(resolve, reject) {
        con.query(`Insert into leadmaster (name,email,phone,description) value ('${data.name}','${data.email}','${data.phone}','${data.description}');`,(err, rows) => {
        if (!err)
            resolve(rows);
        else
            reject(err);
        })
    })
}


app.listen(PORT,function(){
    console.log(`http:localhost:${PORT}`);
});

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'src/pages/index.html'));
})

app.post('/',function(req,res){
    jwt.verify(req.session.loginToken,process.env.ACCESS_TOKEN,(err, authData) => {
        if(err){
            res.redirect('/login');
        }else{
            getLeads().then((data)=>{
                res.json(data);
            },(err)=>{
                console.log(err);
            })
        }
    });
})

app.post('/contact',function(req,res){
    
    res.send(setLead(req.body));
})

app.get('/login',function(req,res){
    if(req.session.loginToken != undefined){
        res.redirect('/dashboard');
    }else{
        res.sendFile(path.join(__dirname,'src/pages/login.html'));
    }
})

app.post('/login',function(req,res){
    var user = req.body;
    if(user.email == 'vaibhav@gmail.com' && user.password == 'vaibhav@1234'){
        jwt.sign({user},process.env.ACCESS_TOKEN,(err,token)=>{
            req.session.loginToken = token;
            res.json({
                token
            });
        });
    }else{
        res.json({
            auth : false,
            message : 'Invalid Login'
        });
    }
})

app.get('/logout',function(req,res){
    req.session.destroy();
    res.sendFile(path.join(__dirname,'src/pages/login.html'));
})

app.get('/dashboard', verifyToken,function(req,res){
    jwt.verify(req.token,process.env.ACCESS_TOKEN,(err, authData) => {
        if(err){
            res.redirect('/login');
        }else{
            res.sendFile(path.join(__dirname,'src/pages/dashboard.html'));
        }
    });
})

function verifyToken(req,res,next){
    const token = req.session.loginToken;
    if(typeof token !== 'undefined'){
        req.token = token;
        next();
    }else{
        res.redirect('/login');
    }
}