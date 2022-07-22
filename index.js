// importing what I need to run the program
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');


// requiring the env file for confidential information
require('dotenv').config();

// creating the connection to mysql database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_db'
});

connection.connect(err => {
    if (err) throw err;
    promptUser();
});

// using inquirer to prompt the options in the command line for the user to pick
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
    ]) .then(answers => {
        switch (answers.options) {
            case 'view all departments':
                showDepartment()
                break

            case 'view all roles':
                showRoles()
                break

            case 'view all employess':
                showEmployess()
                break

            case 'add a department':
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
    })
};

// showing the department table
showDepartment = () => {
    let allDepartments = `SELECT * FROM department`
    connection.query(allDepartments, (err, resutls) => {
        if (err) throw err;
        console.log(`/n`)
        console.table(resutls);
        promptUser();
    })
};

// showing the roles table
showRoles = () => {
    let allRoles = `SELECT * FROM role`;
    connection.query(allRoles, (err, resutls) => {
        if (err) throw err;
        console.log(`/n`);
        console.table(resutls);
        promptUser();
    })
};

// showing the employees table
showEmployess = () => {
    let allEmployess = `SELECT * FROM employee`;
    connection.query(allEmployess, (err, resutls) => {
        if (err) throw err;
        console.log(`/n`);
        console.table(resutls);
        promptUser();
    })
};

// adding a department
addDepartment = () => {
    inquirer.prompt([
        {
            name: 'deptName',
            type: 'input',
            message: 'What department do you want to add?'
        },
    ])
    .then(answers => {
        let addDept = `INSERT INTO department (name) VALUES (?)`;
        connection.query(addDept, answers.deptName, (err, resutls) => {
            if (err) throw err;
            console.log(`Added ${answers.deptName} to departments`);
        })
    })
};

// adding a role
addRole = () => {
    inquirer.prompt([
        {
            name: 'role',
            type: 'input',
            message: 'What role would you like to add?'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary for the role?'
        },
    ])
    .then(answers => {
        const params = [answers.role, answers.salary];

        const roleTable = `SELECT name, id FROM department`;
        connection.query(roleTable, (err, resutls) => {
            if (err) throw err;

            const dept = resutls.map(({ name, id }) => ({ name: name, value: id }));

            inquirer.prompt([
                {
                    name: 'dept',
                    type: 'list',
                    message: 'What department is this role in',
                    choices: dept
                },
            ])
            . then(deptChoice => {
                const dept = deptChoice.dept;
                params.push(dept);

                const sql = `INSERT INTO role (title, salary, department_id) Values (?, ?, ?)`;
                connection.query(sql, params, (err, resutls) => {
                    if (err) throw err;
                    console.log(`Added ${answers.role} to roles`);

                    promptUser();
                });
            })
        })
    })
};

// adding an employee
addEmployee = () => {
    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: "What is the employee's first name"
        },
        {
            name: 'lastName',
            type: 'input',
            message: "What is the employee's last name"
        },
    ]) 
    .then(answers => {
        const params = [answers.firstName, answers.lastName]

        const rolesql = `SELECT role.id, role.title FROM role`;
        connection.query(rolesql, (err, resutls) => {
            if (err) throw err;

            const roles = resutls.map(({ id, title }) => ({ name: title, value: id }));

            inquirer.prompt([
                {
                    name: 'role',
                    type: 'list',
                    message: "What is the employee's role?",
                    choices: roles
                },
            ])
            .then(roleChoice => {
                const role = roleChoice.role;
                params.push(role);

                const managerSql = `SELECET * FROM employee`;
                connection.query(managerSql, (err, resutls) => {
                    if (err) throw err;

                    const managers = resutls.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));

                    inquirer.prompt([
                        {
                            name: 'manager',
                            type: 'list',
                            message: 'Who is the manager?',
                            choices: managers
                        },
                    ])
                    .then(managerChoice => {
                        const manager = managerChoice.manager;
                        params.push(manager);

                        const sql = `INSERT INTO employee (first_name, last_name, role,id, manager_id) VALUES (?, ?, ?, ?)`;
                        connection.query(sql, params, (err, resutls) => {
                            if (err) throw err;
                            console.log('employee added');

                            promptUser();
                        })
                    })
                })
            })
        })
    })
}
