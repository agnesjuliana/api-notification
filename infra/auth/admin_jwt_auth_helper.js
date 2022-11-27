const jwt = require('jsonwebtoken');
const config = require('../config/global_config');
const wrapper = require('../../helpers/utils/wrapper');
const { ERROR } = require('../../helpers/http-status/status_code');
const { UnauthorizedError, ForbiddenError } = require('../../helpers/error');

const getToken = (headers) => {
  if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    };
  };
  return undefined;
};

const verifyToken = async (req, res, next) => {
  const result = {
    err: null,
    data: null
  };

  const jwtKey = config.get('/jwtKeyAdmin');
  // const verifyOptions = {
  //   algorithm: 'HS512',
  //   expiresIn: '7d'
  // };

  const encryptedtoken = getToken(req.headers);
  if (!encryptedtoken) {
    result.err = new ForbiddenError('Invalid token!');
    return wrapper.response(res, 'fail', result, 'Invalid token!', ERROR.FORBIDDEN);
  };

  let decodedToken;
  try {
    decodedToken = await jwt.verify(encryptedtoken, jwtKey);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      result.err = new UnauthorizedError('Access token expired!');
      return wrapper.response(res, 'fail', result, 'Access token expired!', ERROR.UNAUTHORIZED);
    }
    result.err = new UnauthorizedError('Invalid token!');
    return wrapper.response(res, 'fail', result, 'Invalid token!', ERROR.UNAUTHORIZED);
  }

  req.userData = decodedToken;
  next();
};

const generateToken = async (payload) => {
  const jwtKey = config.get('/jwtKeyAdmin');
  const options = { expiresIn: "5 days" };
  const token = jwt.sign(payload, jwtKey, options);
  return token;
};

module.exports = {
  verifyToken, generateToken
};
