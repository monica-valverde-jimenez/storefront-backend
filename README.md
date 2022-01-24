# Storefront Backend Project

## Getting Started

This repo contains an API that supports online API request to support an application to add products, browser products and handle orders for a cart page.

Installation instructions below. Once you are up and running:
 * Find your way with the [Getting Started API Guide](REQUIREMENTS.md).

## Pre-requisites
1. Node version 16.13.0
1. npm version 13.13.0
1. yarn version 1.22.17
1. Postgresql for more information of how to install in your OS, see official site `open https://www.postgresql.org/`

## Common psql commands
1. Open psql: psql postgres
1. Connect to a database: \c <database_name>
1. Create a new database: create database <database_name>
1. Get out of psql: \q

## Step-by-step install guide
1. Create a `.env` file in the root of the project and add environment variables with your database settings and other important configuration for generating tokens and encrypting passwords, for the database settings make sure username has properly rights to CRUD:

  ```
    POSTGRES_HOST = replace_with_your_postgres_hostname_or_address
    POSTGRES_PORT = 'replace_with_your_postgres_port'
    POSTGRES_DATABASE = 'shopping'
    POSTGRES_DATABASE_TEST = 'shopping_test'
    POSTGRES_USERNAME = 'replace_with_your_postgres_username'
    POSTGRES_PASSWORD = 'replace_with_your_postgres_password'
    ENV_NODE = dev
    BCRYPT_PASSWORD = 'replace_with_your_bcrypt_psw'
    SALT_ROUNDS = '10'
    TOKEN_SECRET = 'replace_with_your_secret_token'
  ```
1. Install project specific dependencies with `yarn`.
1. Create database for API, It can be created using postgres dashboard or use psql commands.
1. Using psql commands: `\c shopping`, if database is changed, it should be updated in `.env` file.
1. Create test database for your running tests.
1. Using psql commands: `\c shopping_test`, if database is changed, it should be updated in `.env` file.
1. Install the global package `npm install -g db-migrate`
1. Create database structure with the following command `db-migrate up`
1. To brind migration down using `db-migrate down`
1. To reset last migration `db-migrate reset`
1. For more information about migration commands go to `open https://github.com/db-migrate/node-db-migrate`
1. Run Storefront-backend server with `yarn watch`

## Component Testing
For running tests, see below scritps for windows enviroments or mac:

1. Run `yarn test` to execute the tests. Coverage reports are automatically generated and displayed inline.
1. Run `yarn test-windows` to execute the tests for window. Coverage reports are automatically generated and displayed inline.

## Package Lock

Yarn locks packages to specific versions. This information is stored in the `yarn.lock` file.

## Troubleshooting

* Make sure you're using the right version of Node by executing `nvm use` from the root directory.
* Make sure you are using the right `yarn` version by executing `yarn -v` and ensuring it matches the `engines` version in `package.json`
* Grab the latest dependencies with `yarn`.
