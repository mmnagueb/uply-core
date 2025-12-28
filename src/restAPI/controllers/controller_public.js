const logger = require("../../../logger").logger;
// const Response = require("../../common/response").Response;
const { Response } = require("../../common/response");
const userDB = require("./../../database/db_user");
const authDB = require("./../../database/db_auth");

const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "360d",
  });
}

/**
 * @async
 * @route   POST /api/v1/public/create
 * @returns {User}
 * @author  Bassam
 * @access  public
 * @version 1.0
 */

exports.createAPI = async (req, res) => {
  try {
    const { username, email, password } = req.body.data;
    /**
     *  {
     *      "data": {
     *          "username": "test_acount",
     *          "email": "test@gmail.com",
     *          "password": "SECRET"
     *      }
     * }
     *
     */

    if (!username || !email || !password) {
      return res.status(400).send(
        Response.badRequest({
          msg: "You should add user data to create a new user.",
        })
      );
    }
    /// validate if the user is already exist...
    const isUserExist = await userDB.getUserByUsername(username);
    if (isUserExist !== null)
      return res.status(401).send(
        Response.badRequest({
          msg: "Username is already exist.",
        })
      );
    const isEmailExist = await userDB.getUserByEmail(email);
    if (isEmailExist !== null)
      return res.status(401).send(
        Response.badRequest({
          msg: "Email is already exist.",
        })
      );

    await userDB.addUserAuth(username, email, password);
    const result = await userDB.addProfile(username, email);
    if (result.code === 11000 || result.level === "error") {
      return res.status(401).send(
        Response.unauthorized({
          msg: result.message,
        })
      );
    }
    
    return res.status(201).send(
      Response.successful({
        msg: result._message,
        code: 201,
        data: result,
      })
    );
  } catch (error) {
    logger.error(error);
    return res.status(520).send(Response.unknown());
  }
};

/**
 * @async
 * @route   POST /api/v1/public/login
 * @returns {Token} Login API
 * @author  Bassam
 * @access  public
 * @version 1.0
 */

exports.loginAPI = async (req, res) => {
  // Authenticate User
  if (!req.body.data) {
    return res.status(400).send(
      Response.badRequest({
        msg: "You should add user data to login a new user.",
      })
    );
  }
  const username = req.body.data.username;
  const email = req.body.data.email;
  const password = req.body.data.password;

  if ((!username && !email) || !password) {
    return res.status(401).send(
      Response.unauthorized({
        msg: "You should add user data to login a new user.",
      })
    );
  }

  let consumer;
  let filter = {};

  try {
    if (email !== undefined) {
      consumer = await userDB.getUserByEmail(email);
      filter = { email: consumer.email };
    } else {
      consumer = await userDB.getUserByUsername(username);
      filter = { username: consumer.username };
    }
  } catch (error) {
    return res
      .status(400)
      .send(Response.badRequest({ msg: "Username/Email is not exist." }));
  }

  const isValid = await userDB.isValidated(filter, password);
  if (isValid !== true) {
    return res
      .status(400)
      .send(Response.unauthorized({ msg: "Password is incorrect." }));
  }

  const user = { username: consumer.username };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  const result = await authDB.updateTokens(
    consumer._id,
    accessToken,
    refreshToken,
    true
  );
  if (result.level == "error") {
    return res.status(520).send(Response.unknown());
  }
  if (!result) {
    const tokens = await authDB.addTokens(consumer, accessToken, refreshToken);
    return res.status(200).send(
      Response.successful({
        data: tokens,
      })
    );
  }
  return res.status(200).send(
    Response.successful({
      data: {
        user: result,
      },
    })
  );
};

/**
 * @async
 * @route   POST /api/v1/public/refresh
 * @returns {Token} refresh API
 * @author  Bassam
 * @access  public
 * @version 1.0
 */

exports.refreshAPI = async (req, res) => {
  const username = req.body.data.username;
  const refreshToken = req.body.data.refreshToken;

  if (refreshToken == null) return res.sendStatus(401);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = generateAccessToken({ name: user.username });
      const newRefreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      const result = await authDB.updateTokens(
        username,
        accessToken,
        newRefreshToken,
        false
      );
      if (result === false) {
        return res.status(401).send(Response.forbidden({}));
      }
      return res.status(200).send(
        Response.successful({
          data: result,
        })
      );
    }
  );
};
