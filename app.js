const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { dbURI } = require('./config');
const ItemModel = require('./models/item')
const deletedItemModel = require('./models/inactive')
const cors = require("cors");
// register view engine ejs

app.set ('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended:true }));
app.use(cors());

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
app.post('/add-item',(req,res) => { 

    const item = new ItemModel(req.body);
    item.save()
    .then((result) => res.redirect('/all-items'))
    .catch((err) => {console.log(err)});
   
});
//edit item
// load the form to edit an item
app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    ItemModel.findById(id)
      .then(result => {
        console.log(result);
        res.render('edit', { item: result, page: 'Edit an Item' });
      })
      .catch(err => {
        console.log(err);
      });
  });
// actual editing with mongoose
  app.post('/edit-item/:id', (req, res) => {
    const id = req.params.id;
    console.log("req")
    console.log(req);
    ItemModel.findByIdAndUpdate(id,req.body)
      .then(result => {
        res.redirect('/all-items');
      })
      .catch(err => {
        console.log(err);
      });
  });

// The find method allows us to list all document in mongoDB using mongoose - sorted by most recently added
app.get('/all-items',(req,res) => {
    ItemModel.find().sort({createdAt: -1})
    .then((result) =>  res.render('index', {items:result ,page:'Shopify Inventory'} ))
    .catch((err) => {console.log(err)});
 });

// The find method allows us to list all inactive item document in mongoDB using mongoose - sorted by most recently deleted
app.get('/inactive-items',(req,res) => {
  deletedItemModel.find().sort({createdAt: -1})
  .then((result) =>  res.render('inactive', {items:result ,page:'Shopify Inventory'} ))
  .catch((err) => {console.log(err)});
});

 // add a new inventory item
app.get('/add', (req, res) => {
    res.render('add', { page: 'Add a new item' });
  });

// delete the inventory item - delete document in item collection and add to deleted item
app.delete('/delete/:id/:comments', (req, res) => {
    const id = req.params.id;
    
    console.log(req.body);
    
    ItemModel.findByIdAndDelete(id)
      .then(result => {
        console.log(result);
          req.method = 'GET';
          console.log(req.method);
          const deletedItem = new deletedItemModel({_id:result._id,title:result.title,description:result.title,quantity:result.quantity,warehouse_location:result.warehouse_location,deletion_comments:req.params.comments});
          deletedItem.save()
          .then((result) => 
          
          res.redirect('/all-items')
      
          )
          .catch((err) => {console.log(err)});
        })
        .catch(err => {
          console.log(err);
        });

   
  });
// recover the inventory item - delete document in deleted items collection and add to items 
app.delete('/recover/:id', (req, res) => {
  const id = req.params.id;
  
  console.log(req.body);
  
  deletedItemModel.findByIdAndDelete(id)
    .then(result => {
      console.log(result);
      //res.json({ redirect: '/' });
      req.method = 'GET';
      const item = new ItemModel({_id:result._id,title:result.title,description:result.title,quantity:result.quantity,warehouse_location:result.warehouse_location});
    item.save()
    .then((result) =>res.redirect('/all-items'))
    .then((result) =>console.log("reload"))
    .catch((err) => {console.log(err)});
         
       
      })
      .catch(err => {
        console.log(err);
      });
  
 
});


