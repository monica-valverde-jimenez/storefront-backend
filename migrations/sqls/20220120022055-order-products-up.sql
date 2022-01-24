CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity INT NOT NULL CHECK (quantity >= 0),
    order_id INT NOT NULL REFERENCES orders(id),
    product_id INT NOT NULL REFERENCES products(id)
);