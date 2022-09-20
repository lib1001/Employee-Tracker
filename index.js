const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable= require('console.table');


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
    );

    db.connect(function (err) {
        if (err) throw err;
        menu();
    });


  const menu = () => {
    inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'options',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee',  "I'm done!"]
        },
    )
    .then(response => {
        switch (response.options) {
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
            // case 'Update an employee role':
            //     return updateRole();
            //     break;
            default:
                return console.log('All set!');
                break; //how to exit out when done?
        }
    })
};




const viewDepts = () => {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err; 
        console.table(res);
        menu();
    });
  };


const viewRoles = () => {
    db.query('SELECT * FROM role', (err, res) => {
        if (err) throw err; 
        console.table(res);
        menu();
    });
};

const viewEmployees = () => {
    db.query("SELECT * FROM employee",
         (err, res) => {
        if (err) throw err; 
        console.table(res);
        menu();
    });
};

const addDept = () => {
    inquirer.prompt(
        {
            type: 'input',
            message: 'Enter the department name you would like to add.',
            name: 'deptName'
        })
        .then(response => {
            db.query('INSERT INTO department(name) VALUES (?)', response.deptName, (err, res) => {
                if (err) throw err;           
                console.table(res);
                menu();
        });
    })
};

