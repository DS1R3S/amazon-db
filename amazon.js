var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "amazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.log("Successful connection");
    start();
});
// function prompts user to buy a product
function start() {
    connection.query(
        'SELECT * FROM products', function (err, results) {
            if (err) throw err;
            console.log(results);

        });
    inquirer
        .prompt([{
            name: 'productId',
            type: 'input',
            message: "What product would you like to buy?"

        }, {
            name: 'quantity',
            type: 'input',
            message: "How many would like to buy?"
        },
        
           
    
    
    ]).then(function(answer){
        console.log(answer);
        connection.query(
            'SELECT * FROM products WHERE id=' + answer.productId, function (err, results) {
                if (err) throw err;
                console.log(results);
            }
        );
    });
    
    
}