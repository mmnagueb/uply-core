const userProfile = require("../model/user/profile");
const userAuth = require("../model/auth/user_auth");
const logger = require("../../logger").logger;

const addProfile = async (user) => {
    // add user to databas
    try {
        const result = await userProfile.create({
            username: user.username.toLowerCase().trim(),
            email: user.email
        });
        return result;
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const addUserAuth = async (payload) => {
    // add user to databas
    try {
        const result = await userAuth.create({
            username: payload.username.toLowerCase(),
            password: payload.password,
        });
        return result;
    } catch (error) {
        logger.error(error);
        return error;
    }
};

const isValidated = async (consumer, password) => {
    // add user to databas
    try {
        const filter = { username: consumer.username };
        // fetch the user and test password verification
        const result = await userAuth.findOne(filter);
        const isValid = await result.comparePassword(password);
        return isValid;
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

        const result = await userProfile.findOneAndUpdate(
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

const getUser = async (username) => {
    try {
        const filter = { username: username.toLowerCase() };
        const result = await userProfile.findOne(filter);
        return result;
    } catch (error) {
        logger.error(error);
        return error;
    }
};

module.exports = {
    addProfile,
    addUserAuth,
    updateUser,
    getUser,
    isValidated
};