const router = require("express").Router();

const apiRoutes = require("./api");
const postRoutes = require("./post-routes.js");
const userRoutes = require("./login-routes.js");
const dashboardRoutes = require("./dashboard-routes");

router.use("/posts", postRoutes);
router.use("/api", apiRoutes);
router.use("/", userRoutes);
// router.use("/dashboard", dashboardRoutes);
router.use((req, res) => {
  res.status(404).json({ message: "That route does not exist" }).send();
});

module.exports = router;
