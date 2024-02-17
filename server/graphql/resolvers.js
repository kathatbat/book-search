const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (!context.user) {
        throw new Error('Authentication required');
      }
      return await User.findById(context.user._id);
    }
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user || !user.isCorrectPassword(password)) {
        throw new Error('Incorrect email or password');
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (_, { bookData }, context) => {
      if (!context.user) {
        throw new Error('Authentication required');
      }
      const user = await User.findByIdAndUpdate(context.user._id, { $push: { savedBooks: bookData } }, { new: true });
      return user;
    },
    removeBook: async (_, { bookId }, context) => {
      if (!context.user) {
        throw new Error('Authentication required');
      }
      const user = await User.findByIdAndUpdate(context.user._id, { $pull: { savedBooks: { bookId } } }, { new: true });
      return user;
    }
  }
};

module.exports = resolvers;
