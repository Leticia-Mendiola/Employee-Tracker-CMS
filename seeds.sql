USE employee_trackerDB;

INSERT INTO department (name)
VALUES ('Sales'),('Engineering'),('Accounting'),('Legal Team');

INSERT INTO employee_role (title,salary,department_id)
VALUES ('Sales Lead','60,000','1'),
('Salesperson','40,000','1'),
('Lead Engineer','100,000','2'),
('Software Engineer','80,000','2'),
('Accountant','60,000','3'),
('Legal Team Lead','90,000','4'),
('Lawyer','70,000','4');