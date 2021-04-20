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
  database: 'top_songsdb',
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
  connection.query('SELECT * FROM top5000 LIMIT 50', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    console.log("____________________________________________________________________________________________________________________________________");
    initPrompt();
  });
};

const viewAllDept = () => {
  const query =
    'SELECT * FROM top5000 ORDER BY artist LIMIT 50';
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
      name: 'item',
      type: 'input',
      message: 'What is the item you would like to submit?',
    },
    {
      name: 'category',
      type: 'input',
      message: 'What category would you like to place your auction in?',
    },
    {
      name: 'startingBid',
      type: 'input',
      message: 'What would you like your starting bid to be?',
      validate(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      },
    },
  ])
  .then((answer) => {
    // when finished prompting, insert a new item into the db with that info
    connection.query(
      'INSERT INTO auctions SET ?',
      // QUESTION: What does the || 0 do?
      {
        item_name: answer.item,
        category: answer.category,
        starting_bid: answer.startingBid || 0,
        highest_bid: answer.startingBid || 0,
      },
      (err) => {
        if (err) throw err;
        console.log('Your auction was created successfully!');
        // re-prompt the user for if they want to bid or post
        start();
      }
    );
  });
};

const updateEmployee = () => {
  connection.query('SELECT * FROM auctions', (err, results) => {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: 'choice',
          type: 'rawlist',
          choices() {
            const choiceArray = [];
            results.forEach(({ item_name }) => {
              choiceArray.push(item_name);
            });
            return choiceArray;
          },
          message: 'What auction would you like to place a bid in?',
        },
        {
          name: 'bid',
          type: 'input',
          message: 'How much would you like to bid?',
        },
      ])
      .then((answer) => {
        // get the information of the chosen item
        let chosenItem;
        results.forEach((item) => {
          if (item.item_name === answer.choice) {
            chosenItem = item;
          }
        });

        // determine if bid was high enough
        if (chosenItem.highest_bid < parseInt(answer.bid)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            'UPDATE auctions SET ? WHERE ?',
            [
              {
                highest_bid: answer.bid,
              },
              {
                id: chosenItem.id,
              },
            ],
            (error) => {
              if (error) throw err;
              console.log('Bid placed successfully!');
              start();
            }
          );
        } else {
          // bid wasn't high enough, so apologize and start over
          console.log('Your bid was too low. Try again...');
          start();
        }
      });
  });
};

const deleteEmployee = () => {
  inquirer
    .prompt({
      name: 'song',
      type: 'input',
      message: 'What song would you like to look for?',
    })
    .then((answer) => {
      console.log('Deleting all strawberry icecream...\n');
      connection.query(
        'DELETE FROM products WHERE ?',
        {
          flavor: 'strawberry',
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} products deleted!\n`);
          // Call readProducts AFTER the DELETE completes
          readProducts();
        }
      );
    });
};
