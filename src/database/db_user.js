const UserProfile = require("../model/user/profile");
const UserAuth = require("../model/auth/user_auth");
const logger = require("../../logger").logger;

const addProfile = async (userId) => {
  /// create new user profile
  try {
    const createdProfile = await UserProfile.create({
      userAccount: userId,
    });

    await createdProfile.populate(
      "userAccount",
      "username email createdAt updatedAt"
    );

    const { userAccount } = createdProfile.toObject();

    return {
      username: userAccount.username,
      email: userAccount.email,
      createdAt: userAccount.createdAt,
      updatedAt: userAccount.updatedAt,
    };
  } catch (error) {
    logger.error(error);
    return error;
  }
};

const addUserAuth = async (username, email, password) => {
  // add user to databas
  try {
    return await UserAuth.create({
      username: username,
      email: email,
      password: password,
    });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

const isValidated = async (filter, password) => {
  try {
    /// fetch the user and test password verification
    const result = await UserAuth.findOne(filter);

    /// is valid or not [True/False]
    return await result.comparePassword(password);
  } catch (error) {
    logger.error(error);
    return error;
  }
};

const updateUser = async (user, userId) => {
  try {
    const filter = { userAccount: userId };
    // options is used to add a new document in case nothing match
    // const options = { upsert: true };
    const replacementDocument = {
      firstNameAr: user.firstNameAr,
      middleNameAr: user.middleNameAr,
      lastNameAr: user.lastNameAr,
      firstNameEn: user.firstNameEn,
      middleNameEn: user.middleNameEn,
      lastNameEn: user.lastNameEn,
      fullNameAr: user.fullNameAr,
      fullNameEn: user.fullNameEn,
      nationalId: user.nationalId,
      mobileNumber: user.mobileNumber,
      gender: user.gender,
      dateOfBirth: new Date(user.dateOfBirth),
      userCity: user.userCity,
      major: user.major,
    };

    const result = await UserProfile.findOneAndUpdate(
      filter,
      replacementDocument,
      {
        new: true,
        runValidators: true,
      }
    );
    return result;
  } catch (error) {
    logger.error(error);
    throw error
    // return error;
  }
};

const getUserByUsername = async (username) => {
  try {
    return await UserAuth.findOne({ username: username.toLowerCase() });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

const getUserByEmail = async (email) => {
  try {
    return await UserAuth.findOne({ email: email.toLowerCase() });
  } catch (error) {
    logger.error(error);
    return error;
  }
};

const getUserProfileById = async (id) => {
  try {
    return await UserProfile.findOne({ userAccount: id });
  } catch (error) {
    logger.error(error);
    return error;
  }
}

module.exports = {
  addProfile,
  addUserAuth,
  updateUser,
  getUserByUsername,
  getUserByEmail,
  getUserProfileById,
  isValidated,
};
