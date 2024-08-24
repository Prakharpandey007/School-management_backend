 # School Management Backend 
 This is a School Management System built using Node.js, Express.js, MySQL, and Sequelize ORM. The system allows for managing school data, including adding schools, listing them with sorting by proximity, and more.

 ## Project Structure 
 ``` 
school-management-system/
├── src/
│   ├── config/
│   │   ├── config.json            # Database configuration
│   ├── controllers/
│   │   ├── schoolController.js    # School controller to handle API logic
│   ├── models/
│   │   ├── index.js               # Sequelize initialization and model loading
│   │   ├── school.js              # School model definition
│   ├── routes/
│   │   ├── schoolRoutes.js        # Routes for handling school-related requests
│   ├── middlewares/
│   │   ├── authMiddleware.js      # JWT authentication middleware
│   ├── utils/
│   │   ├── proximitySort.js       # Utility function for sorting by proximity
│   ├── index.js                   # Main application entry point
│   └── app.js                     # Express app setup
├── .env                           # Environment variables
├── .gitignore                     # Files and directories to ignore in Git
├── package.json                   # Node.js dependencies and scripts
└── README.md                      # Project documentation

 ```

## Table of Contents 
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Enviroment variable](#enviroment-variable)
- [Database Configuration](#database-configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

  ## Features
  - Add new schools with relevant details.
  - List schools with the ability to sort by proximity to the user.
  - Supports MySQL as the database with Sequelize ORM for database operations.

 ## Technologies Used
  - Backend: Node.js, Express.js
  - Database: MySQL
  - ORM: Sequelize
  - Authentication: JWT (JSON Web Token)
  - Environment Management: dotenv

 ## Installation 
  ### Clone the Repository 
  ```
  git clone https://github.com/yourusername/school-management-system.git
  cd school-management-system
  ```
 ### Install Dependencies 
 ``` 
npm install
npm i express nodemon sequelize sequelize-cli mysql2
 ```
## Enviroment Variable 
```
PORT=3000
USERNAME=your_mysql_username
PASSWORD=your_mysql_password
DATABASE=school_management_db
HOST=your_database_host

```
## Database Configuration 
 ### Create Model for a School 
 ``` 
npx sequelize-cli model:generate --name School --attributes name:string,address:string,latitude:float,longitude:float 
```
### Run the Migration 
```
npx sequelize-cli db:migrate
```
## Running the Application 
```npm start ```
## API EndPoints 
- Add School: POST /api/v1/addschools
- Request Body: { "name","address","latitude","longitute" }
- List Schools: GET /api/v1/listschools
- Query Parameters: ?sort=proximity
- Update Schools :PUT /ap1/v1/updateSchools/:id
- Request Body: { "name","address","latitude","longitute" }
- Delete Schhols: DELETE /api/v1/deleteSchools/:id

## Contributing 
Contributions are welcome! Please open an issue or submit a pull request with your changes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
