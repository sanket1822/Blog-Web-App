//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongodb =  require("mongodb");
const mongoose =  require("mongoose");
var _ = require("lodash");

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const homeStartingContent = "This is Home Page of my Blog Web App. Here, whatever the content or blogs user right are going to display below. To create blog go to http://localhost:3000/compose";
const aboutContent = "This is About section in which we can add more details about the company or person as per client requirement.";
const contactContent = "This is contact Page. Here, we can add Contact details such as Phone number, Email, Address, etc.";




const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




const blogSchema = {
  titleName:String,
  description: String
};

const Post = mongoose.model("Post", blogSchema)



app.get("/", function(req, res){

  Post.find({}, function(err, foundedposts){
    if(!err){
      res.render("home", {homeContent:homeStartingContent, posts: foundedposts });
    }
  });

});


app.get("/about", function(req, res){
  res.render("about",{aboutPage : aboutContent} )
})

app.get("/contact", function(req, res){
  res.render("contact",{contactPage :contactContent } )
})

app.get("/compose", function(req, res){
  res.render("compose");
})

app.post("/compose", function(req, res){
      const post = new Post({
        titleName : req.body.postTitle,
        description: req.body.postBody
      });

     post.save(function(err){
       if(!err){
         res.redirect("/");
       }
     });

})


app.get("/posts/:postId", function(req, res){


        const requestedPostId = req.params.postId;

        Post.findOne({_id: requestedPostId}, function(err, post){

              res.render("post", {
              selectedTitle: post.titleName,
              selectedContent: post.description
            });
          });

});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});



// <a href="/posts/<%= post.titleName %>">Read Moore</a>
