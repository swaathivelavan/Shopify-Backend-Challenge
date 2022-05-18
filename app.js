const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { dbURI } = require('./config');
const ItemModel = require('./models/item')

// register view engine ejs

app.set ('view engine','ejs');

// This ensures that only when database connection has been established we listen for requests
mongoose.connect(dbURI)
.then(()=> 
app.listen(3000)
)
.catch(()=>console.log("error"));

// Home page - redirect to list of all inventory items
app.get('/',(req,res) => {
    res.redirect('/all-items');
});

// The save method allows us to add a document to mongoDB using mongoose
app.get('/add-item',(req,res) => { 
    const item = new ItemModel({
        title:'strawberry',
        description:'a juicy fruit',
        quantity:5,
        warehouse_location:'New York - 1'
    });
    item.save()
    .then((result) => res.send(result))
    .catch((err) => {console.log(err)});
});

// The find method allows us to list all document in mongoDB using mongoose
app.get('/all-items',(req,res) => {
    ItemModel.find()
    .then((result) =>  res.render('index', {items:result ,page:'Shopify Inventory'} ))
    .catch((err) => {console.log(err)});
 });

 




// Node.js allows us to run javascript on computer 
// Node.js has a global object similar to the window object in javascript. This object is global and gives us access to timeout
// we can use it by either saying global.setTimeout or just simply setTimeout. we don't require the global as the objects method is globally scoped.
// global also has variables like __filename to get path of the current file and __dirname to get absolute path of directory

// when we require a file using node.js it automatically runs that file. however unless we manually export a variable it cant be accessed
// in other words without manual exports the require statement gives us an empty object
// how to manually export? module.exports = x; 
// what if we want to export more than one value? we can create a object and set properties 
// we can destructure and use it in require statement - we still export as an object but just destructure in require

// It is very important for server side code to be able to read files, write files, delete. Node.js provides us with that functionality.

// In Node we must create the server that listens to requests. This is in contrast to other languages like PHP which have tools
// that manage server creation for us like Apache
/*

const http = require('http')

const server = http.createServer((req,res)=>{
    // callback function
});

server.listen(port_number,hostname,()=>{
    console.log("function that indicates we have started listening for requests")
});

This callback function executes anytime we receive a request

*/

// localhost is like a domain name on the web. however, it has a loop back ip address - 127.0.0.1 meaning it points back to your computer 

// Port numbers are like doors into a computer. Each application that uses the internet on your laptop (discord,skype,etc)
// each uses a different port number to keep information separate. port numbers are like doors to internet communication

// the server listens in the background listening for requests
// req.url gives us the request path accessed 

// The first part in returning a response to the browser is formulating the response headers.
// The response headers give a little bit of information on what kind of response is coming back to the browser.
// response object can also be used to set cookies

//  NPM - Node Package Manager. Tool to install, update node packages.
// npm install -g : this is used to install it globally instead of just the project
//nodemon - live server change restarts
// Package.json file - keeps track of packages we install locally to our project, other project details
// If we do npm init : this creates the package.json file for us
// Package-lock.json - keeps track of the different dependency versions 
// Express is a third party package


// Status codes describe the type of response sent to the browser.
// 200 - Ok req
// 301 - resource permanently moved - redirects - set header - location
// 404 - Not found
// 500 - Internal server error

// What is express package and what do we use it for?? 
//express is a framework that helps handling server side logic and routing
// requests in an elegant way. Code is easy to read and extend. it uses a callback function to send response  

// To install do npm install express. We don't need to set content type, header info or status when we use express. It does it for us.


// app.use - to fire middleware functions in node.js
// This function also has req res objects
// The use fires for every single request coming in - but only if it reaches that part of code.


// Without express we use this : 
/*
const http = require('http');

const server = http.createServer((req,res)=>{
    console.log('request made');
    console.log(req);
});

server.listen(3000,'localhost',() =>{
    console.log("server is listening for requests on port 3000");
})
*/

// Express allows us to use something called view engines which is similar to html but allow us to inject dynamic data

// What is middle any code that runs on a server between getting a req and sending a response
// use method is generally used to run middleware
// any function that runs inside get can also be considered as middleware

// the only diff between get and use is that get runs only for specific routes whereas use runs for all routes including post req

// It runs from top to bottom. The moment a response is sent back no other middleware declared further down the code will be 
// executed. The order of middleware is important. 

// Middleware can be used for the following examples. 
/*

1. Logger middleware to log details of every request (morgan)
2. Authentication check middleware for protected routes
3. Middleware to parse JSON data from requests
4. To return 404 pages


etc
*/

// Express does not move down after running middlewaree we need to explicitly tell it to move on using next

// Using node and express, the great thing is there are tons of middle ware functions already created that we can use

// MongoSB - NoSQL - Collections (similar to table) and Documents (similar to a record)
// Documents have an auto generated unique ID. Documents are similar to json kind of representation.

/*
mongodb+srv://db:<password>@shopify-backend.v5qvv.mongodb.net/?retryWrites=true&w=majority

Mongoose is an ODM library. That basically means it wraps the mongodb API and provides us a much easier way to interact with the DB.
Mongoose does all the heavy lifting for us.

Schemas define the structure of a type of data/document - Includes the properties and property types

We then create a model based on the schema - This model allows us to communicate with the collection. (get,save,delete,etc)

*/