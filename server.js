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

function introQuestion() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'intro',
            message: 'Hello. Please make a selection:',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Quit'
            ]
        }
    ])
}
