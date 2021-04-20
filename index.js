const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: 'root',
  // Your password
  password: 'basicpassword509',
  database: 'employee_trackerdb',
});

connection.connect((err) => {
  if (err) throw err;
  initPrompt();
});

const initPrompt = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View All Employees By Department',
        'Add Employee',
        'Update Employee Info',
        'Delete Employee',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View All Employees':
          viewAll();
          break;

        case 'View All Employees By Department':
          viewAllDept();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Update Employee Info':
          updateEmployee();
          break;

        case 'Delete Employee':
          deleteEmployee();
          break;

        case 'Exit':
          connection.end();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const viewAll = () => {
  connection.query('SELECT * FROM employee INNER JOIN', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    console.log("____________________________________________________________________________________________________________________________________");
    initPrompt();
  });
};

const viewAllDept = () => {
  const query =
    'SELECT * FROM employee ORDER BY department';
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    console.log("____________________________________________________________________________________________________________________________________");
    initPrompt();
  });
};

const addEmployee = () => {
  inquirer
  .prompt([
    {
      name: 'firstName',
      type: 'input',
      message: 'New Employee First Name?',
    },
    {
      name: 'lastName',
      type: 'input',
      message: 'New Employee Last Name?',
    },
    {
      name: 'role',
      type: 'list',
      message: 'New Employee Role?',
      choices: [
        'Sales Lead',
        'Salesperson',
        'Lead Engineer',
        'Software Engineer',
        'Accountant',
        'Legal Team Lead',
        'Lawyer',
      ],
    }
  ])
  .then((answer) => {
    connection.query(
      'INSERT INTO employee SET ?',
      {
        first_name: answer.firstName,
        last_name: answer.lastName,
        emp_role: answer.role,
      },
      (err) => {
        if (err) throw err;
        console.log('New Employee Added!');
        initPrompt();
      }
    );
  });
};

const updateEmployee = () => {
  connection.query('SELECT * FROM employee', (err, results) => {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: 'choice',
          type: 'rawlist',
          choices() {
            const choiceArray = [];
            results.forEach(({ first_name,last_name }) => {
              choiceArray.push(first_name,last_name);
            });
            return choiceArray;
          },
          message: 'Which Employee Would You Like To Update?',
        },
      ])
      .then((answer) => {
        // get the information of the chosen item
        let chosenItem;
        results.forEach((item) => {
          if (item.item_name === answer.choice) {
            chosenItem = item;
          }
          initPrompt();
        });
      });
  });
};

const deleteEmployee = () => {
  inquirer
    .prompt({
      name: 'firstName',
      type: 'input',
      message: 'First Name of Employee To Remove?',
    },
    {
      name: 'lastName',
      type: 'input',
      message: 'Last Name?',
    })
    .then((answer) => {
      console.log(`Deleting ${answer.firstName} ${answer.lastName}...\n`);
      connection.query(
        'DELETE FROM employee WHERE ?',
        {
          firstName: `${answer.firstName}`,
          lastName: `${answer.lastName}`
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} products deleted!\n`);
          initPromt();
        }
      );
    });
};
