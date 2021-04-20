DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE emp_role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES emp_role(id)
);

INSERT INTO department (department_name)
VALUES ('Sales'),('Engineering'),('Accounting'),('Legal Team');
SELECT * FROM department;
INSERT INTO emp_role (title,salary,department_id)
VALUES ('Sales Lead','60000','1'),
('Salesperson','40000','1'),
('Lead Engineer','100000','2'),
('Software Engineer','80000','2'),
('Accountant','60000','3'),
('Legal Team Lead','90000','4'),
('Lawyer','70000','4');
SELECT * FROM emp_role;
SELECT * FROM employee;