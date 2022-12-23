const express = require("express");
const authRoute = require("./auth.route");
const friendRoute = require("./friend.route");
const router = express.Router();

const routesIndex = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/friend",
    route: friendRoute,
  },
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
