const router = require("express").Router();
const { Post } = require("../models/index");

// Renders logged in users posts
router.get("/myPosts", async (req, res) => {
  console.log(req.session);
  const postData = await Post.findAll({
    where: {
      user_id: req.session.username.id,
    },
  });
  const postCards = postData.map((post) => post.get({ plain: true }));

  console.log(postCards);
  res.render("newPost", { postCards, loggedIn: req.session.loggedIn });
});

router.get("/makePost", async (req, res) => {
  res.render("newPost", { loggedIn: req.session.loggedIn });
});

module.exports = router;
