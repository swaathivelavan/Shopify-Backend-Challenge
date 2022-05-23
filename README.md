# Shopify-Backend-Challenge

## Tech Stack :

I used Node.js, Express.js, MongoDB and mongoose ODM to build this project. I thought this project would be a great opporuntiy for me to learn something new. I have never worked with MongoDB or views (view engine used - ejs) before and decided to do a crash course before building this project. I also documented my learnings in Learnings.md for future reference.

## Project in Detail :

The web application allows us to perform basic CRUD applications.

It allows us to -
1.Create inventory items
2.Edit Them
3.Delete Them
4.View a list of them

I also implemented the following extra functionality that was required.

5.When deleting, allow deletion comments and undeletion

## Handling Undeletion/Recovery

In order to do this, I created another collection that contained the inactive items. I save the same object id it was stored with intially, so that when we recover it we can restore it with the same id.

## Steps to run:

In order to run the web app, you can use replit. Just click the run button

https://shopify-backend-challenge.swaathivelavan.repl.co/all-items

To run on your local machine, after downloading the files :

npm install - to install all packages
node server.js - to run the web app
