const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const { updateStatusSubscriptionSchema } = require("../../schemasJoi");

const updateStatusSubscription = async (req, res) => {
  const { error } = updateStatusSubscriptionSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing subscription status");
  }
  const { _id: id } = req.user;
  const result = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = updateStatusSubscription;
