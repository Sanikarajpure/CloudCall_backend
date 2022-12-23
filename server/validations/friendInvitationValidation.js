const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const CONSTANTS = require("../constants/Constants");

const stringPassswordError = new Error(
  "Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum six in length"
);

const phoneError = new Error("Enter a 10 digit valid Phone number");

const friendInvitationSchema = Joi.object({
  targetMailAddress: Joi.string().email().max(225).required(),
  senderMailAddress: Joi.string().email().max(225).required(),
});

const inviteDecisionSchema = Joi.object({
  id: Joi.objectId().required(),
});

module.exports = {
  friendInvitationSchema,
  inviteDecisionSchema,
};
