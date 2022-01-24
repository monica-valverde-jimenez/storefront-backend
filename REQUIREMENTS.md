# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. This project will support API requirements.


## API tool recomendations

Using Postman for Endpoint Testing. Postman is a free tool that's extremely helpful for building out APIs.

### Installation
Postman is available for download from `open https://www.postman.com/downloads/` it is available for Windows, Mac, and Linux machines.

### Collections
Please see postman collections API in `Frontend-store.postman_collection.json` file in root project, importing with postman will help to run scripts from the API.

## API Endpoints

For this guide, it is using http://localhost:3000 as server URL, it should be replace with the correct DNS. Also this documentation can be visible in postman collection.

#### Authentication
For security reasons some API calls requires a token to be sent in API headers. To get a token use:
```
API URL: http://localhost:3000/users/authenticate
Method: POST
Query Params - Raw Json:
{
    "username":  [ Username - Type field: string ],
  "password":  [ Password - Type field: string ]
}
```
Result:
{
    "token": "token-to-be-use-in-headers"
}

#### Users
Users maintenance API requests.

##### Create
To create a new user use:
```
API URL: http://localhost:3000/users 
Method: POST
Request Headers:
    authorization: Bearer [auhorization-token]
Query Params - Raw Json:
{
  "firstName": [ User firstname - Type field: string ],
  "lastName":  [ User lastName - Type field: string ],
  "username":  [ Username - Type field: string ],
  "password":  [ Password - Type field: string ]
}
```

##### List
To list users:
```
API URL: http://localhost:3000/users
Method: GET
Request Headers:
    authorization: Bearer [auhorization-token]
```

##### Update
To update a specific user:
```
API URL: http://localhost:3000/users
Method: PUT
Request Headers:
    authorization: Bearer [auhorization-token]
Query Params - Raw Json:
{
  "firstName": [ User firstname - Type field: string ],
  "lastName":  [ User lastName - Type field: string ],
  "username":  [ Username - Type field: string ],
  "password":  [ Password - Type field: string ]
}
```

##### Delete
To delete a specific user:
```
API URL: http://localhost:3000/users
Method: DELETE
Query Params - Raw Json:
{
  "id": [ User id - Type field: int ]
}
```

#### Categories
Products can be set with a category, categories should be created and be available to clasify a product. To mantenain this catalog, API gives the following requests:

##### Create
To create a new category use:
```
API URL: http://localhost:3000/categories 
Method: POST
Query Params - Raw Json:
{
  "name": [ Category name - Type field: string ]
}
```

##### List
To list categories list:
```
API URL: http://localhost:3000/categories
Method: GET
```

##### Update
To update a specific category:
```
API URL: http://localhost:3000/categories
Method: PUT
Query Params - Raw Json:
{
  "id": [ Category id - Type field: int ],
  "name": [ Category name - Type field: string ]
}
```

##### Delete
To delete a specific category:
```
API URL: http://localhost:3000/categories
Method: DELETE
Query Params - Raw Json:
{
  "id": [ Category id - Type field: int ]
}
```

#### Products

##### Index
To list products:
```
API URL: http://localhost:3000/products
Method: GET
```

##### Show
To get a product:
```
API URL: http://localhost:3000/products/[product id]
Method: GET
Sample URL: http://localhost:3000/products/1
```

##### Create
To create a new product:
```
API URL: http://localhost:3000/products
Method: POST
Request Headers:
    authorization: Bearer [auhorization-token]
Query Params - Raw Json:
{
  "categoryId": [Category id - Type field: int, it can be Null],
  "name": [Product name - Type field: string],
  "price": [Price - Type field: Float]
}
```

##### Top 5 most popular products 
Report to get most popular products, For complete orders or active orders:
```
API URL: http://localhost:3000/products/list/popular/complete
API URL: http://localhost:3000/products/list/popular/active
Method: GET
```

##### Products by category 
Report to get products in a category, if category is null product will be not displayed:
```
API URL: http://localhost:3000/products/list/product/[category_id]
Method: GET
```

#### Orders
##### Create an Orders
To create a new order:
```
API URL: http://localhost:3000/orders
Method: POST
Request Headers:
    authorization: Bearer [auhorization-token]
Query Params - Raw Json:
{
  "userId": [User id - Type field: int],
  "status": [Order status  - Type field: string - It must be active or complete]
}
```

##### Update a Order
To update order status:
```
API URL: http://localhost:3000/orders
Method: Put
Request Headers:
    authorization: Bearer [auhorization-token]
Query Params - Raw Json:
{
  "orderId": [Order id - Type field: int],
  "status": [Order status  - Type field: string - It must be active or complete]
}
```

##### Add product to a Order
To add a product to an order:
```
API URL: http://localhost:3000/orders
Method: Put
Request Headers:
    authorization: Bearer [auhorization-token]
Query Params - Raw Json:
{
  "productId": [Product id - Type field: int],
  "orderId": [Order id - Type field: int],
  "quantity": [Quasntity id - Type field: float]
}
```

##### Current order by user
To get an order from an user:
```
API URL: http://localhost:3000/products/list/order/active/[userId]
Method: GET
Request Headers:
    authorization: Bearer [auhorization-token]
```

##### Complete orders by user
To get an order from an user:
```
API URL: http://localhost:3000/products/list/order/complete/[userId]
Method: GET
Request Headers:
    authorization: Bearer [auhorization-token]
```

## Database Shema

shopping
  |_ Tables
        |
        |_  categories
            users
            products
            orders
            order_products


## Database Shape

### Users

     Column      |          Type          | Collation | Nullable |              Default
-----------------+------------------------+-----------+----------+-----------------------------------
 id              | integer                |           | not null | nextval('users_id_seq'::regclass)
 first_name      | character varying(100) |           | not null | 
 last_name       | character varying(100) |           |          |
 username        | character varying(100) |           | not null |
 password_digest | character varying      |           | not null |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

### Categories

 Column |          Type          | Collation | Nullable |                Default
--------+------------------------+-----------+----------+----------------------------------------
 id     | integer                |           | not null | nextval('categories_id_seq'::regclass)
 name   | character varying(100) |           |          |
Indexes:
    "categories_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "products" CONSTRAINT "products_category_id_fkey" FOREIGN KEY (category_id) REFERENCES categories(id)

### Products

   Column    |          Type          | Collation | Nullable |               Default
-------------+------------------------+-----------+----------+--------------------------------------
 id          | integer                |           | not null | nextval('products_id_seq'::regclass)
 category_id | integer                |           |          |
 name        | character varying(150) |           | not null |
 price       | numeric(5,2)           |           |          |
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "products_category_id_fkey" FOREIGN KEY (category_id) REFERENCES categories(id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

### Orders

 Column      |       Type        | Collation | Nullable |              Default
-----------------+-------------------+-----------+----------+------------------------------------
 id              | integer           |           | not null | nextval('orders_id_seq'::regclass)
 user_id         | integer           |           | not null |
 category_status | character varying |           | not null |
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Check constraints:
    "orders_category_status_check" CHECK (category_status::text = 'active'::text OR category_status::text = 'complete'::text)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)

### Orders detail

   Column   |  Type   | Collation | Nullable |                  Default
------------+---------+-----------+----------+--------------------------------------------
 id         | integer |           | not null | nextval('order_products_id_seq'::regclass)
 quantity   | integer |           | not null |
 order_id   | integer |           | not null |
 product_id | integer |           | not null |
Indexes:
    "order_products_pkey" PRIMARY KEY, btree (id)
Check constraints:
    "order_products_quantity_check" CHECK (quantity >= 0)
Foreign-key constraints:
    "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

