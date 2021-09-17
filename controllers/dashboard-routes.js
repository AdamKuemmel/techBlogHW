const router = require("express").Router();
const { Post } = require("../models/index");

// Renders logged in users cars
router.get("/myPosts", async (req, res) => {
  console.log(req.session);
  const postData = await Post.findAll({
    where: {
      user_id: req.session.username.id,
    },
  });
  const postCards = postData.map((cars) => post.get({ plain: true }));

  console.log(postCards);
  res.render("myPosts", { postCards, loggedIn: req.session.loggedIn });
});

router.get("/postcar", async (req, res) => {
  res.render("postCar", { loggedIn: req.session.loggedIn });
});

module.exports = router;
