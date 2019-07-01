'user strict';
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'arka'
})

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = { 
    secret: 'FLUTTER' ,
    db : connection
};