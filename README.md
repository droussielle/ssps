# ssps
Student Smart Printing Service for HCMUT students

## ✋Introduction
The university is intent to build a Student Smart Printing Service (HCMUT_SSPS) for serving 
students in its campuses to print their documents.

## Tech Stack

**Front-end:** NodeJS,ExpressJS, TailwindCSS, jQuery, PDF.js

**Back-end:** NodeJS, ExpressJS, Multer, Mongoose

**Database:** MongoDB with Mongoose ODM

**Security:** JWT, Bcrypt


## Installation
**Node.js**
  - First, clone this branch to your local storage. 
  - Then download and install Node.js 20.10.0 version at: https://nodejs.org/en.

**Front-end:** 
  - Change terminal working directory to *./client/client/* folder
  - Use `npm i` command to install all required packages for Front-end
  - Use `npm run build` command to build component files
  - Install *Live Server* extension on your Editor

**Back-end:**
  - Change terminal working directory to *./server* folder
  - Use `npm i` command to install all required packages for Back-end

## Start the website
- First, follow the readme in `database` folder to install the database
- Run and connect database at `mongodb://localhost:27017`
- Navigate to `server` folder on your terminal, type `npm start` command to start backend server
- Open VSCode or any editor that already have *Live Server* installed
- Start live server on *./client/client/index.html* file at port `5500`


