# Multi User Task Manager backend-service

This is a Basic Multi User Task manager backend Service

## Table of Content

- Installation
- Environment Variable
- Running the Application
- Technologies Used

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (Version 14 or higher recommended)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/getting-started/install)

## Getting Started

1. Clone the Repo

<pre> 
bash 

    $ git clone https://github.com/Kelvin-Teck/multi-user-task-manager.git 
    
</pre>

2. Navigate to the Project Folder
<pre> 
bash 

    $ cd project-folder

</pre>

3. Install Dependencies
   Using npm

<pre> 

  bash 
  
  # Install dependencies 
     
     $ npm install 
     
     </pre>

     Using Yarn:

     $ yarn install

<pre> 

 bash
     
     $ yarn install 
     
     </pre>

3. Set up The Environment Variables
<pre>

# Example of .env file

# App

NODE_ENV=development
PORT=2000

# Urls

LIVE_ORIGIN=
DEV_ORIGIN=http://localhost:

# DATABASE Development

DEV_DATABASE_NAME=database_name
DEV_DATABASE_HOST=127.0.0.1
DEV_DATABASE_USER=database_user
DEV_DATABASE_PASSWORD=your_password
DEV_DATABASE_TYPE=postgres
DEV_DATABASE_PORT=5432

#Mailing
EMAIL_SERVICE=gmail
EMAIL_HOST=gmail
EMAIL_PORT=587
EMAIL_PASS=syag cyey haek uyoj #generated from Google App Password
EMAIL_USER=your_email_address
EMAIL_SENDER=

# Auth

ACCESS_TOKEN_SECRET=\_your_access_token_secret
ACCESS_TOKEN_EXP=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXP=10d

</pre>

4. Run migrations
   Run the following command
   Using npm:

<pre>
bash

$ npm run migration up

</pre>

Using yarn:

<pre>
bash

$ yarn run migration up
</pre>

6. Start the application

Using npm:

<pre>
bash

$ npm run dev
</pre>

Using yarn:

<pre>
bash

$ yarn run dev
</pre>

7. Access the app
   Once the server is running, you can access the app at:

<pre> 
bash

http://localhost:4000
</pre>
Replace <pre>4000</pre> with the actual port number you specified in the .env file.

### Technology Used

<pre>


This project is built using the following technologies:

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 engine, which allows you to build scalable server-side applications.
- **Express.js**: A fast and lightweight web framework for Node.js, used to build RESTful APIs and handle HTTP requests.
- **Sequelize**: A promise-based Node.js ORM for managing and interacting with SQL databases. It supports popular databases like MySQL, PostgreSQL, SQLite, and MSSQL.
- **TypeScript**: A statically typed superset of JavaScript that adds type definitions to improve code quality and development experience.
- **Nodemailer**: A module for sending emails from Node.js applications.
- **Express-Handlebars**: A view engine for Express used in rendering dynamic email templates.

### Database

- **PostgreSQL/MySQL/SQLite**: Relational databases used to store and manage data. The project is built with Sequelize, so it supports various SQL databases (e.g., PostgreSQL, MySQL, SQLite). You can configure the preferred database in the environment variables.</pre>