const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const User = require("../models/User");

router.get("/", (req, res) => {
  Blog.find().then(blogs => {
    res.status(200).json(blogs);
  });
});

router.get("/featured", (req, res) => {
  Blog.find()
    .where({ blogs: "featured" })
    .then(blog => {
      console.log("Featured blogs displayed");
      res.status(200).json(blog);
    });
});

router.get("/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then(blog => (blog ? res.status(200).json(blog) : res.status(404).send()))
    .catch(err => res.status(500).send("An internal server error has occured"));
});

router.post("/", (req, res) => {
  let dbUser = null;
  User.findById(req.body.authorId)
    .then(user => {
      dbUser = user;

      let newBlog = new Blog(req.body);

      newBlog.author = user._id;

      return newBlog.save();
    })
    .then(blog => {
      dbUser.blogs.push(blog);

      dbUser.save().then(() => res.status(201).json(blog));
    });
});

router.put("/:id", (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(blog => {
      console.log("Blog has been updated!");
      res.status(204).json(blog);
    })
    .catch(err => res.send(err.message));
});

router.delete("/:id", (req, res) => {
  Blog.findByIdAndRemove(req.params.id)
    .then(blog => {
      res.status(200).json(blog);
    })
    .catch(err => res.send(err.message));
});

module.exports = router;
