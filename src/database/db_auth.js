const UserProfile = require("../model/user/profile");
const UserToken = require("../model/auth/user_token");
require("../../logger").intialize();
const logger = require("../../logger").logger;

const addTokens = async (user, _accessToken, _refreshToken) => {
  try {
    const filter = { username: user.username.toLowerCase() };
    const profile = await UserProfile.findOne(filter);

    const data = {
      username: profile._id,
      accessToken: _accessToken,
      refreshToken: _refreshToken,
    };
    const result = await UserToken.create(data);
    return result;
  } catch (error) {
    logger.error(error);
    return error;
  }
};

const removeTokens = async (token) => {
  try {
    const result = await UserToken
      .findOneAndRemove({ accessToken: token });
    return result;
  } catch (error) {
    logger.error(error);
    return error;
  }
};

const updateTokens = async (
  username,
  _accessToken,
  newRefreshToken,
  isLogin
) => {
  try {
    let filter = {};
    if (isLogin === true) {
      filter = { _id: username };
    } else {
      filter = { username: username.toLowerCase() };
    }
    const profile = await UserProfile.findOne(filter);
    const updateFilter = { userId: profile._id };

    const result = await UserToken.findOne(updateFilter);
    if (result !== null) {
      result.accessToken = _accessToken;
      result.refreshToken = newRefreshToken;
      await result.save();
    } else {
      return false;
    }
    return result;
  } catch (error) {
    console.log(error);
    logger.error(error);
    return error;
  }
};

const getToken = async (id) => {
  try {
    const filter = { userId: id };
    const profile = await UserToken.findOne(filter);
    return profile.accessToken;
  } catch (error) {
    logger.error(error);
    return error;
  }
};

/// need to be optimized using native `where()`
const getTokenByUsername = async (_username) => {
  try {
    const profile = await UserToken.find({}).populate("username");
    const query2 = profile.filter((x) => {
      if (x.username.username === _username) return x.accessToken;
    });
    if (query2[0].accessToken !== null) {
      return query2[0].accessToken;
    }
    return false;
  } catch (error) {
    logger.error(error);
    return error;
  }
};

module.exports = {
  addTokens,
  removeTokens,
  updateTokens,
  getToken,
  getTokenByUsername,
};
