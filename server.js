var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/spacebookDB', function () {
  console.log("DB connection established!!!");
})

var Post = require('./models/postModel');

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// var post1 = new Post ({
//   text: 'How am I suppose to start this excersize?',
//   comments: [{
//     text: 'Nice and slowly',
//     user: 'Elevation'
//   }]
// });

// post1.save();

// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments

app.get('/posts', function (req, res) {
  Post.find(function (req, posts) {
    res.send(posts)
  })
});


// 2) to handle adding a post

app.post('/posts', function (req, res) {
  var newPost = new Post(req.body)
  newPost.save(function (requeriment, savedPost) {
    res.send(savedPost)
  })
})


// 3) to handle deleting a post
app.delete('/posts/:id', function (req, res) {
  Post.findByIdAndRemove(req.params.id).exec(function (err, post) {
    Post.find({}).exec(function (err, posts) {
      console.log('here are all of the posts');
      res.send(posts);
    })
  })
});




// Todo.findByIdAndRemove(req.params.todoId, (err, todo) => {  
//   // As always, handle any potential errors:
//   if (err) return res.status(500).send(err);
//   // We'll create a simple object to send back with a message and the id of the document that was removed
//   // You can really do this however you want, though.
//   const response = {
//       message: "Todo successfully deleted",
//       id: todo._id
//   };
//   return res.status(200).send(response);
// });




// 4) to handle adding a comment to a post
// 5) to handle deleting a comment from a post

app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});