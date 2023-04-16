const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const db = mysql.Connection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'team_members_db',
    },
    console.log(`Connecting to the Team Memebers Database...`)
);

db.connect(function (err) {
    if (err) throw err;
    console.log("*****************************************");
    console.log("           TEAM MEMBER DATABASE          ");
    console.log("*****************************************");
    introQuestion();
});