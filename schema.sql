DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE emp_role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

SELECT * FROM employee;
SELECT * FROM emp_role;
SELECT * FROM department;