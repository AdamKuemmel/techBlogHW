const router = require("express").Router();
const { Post, User } = require("../../models/index");
const { Op } = require("sequelize");

// Gets all posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll();

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a single post
router.get("/:id", async (req, res) => {
  console.log(req.session);
  if (!req.session.loggedIn) {
    res.render("login");
  } else {
    try {
      const singlePostQuery = await Post.findByPk(req.params.id);
      const user_idQuery = await User.findByPk(singlePostQuery.user_id);

      const singlePost = singlePostQuery.get({ plain: true });
      const user_id = user_idQuery.get({ plain: true });

      res.render("personalposts", {
        singlePost,
        user_id,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      res.status(400).json(err);
    }
    // }
  }
});

//Create a post
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const createPost = await Post.create({
      title: req.body.postTitle,
      content: req.body.postContent,
      user_id: req.session.username.id,
    });

    console.log(createPost);
    res.status(200).json(createPost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//get update post
router.get("/update/:id", async (req, res) => {
  console.log(req.session);
  if (!req.session.loggedIn) {
    res.render("login");
  } else {
    try {
      const updatePostQuery = await Post.findByPk(req.params.id);
      const updatedPost = updatePostQuery.get({ plain: true });

      res.render("updatePost", { updatedPost, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  }
});

//Update a post
router.put("/", async (req, res) => {
  console.log("request was made");
  try {
    const updatePost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    if (!updatePost) {
      res.status(404).json({ message: "no post with this id!" });
    }

    console.log(updatePost);
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post was found with that id!" });
      return;
    }

    res.render("dashboard");
    console.log("sucessfully deleted post!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
