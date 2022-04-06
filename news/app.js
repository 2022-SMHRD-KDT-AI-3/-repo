const express = require("express");
const app = express();
const router = require("./router/router.js");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const session = require("express-session")
const session_mysql_save = require("express-mysql-session")

let DB_info = {

    host : '127.0.0.1',
    user : 'root',
    password : '1234',
    port : '3306',
    database : 'nodejs'

}


let s_m_s = new session_mysql_save(DB_info)

app.use(express.static("./public"));

app.set("view engine", "ejs");
app.use(session({
    secret : "smart",
    resave : false,
    saveUninitialized : true,
    store : s_m_s
}));
app.use(bodyparser.urlencoded({extended:false}));
app.use(router);
app.listen(3000);