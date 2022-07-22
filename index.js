// importing what I need to run the program
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { createConnection } = require('net');
const { allowedNodeEnvironmentFlags } = require('process');

// requiring the env file for confidential information
require('dotenv').config();

// creating the connection to mysql database
const connectino = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_db'
});

createConnection.connect(err => {
    if (err) throw err;
    promptUser();
});

const promptUser = () => {
    inquirer.prompt ([
        {
            name: 'options',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'view all departments',
                'view all roles',
                'view all employess',
                'add a department',
                'add a role',
                'add an employee',
                'and update an employee role'
            ]
        }
    ]) .then(answers) => {
        switch (answers.options) {
            case "view all departments":
                showDepartment()
                break

            case "view all roles":
                showRoles()
                break

            case "view all employess":
                showEmployess()
                break

            case "add a department":
                addDepartment()
                break

            case 'add a role':
                addRole()
                break

            case 'add an employee':
                addEmployee()
                break

            case 'and update an employee role':
                updateRole()
                break
            }
    }
}