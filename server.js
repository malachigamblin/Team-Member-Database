const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const db = mysql.Connection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "team_members_db",
  },
  console.log(`Connecting to the Team Memebers Database...`)
);

db.connect(function (err) {
  if (err) throw err;
  console.log("*****************************************");
  console.log("           TEAM MEMBERS DATABASE          ");
  console.log("*****************************************");
  introQuestion();
});

function introQuestion() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "intro",
        message: "Hello. Please make a selection:",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.intro) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployess();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addAnEmployee();
          break;
        case "Update an employee role":
          updateAnEmployee();
          break;
        case "Exit":
          console.log("Good-Bye!");
          db.exit();
          break;
      }
    });
}
