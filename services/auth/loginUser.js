const {
  createError,
  passwordTools,
  tokenTools,
  separatesCategoriesByType,
} = require("../../helpers");
const { User, Session, Category } = require("../../models");
// const {
//   transactionSchema: transactionSchemaConstants,
// } = require("../../constants");

// const { TRANSACTION_TYPE } = transactionSchemaConstants;

const loginUser = async (body) => {
  try {
    const user = await User.findOne({ email: body.email });
    await Session.deleteMany({ uid: user._id });
    /* 
    # resolve with aggregate
    let user = await User.aggregate([
      { $match: { email: body.email } },
      {
        $lookup: {
          from: "category",
          localField: "_id",
          foreignField: "owner",
          as: "qwe",
        },
      },
    ]);
    user = user[0]; 
    */

    const isPasswordsCompare = user
      ? await passwordTools.compare(body.password, user.password)
      : null;

    if (!user || !isPasswordsCompare) {
      throw createError(403, "Email doesn't exist / Password is wrong");
    }

    const { _id: sid } = await Session.create({ uid: user._id });

    const { _id, email, currency, name, avatarUrl } = user;

    const { accessToken, refreshToken } = tokenTools.createTokens({
      id: user._id,
      sid,
    });

    const userCategories = await Category.find({ owner: user._id });

    const categories = separatesCategoriesByType(userCategories);

    /* 
    # resolve to transactions sum by current month
    const transactions = Transaction.aggregate([
      {
        $match: {
          date: { $gt: prev, $lt: next },
          owner: { $eq: _id },
        },
      },
    ]); 
    */

    return {
      user: { _id, email, name, avatarUrl, categories, currency },
      // user,
      sid,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = loginUser;
