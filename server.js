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

function viewAllDepartments() {
  const sql = `SELECT department.id, department.name AS Department FROM department;`;
  db.query(sql, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(res);
    introQuestion();
  });
}

function viewAllRoles() {    
    const sql = `SELECT role.id, role.title AS role,role.salary, department.name AS department FROM role INNER JOIN department ON (department.id = role.repartment_id)`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(res);
        introQuestion();
    })
}


function viewAllEmployess() {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN employee manager on manager.id = employee.manager_id INNER JOIN role ON (role.id = employee.role_id) INNER JOIN department ON (department.id = role.department_id) ORDER BY employee.id;`;
  db.query(sql, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(res);
    introQuestion();
  });
}

