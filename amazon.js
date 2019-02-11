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
            // console.log(results);
            for (var i = 0; i < results.length; i++) {
                console.log('--------------------');
                console.log('Product ID: ' + results[i].id);
                console.log('Product: ' + results[i].product_name);
                console.log('Price: ' + results[i].price);
                console.log('Quantity ' + results[i].inventory);
            }
            purchase();

        });
    // inquirer
    //     .prompt([{
    //         name: 'productId',
    //         type: 'input',
    //         message: "What product would you like to buy?"

    //     }, {
    //         name: 'quantity',
    //         type: 'input',
    //         message: "How many would like to buy?"
    //     },
    //     ]).then(function (answer) {
    //         console.log(answer);
    //         connection.query(
    //             'SELECT * FROM products WHERE id=' + answer.productId, function (err, results) {
    //                 if (err) throw err;
    //                 console.log(results);
    //             }
    //         );
    //     });
}
function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole number.';
    }
}
function purchase() {
    inquirer.prompt([{
        type: 'input',
        name: 'product_id',
        message: 'Select product id of item you would like to buy.',
        validate: validateInput,
    },
    {
        type: "input",
        name: "quantity",
        message: "How many of this item would you like to purchase?",
        validate: validateInput,

    }
    ]).then(function (purchase) {
        var item = purchase.product_id;
        var quantity = purchase.quantity;

        connection.query('SELECT * FROM products WHERE ?', { id: item }, function (err, results) {
            if (err) throw err;
            if (results.length === 0) {
                console.log("ERROR: Please select a valid product id.");
                start();
            } else {
                var productInfo = results[0];

                if (quantity <= productInfo.inventory) {
                    console.log(productInfo.product_name + 'is available.  Placing your order.');
                    var updateQuery = "UPDATE products SET inventory = " +
                        (productInfo.inventory - quantity) + " WHERE id = " + item;

                    connection.query(updateQuery, function (err, data) {
                        if (err) throw err;
                        console.log("Your order has been placed!");
                        console.log("Your total is $" + productInfo.price * quantity);
                        console.log("Thank you for shopping with us!");
                        console.log(" - - - - - - - - - - - - - - - ");
                        console.log("To shop again with us please input 'node amazon.js' into your command line.");
                        console.log("\n");

                        connection.end();
                    });
                } else {
                    console.log('There is not enough ' + productInfo.product_name + ' in stock');
                    console.log("Your order can not be placed as is.");
                    console.log("Please modify your order or select another item.");
                    setTimeout(function() { start() }, 3000);
                }
            }

        });
    });
}