DROP DATABASE IF EXISTS amazon_DB;
CREATE DATABASE amazon_DB;

USE amazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  dept_name VARCHAR(45) NOT NULL,
  price DECIMAL (10, 2) default 0,
  inventory INT default 0,
  PRIMARY KEY (id)
);
INSERT INTO products(product_name, dept_name, price, inventory)
VALUES ('table', 'furniture', 10.00, 5);

INSERT INTO products(product_name, dept_name, price, inventory)
VALUES ('chair', 'furniture', 15.00, 3);

INSERT INTO products(product_name, dept_name, price, inventory)
VALUES ('computer', 'electronics', 100.00, 5);

INSERT INTO products(product_name, dept_name, price, inventory)
VALUES ('headphones', 'electronics', 50.00, 10);