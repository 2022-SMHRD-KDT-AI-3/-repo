const mysql = require("mysql");

let conn = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : '1234',
    port : '3306',
    database : 'nodejs',
    multipleStatements: true
});

// let conn = mysql.createConnection({
//    host : 'project-db-stu.ddns.net', //ip 주소
//    user : 'campus_g_0325_1', // id
//    password : 'smhrd1', // 비밀번호
//    port : '3307', // 포트 번호
//    database : 'campus_g_0325_1', // 저장할 데이터베이스 이름
//    multipleStatements: true
// });

conn.connect();

module.exports = conn;