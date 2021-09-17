const router = require("express").Router();

const postRoute = require("../post-routes");

router.use("/posts", postRoute);

module.exports = router;
