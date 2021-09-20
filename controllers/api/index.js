const router = require("express").Router();

const postRoute = require("./postInfo_route");

router.use("/posts", postRoute);

module.exports = router;
