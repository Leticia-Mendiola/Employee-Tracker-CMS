USE employee_trackerDB;

INSERT INTO department (name)
VALUES ('Sales'),('Engineering'),('Accounting'),('Legal Team');

INSERT INTO employee_role (title,salary,department_id)
VALUES ('Sales Lead','60000','1'),
('Salesperson','40000','1'),
('Lead Engineer','100000','2'),
('Software Engineer','80000','2'),
('Accountant','60000','3'),
('Legal Team Lead','90000','4'),
('Lawyer','70000','4');