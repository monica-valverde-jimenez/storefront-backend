CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    category_status VARCHAR NOT NULL CHECK (category_status = 'active' or category_status = 'complete'),
    FOREIGN KEY (user_id)
        REFERENCES users (id)
);