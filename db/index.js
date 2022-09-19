const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  const menu = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'options',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', "I'm done!"]
        },
    ])
    .then(response => {
        switch (response) {
            case 'View all departments':
                return viewDepts();
                break;
            case 'View all roles':
                return viewRoles();
                break;
            case 'View all employees':
                return viewEmployees();
                break;
            case 'Add a department':
                return addDept();
                break;
            case 'Add a role':
                return addRole();
                break;
            case 'Add an employee':
                return addEmployee();
                break;
            case 'Update an employee role':
                return updateRole();
                break;
            default:
                return 'All set!';
        }
    })
};

//call menu() at the end of each
viewDepts();
viewRoles();
viewEmployees();
addDept();
addRole();
addEmployee();
updateRole();