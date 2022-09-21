const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.\n`)
);

db.connect(function (err) {
  if (err) throw err;
  menu();
});

const menu = () => {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "options",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "I'm done!",
      ],
    })
    .then((response) => {
      switch (response.options) {
        case "View all departments":
          return viewDepts();
          break;
        case "View all roles":
          return viewRoles();
          break;
        case "View all employees":
          return viewEmployees();
          break;
        case "Add a department":
          return addDept();
          break;
        case "Add a role":
          return addRole();
          break;
        case "Add an employee":
          return addEmployee();
          break;
        case "Update an employee role":
            return updateRole();
            break;
        case "I'm done!":
            return db.end();
            break;
        default:
          return '';
          break;
      }
    });
};

const viewDepts = () => {
  db.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;
    console.table(res);
    menu();
  });
};

const viewRoles = () => {
  db.query(
    `SELECT role.id,
    role.title,
    department.name AS department,
    role.salary
    FROM role 
    JOIN department ON role.department_id=department.id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      menu();
    }
  );
};

const viewEmployees = () => {
  db.query(
    `SELECT employee.id,
  employee.first_name,
  employee.last_name, 
  role.title,
  department.name AS department,
  role.salary,CONCAT(e.first_name,' ',e.last_name ) AS manager 
  FROM employee 
  JOIN role ON employee.role_id = role.id
  JOIN department ON department.id = role.department_id
  LEFT JOIN employee e ON employee.manager_id = e.id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      menu();
    }
  );
};

const addDept = () => {
  inquirer
    .prompt({
      type: "input",
      message: "Enter the department name you would like to add.",
      name: "deptName",
    })
    .then((response) => {
      db.query(
        `INSERT INTO department(name) VALUES (?)`,
        response.deptName,
        (err, res) => {
          if (err) throw err;
          console.log('Department has been added!\n');
          menu();
        }
      );
    });
};

const addRole = () => {
    inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the role you would like to add:",
        name: "roleTitle",
      },
      {
        type: "input",
        message: "Enter the salary of your new role:",
        name: "roleSalary",
      },
      {
        type: "input",
        message: "Enter the department id number for the new role:",
        name: "roleDept",
      },
    ])
    .then((response) => {
      db.query(
        `INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)`,
        [response.roleTitle, response.roleSalary, response.roleDept],
        (err, res) => {
          if (err) throw err;
          console.log('Role has been added!\n');
          menu();
        }
      );
    });
};

const addEmployee = () => {
    inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the FIRST NAME of the employee you would like to add:",
        name: "firstName",
      },
      {
        type: "input",
        message: "Enter the LAST NAME of the employee you would like to add:",
        name: "lastName",
      },
      {
        type: "input",
        message: "Enter the role number of the employee you would like to add:",
        name: "employeeRole",
      },
      {
        type: "input",
        message:
          "Enter the manager id number for the employee you would like to add:",
        name: "employeeManager",
      },
    ])
    .then((response) => {
      db.query(
        `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
        [
          response.firstName,
          response.lastName,
          response.employeeRole,
          response.employeeManager,
        ],
        (err, res) => {
          if (err) throw err;
          console.log('Employee has been added!\n');
          menu();
        }
      );
    });
};

const updateRole = () => {
    inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee is changing roles?",
        name: "empRole",
        choices: ["John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Kunal Singh", "Malia Brown", "Sarah Lourd", "Tom Allen"],
      },
      {
        type: "input",
        message: "Enter the employee's new role number:",
        name: "newRole",
      },
    ])
    .then((response) => {
        db.query(`UPDATE employee SET role_id = ? WHERE first_name = ?`, 
        [
            response.newRole,
            response.empRole,
        ],
        (err, res) => {
            if (err) throw err;
            console.log('Employee role has been updated!\n');
            menu();
          }
        );
      });
  };