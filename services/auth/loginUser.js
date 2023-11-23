const {
  createError,
  passwordTools,
  tokenTools,
  separatesCategoriesByType,
  getTransactionsTotal,
} = require("../../helpers");
const { User, Session, Category } = require("../../models");
// const {
//   transactionSchema: transactionSchemaConstants,
// } = require("../../constants");

// const { TRANSACTION_TYPE } = transactionSchemaConstants;

const loginUser = async (body) => {
  try {
    const user = await User.findOne({ email: body.email });

    const isPasswordsCompare = user
      ? await passwordTools.compare(body.password, user.password)
      : null;

    if (!user || !isPasswordsCompare) {
      throw createError(403, "Email doesn't exist / Password is wrong");
    }

    await Session.deleteMany({ uid: user._id });

    const { _id: sid } = await Session.create({ uid: user._id });

    const { _id, email, currency, name, avatarUrl } = user;

    const { accessToken, refreshToken } = tokenTools.createTokens({
      id: user._id,
      sid,
    });

    const userCategories = await Category.find({ owner: user._id });

    const categories = separatesCategoriesByType(userCategories);
    const transactionsTotal = await getTransactionsTotal(user._id);

    return {
      user: {
        _id,
        email,
        name,
        avatarUrl,
        categories,
        currency,
        transactionsTotal,
      },
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
