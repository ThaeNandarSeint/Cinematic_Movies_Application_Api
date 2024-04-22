const adminType = require('./admin.type');
const authType = require('./auth.type');
const { mergeType } = require('@graphql-tools/merge');

module.exports = {
  typeDefs: mergeType([adminType, authType]),
};
