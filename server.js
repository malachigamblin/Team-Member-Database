const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");
const db = mysql.createConnection(
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
          updateAnEmployeeRole();
          break;
        case "Exit":
          console.log("Good-Bye!");
          db.end();
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
  const sql = `SELECT role.id, role.title AS role, role.salary, department.name AS department FROM role INNER JOIN department ON (department.id = role.department_id);`;
  db.query(sql, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(res);
    introQuestion();
  });
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

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Please enter the name of the department that you want to add:",
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department(name) VALUES('${answer.department}');`;
      db.query(sql, (err, res) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(answer.department + " has been added to the database!");
        introQuestion();
      });
    });
}

function addRole() {
  const sql2 = `SELECT * FROM department`;
  db.query(sql2, (error, response) => {
    departmentList = response.map((departments) => ({
      name: departments.name,
      value: departments.id,
    }));
    return inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the role that you want to add?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary role that you are adding?",
        },
        {
          type: "list",
          name: "department",
          message:
            "Which Department does the role that you are adding belong to?",
          choices: departmentList,
        },
      ])
      .then((answers) => {
        const sql = `INSERT INTO role SET title='${answers.title}', salary= ${answers.salary}, department_id= ${answers.department};`;
        db.query(sql, (err, res) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log(answers.title + " has been added to the database!");
          introQuestion();
        });
      });
  });
}
function addAnEmployee() {
  const sql2 = `SELECT * FROM employee`;
  db.query(sql2, (error, response) => {
    employeeList = response.map((employees) => ({
      name: employees.first_name.concat(" ", employees.last_name),
      value: employees.id,
    }));

    const sql3 = `SELECT * FROM role`;
    db.query(sql3, (error, response) => {
      roleList = response.map((role) => ({
        name: role.title,
        value: role.id,
      }));
      return inquirer
        .prompt([
          {
            type: "input",
            name: "first",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "last",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "role",
            message: "What is the employee's role?",
            choices: roleList,
          },
          {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: employeeList,
          },
        ])
        .then((answers) => {
          const sql = `INSERT INTO employee SET first_name='${answers.first}', last_name= '${answers.last}', role_id= ${answers.role}, manager_id=${answers.manager};`;
          db.query(sql, (err, res) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log(
              "Added " +
                answers.first +
                " " +
                answers.last +
                " to the database!"
            );
            introQuestion();
          });
        });
    });
  });
}

function updateAnEmployeeRole() {
  const sql2 = `SELECT * FROM employee`;
  db.query(sql2, (error, response) => {
    employeeList = response.map((employees) => ({
      name: employees.first_name.concat(" ", employees.last_name),
      value: employees.id,
    }));
    const sql3 = `SELECT * FROM role`;
    db.query(sql3, (error, response) => {
      roleList = response.map((role) => ({
        name: role.title,
        value: role.id,
      }));
      return inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Which employee's role do you want to update?",
            choices: employeeList,
          },
          {
            type: "list",
            name: "role",
            message: "Which role do you want to assign the selected employee?",
            choices: roleList,
          },
          {
            type: "list",
            name: "manager",
            message:
              "Please select the employee of the manager that you are adding:",
            choices: employeeList,
          },
        ])
        .then((answers) => {
          const sql = `UPDATE employee SET role_id= ${answers.role}, manager_id=${answers.manager} WHERE id =${answers.employee};`;
          db.query(sql, (err, res) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("Employee role has been updated!");
            introQuestion();
          });
        });
    });
  });
}
