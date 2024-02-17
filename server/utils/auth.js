const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    const token = req.headers.authorization || '';

    if (!token) {
      throw new Error('Authentication token missing');
    }

    try {
      const { data } = jwt.verify(token, secret);
      return { user: data };
    } catch (error) {
      console.error(error.message);
      throw new Error('Invalid or expired token');
    }
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
