const mysql = require('mysql');

var con = mysql.createConnection({
    host: 'db-mysql-nyc1-91845-do-user-13696149-0.b.db.ondigitalocean.com',
    port : 25060,
    user: 'doadmin',
    password: 'AVNS_9S00z4GEMdynVI7UWcM',
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
    con.query('SELECT * FROM leadmaster',(err, rows) => {
    if (!err)
        res.send(rows);
    else
        console.log(err);
    })
}

function setLead(data){
    con.query(`Insert into leadmaster (name,email,phone,description) value ('${data.name}','${data.email}','${data.phone}','${data.description}');`,(err, rows) => {
    if (!err)
        res.send(rows);
    else
        console.log(err);
    });
}


// create database vaikunthsthan;
// use vaikunthsthan;

// create table leadmaster(
//     id int auto_increment primary key,
//     name varchar(100),
//     email varchar(100),
//     phone varchar(16),
//     description text,
//     created_date timestamp DEFAULT CURRENT_TIMESTAMP);

