# Institute-Instructor-Attendance-System
We want to build a backend system for the institutes that lets them track their instructors’ check in &amp; out throughout the day &amp; view their total working hours on a monthly basis. Build the APIs that (a) store this information into the database &amp; (b) provide an aggregated monthly report



# Project Setup Instructions

This project requires Node.js and MongoDB to be installed on your machine.

## Step 1: Installation

1. Clone the project repository.
2. Open a command line in the same directory as the project.
3. Run the following command to install project dependencies:

```bash
npm install


Here's a README.md file with the provided instructions:

markdown

# Project Setup Instructions

This project requires Node.js and MongoDB to be installed on your machine.

## Step 1: Installation

1. Clone the project repository.
2. Open a command line in the same directory as the project.
3. Run the following command to install project dependencies:

```bash
npm install

##Step 2: Start MongoDB

Ensure that MongoDB is running locally on the default port 127.0.0.1:27017.
##Step 3: Start the Server

Run the following command in the root directory of the project in your terminal:
node ./server.js


##Step 4: Create Employee

    Use an API testing tool like Postman.
    Send a POST request to http://localhost:3000/employee/create with the following JSON data:
    {
  "employeeId": "EMP124",
  "name": "Shubham Kannaujiya",
  "department": "Software Developer"
}


##Step 5: Check-In

    Send a POST request to http://localhost:3000/checkinout/checkin/EMP123 with the following JSON data:
    {
  "checkInTime": "2024-02-18T09:55:00.000Z",
  "date": "2024-02-18T09:30:00.000Z"
}


##Step 6: Check-Out

    Send a POST request to http://localhost:3000/checkinout/checkout/EMP123 with the following JSON data: {
  "checkOutTime": "2024-02-16T18:56:00.000Z",
  "date": "2024-02-16T18:00:00.000Z",
  "isToday": true
}


##Step 7: Generate Report

    Send a GET request to http://localhost:3000/reports/EMP123?month=2&year=2024.
    Replace EMP123 with the employee ID and provide the month and year as query parameters to retrieve the corresponding records.


