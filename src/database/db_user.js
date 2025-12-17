const UserProfile = require("../model/user/profile");
const UserAuth = require("../model/auth/user_auth");
const logger = require("../../logger").logger;

const addProfile = async (username, email) => {
    /// create new user profile
    try {
        return await UserProfile.create({
            username: username,
            email: email,
        });
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

const updateUser = async (user, username) => {
    try {
        const filter = { username: username };
        // options is used to add a new document in case nothing match
        // const options = { upsert: true };
        const replacementDocument = {
            first_name: user.first_name,
            last_name: user.last_name,
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
        return error;
    }
};

// const getUser = async (userFilter) => {
//     try {
//         const filter = { username: userFilter.toLowerCase() };
//         const result = await UserProfile.findOne(filter);
//         return result;
//     } catch (error) {
//         logger.error(error);
//         return error;
//     }
// };

const getUserByUsername = async (username) => {
    try {
        return await UserProfile.findOne(
            { username: username.toLowerCase() }
        );
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const getUserByEmail = async (email) => {
    try {
        return await UserProfile.findOne(
            { email: email.toLowerCase() }
        );
    } catch (error) {
        logger.error(error);
        return error;
    }
};

module.exports = {
    addProfile,
    addUserAuth,
    updateUser,
    // getUser,
    getUserByUsername,
    getUserByEmail,
    isValidated
};