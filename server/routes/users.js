const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  User.find().then(users => {
    res.status(200).json(users);
  });
});

router.get("/:id", (req, res) => {
  var id = req.params.id;
  User.findById(id)
    .then(
      users => (users ? res.status(200).json(users) : res.status(404).send())
    )
    .catch(err => res.status(500).send("An internal server error has occured"));
});

router.post("/", (req, res) => {
  const user = new User(req.body);
  user
    .save(req.params.id)
    .then(user => {
      res.status(201).json(user);
      console.log("Saved user to DB");
    })
    .catch(err => res.send(err.message));
});

router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => {
      if (!user) res.status(404).send();
      console.log("Saved updated user");
      res.status(204).json(user);
    })
    .catch(err => res.send(err.message));
});

router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      console.log(err);
      res.status(404).send(`404 Error: User ${req.params.id} not found`);
    }
  });
});

module.exports = router;
