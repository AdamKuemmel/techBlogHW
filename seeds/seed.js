const sequelize = require("../config/connection");
const seedPost = require("./postSeedData.json");
const seedUser = require("./userSeedData.json");
const { Post, User } = require("../models");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await sequelize.sync({ force: true });

  await User.bulkCreate(seedUser, { individualHooks: true });
  await Post.bulkCreate(seedPost);
};

seedAll();
