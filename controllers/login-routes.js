const router = require("express").Router();
const { User } = require("../models/index");

//finds all user in db
router.get("/", async (req, res) => {
  try {
    const dbUser = await User.findAll();
    const userInfo = dbUser.map((user) => user.get({ plain: true }));

    res.status(200).json(userInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creates  user
router.post("/", async (req, res) => {
  try {
    // Creates User with all the require information
    const dbUserCreate = await User.create({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });

    // Logs the user in
    req.session.save(() => {
      req.session.loggedIn = true;
      console.log(req.session.loggedIn);
      res.status(200).json(dbUserCreate);
    });
  } catch (err) {
    if (err == "SequelizeUniqueConstraintError") {
      res.status(400).json("That username already exists");
    } else {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

//Login get
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// Login Post
router.post("/login", async (req, res) => {
  try {
    // finds user with email or username
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    // checks to see if there is a user with that email or username, if not a json message is displayed
    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    /// uses hooks in our models to compare if the user passwords are the same as the one created. using bcrypt
    const validPassword = await dbUserData.checkPassword(req.body.password);

    // if the response returns false then they are presented with an error code
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
    }

    const userObject = {
      username: dbUserData.username,
      id: dbUserData.id,
      first_name: dbUserData.first_name,
      last_name: dbUserData.last_name,
      email: dbUserData.email,
    };
    console.log(userObject);
    // if validpassword returns true then the user is logged in
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = userObject;
      console.log(req.session.loggedIn);
      console.log("You've sucessfully logged in!");
      res.status(200).json({ message: "You are now logged in!" });
    });

    // console.log(req.session)
  } catch (err) {
    res.status(500).json(err);
  }
});

// logs the user out
router.post("/logout", (req, res) => {
  // if the user is logged in then the user will be loged out
  console.log(req.session);
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      console.log("You are now logged out!");
      res.status(200).send("you're logged out!");
    });
  } else {
    res.status(204).end();
    console.log("You are now logged out!");
  }
});

module.exports = router;
