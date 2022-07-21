const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { createConnection } = require('net');

require('dotenv').config();

const connectino = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_db'
});

createConnection.connect(err => {
    if (err) throw err;
    afterConnection();
});