const express = require("express");
const friendController = require("../controllers/friend.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

//api/friend/invite
router.post("/invite", auth(), friendController.invite);

//api/friend/accept_invite
router.post("/accept_invite", auth(), friendController.acceptInvite);

//api/friend/reject_invite
router.post("/reject_invite", auth(), friendController.rejectInvite);

module.exports = router;
