# GUVI - DAY 39

## Mentor and Student assigning with Database Task.

### How to run the project on your machine:

1. Pull the repository to your local machine.

```
git pull
```

2. To install all the dependencies:

```
npm install
```

3. Once everything is installed successfully, now it's time to run the server.

```
npm run dev
```

### Dependencies used

1. express

```
npm install express
```

2. nodemon

```
npm install nodemon --save-dev
```

3. dotenv

```
npm install dotenv
```

4. mongoose

```
npm install mongoose
```

### About the Task.

1. The task is to create API routes for a mini application involving Students and their Mentors.
2. We have to create the routes in connection with the mongodb server.
3. We use express.js library in NodeJS to run a javascript application as a server.

### Setup.

1. We create a new project using the npm package manager in node.js.
2. We run the following command to create a new project.

```
    npm init
```

3. We specify the details required for initializing the project asked in the terminal.
4. We install the `express` library by using installation command from the npm package manager.
5. We create a javascript file named `index.js` which is the root of the project.
6. We add a package called as `nodemon` to help us automate the development process. It restarts the server every time it detects changes in the code.
7. We use the `dotenv` package to declare environment variables for the server.
8. We change the `package.json` file to include start and dev parameter to make the script run from the command `npm run dev`.

### Folder Structure

1. Models.

   > - This folder contains the database schemas for the collections in our database.
   > - We have 2 files here corresponding to the Student and Mentor collections in our database.

2. Controllers.

   > - This folder contains the controllers for our application.
   > - The controllers are used to perform all the functions and operations.
   > - The controllers recieve the request from the client.
   > - We define the controller operations for both our entities in seperate files.

3. Routes.

   > - This folder contains the routes for our application.
   > - The routes are the API Endpoints.
   > - Routes are created using the router from express library.
   > - Student and mentor routes are defined seperately.

4. Utils.
   > - This folder is a utility helper for working with configuration files.
   > - We declare a file, which retrieves the environment variables from the dotenv file and exports them for further usage.

### Solution.

1. In the [index.js](./index.js) file, we establish the connection to our database, and create a server.
2. We create an express application, app, in the [app.js](./app.js) file.
3. Using the `dotenv` package, we declare secretive information as environment variables to not be exposed.
4. These values are extracted in the [config.js](./utils/config.js) file.
5. Models are drafted for our entities, and schemas are defined using the `mongoose` library.
6. After schemas are defined, we create controllers for our application.
7. These controllers are the entry points of our server, that recieve data from the client.
8. Controllers are objects of function names as key and the asynchronous functions as their value.
9. Controllers are defined in its own folder. [Controllers](./controllers/)
10. Now, we declare endpoints for our APIs in the routes directory.
11. We use the router method in the express library to define our routes.
12. Routes are defined in the routes folder. [Routes](./routes/)
13. The API Endpoints are discussed in detail, below:

    1. Write an API to create Mentor.

       > - Endpoint: /mentors
       > - This is a POST request that accepts the mentor details such as name, email and password in request body.
       > - We check whether the mentor exists in the database using the email.
       > - If not, we create a mentor object using the Mongoose Schema model.
       > - We add it to the database using the `save()` method.
       > - A success message is sent as response.

    2. Write an API to create Student.

       > - Endpoint: /students
       > - This is a POST request that accepts the mentor details such as name, email and password in request body.
       > - We check whether the student exists in the database using the email.
       > - If not, we create a student object using the Mongoose Schema model.
       > - We add it to the database using the `save()` method.
       > - A success message is sent as response.

    3. Write an API to assign a student to a Mentor.

       > - Endpoint: /mentors/:id/add
       > - This is a POST request that accepts the student id in request body and mentor id as a query param.
       > - We check whether the student and mentor ids are valid in the database.
       > - Validations are made to ensure that the student does not already have a mentor assigned.
       > - We add the student id to the array of students using the `findByIdAndUpdate()` method to update the object and `$addToSet` method to ensure unique values in the array.
       > - A success message is sent as response once updated.

    4. Write an API to Assign or Change Mentor for particular Student

       > - Endpoint: /students/:id/change
       > - This is a POST request that accepts the mentor id in request body and student id as a query param.
       > - We check whether the student and mentor ids are valid in the database.
       > - Once validations are made, the student is removed from the old mentors students array.
       > - Then, the student's mentor is updated and previous mentors array is appended with the value of the previous mentor id.
       > - Then, the new mentor id, is updated with the student id appended to their student's array.
       > - We work with modifying the database using the `findByIdAndUpdate()` method to update the object and `$addToSet` method to ensure unique values in the array.
       > - A success message is sent as response once updated.

    5. Write an API to show all students for a particular mentor.

       > - Endpoint: /mentors/:id/students
       > - This is a GET request that accepts the mentor id as a query param.
       > - We check whether the mentor id is valid in the database.
       > - We use the `find()` method to fetch all objects from the database.
       > - We use the populate method, to join the students collection that has its reference in the mentors collection.
       > - A success message and the students data is sent as response.

    6. Write an API to show the previously assigned mentor for a particular student.

       > - Endpoint: /students/:id/previousMentors
       > - This is a GET request that accepts the mentor id as a query param.
       > - We check whether the student id is valid in the database.
       > - We use the `find()` method to fetch all objects from the database.
       > - We use the populate method, to join the mentors collection that has its reference in the students collection.
       > - A success message and the mentors data is sent as response.
