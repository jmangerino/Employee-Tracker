// importing what I need to run the program
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { createConnection } = require('net');

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
                'and update and employee role'
            ]
        }
    ])
}