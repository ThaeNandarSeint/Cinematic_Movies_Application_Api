const userType = require('./user.type');
const authType = require('./auth.type');
const { mergeType } = require('@graphql-tools/merge');

module.exports = {
  typeDefs: mergeType([userType, authType]),
};
