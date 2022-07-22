INSERT INTO department (name)
VALUES 
('Sales')
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Account Manager', 250000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, department_name, salary, manager)
VALUES
('John', 'Doe', 1, 'Sales Lead', 100000, null),
('Mike', 'Chan', 1, 'Salesperson', 80000, 'John Doe'),
('Ash', 'Robin', 2, 'Lead Engineer', 150000, null),
('Kevin', 'Tull', 2, 'Software Engineer', 120000, 'Ash Robin'),
('Jason', 'King', 3, 'Account Manager', 250000, null),
('Bob', 'Man', 3, 'Accountant', 125000, 'Jason King'),
('Sarah', 'Lord', 4, 'Legal Team Lead', 250000, null),
('Tom', 'Allen', 4, 'Lawyer', 190000, 'Sarah Lord');