CREATE TABLE products (
    id SERIAL PRIMARY  KEY,
    category_id INT NULL REFERENCES categories (id),
    name VARCHAR(150) NOT NULL,
    price NUMERIC(5,2)
);