const { mergeType } = require('@graphql-tools/merge');
const adminType = require('./admin.type');
const authType = require('./auth.type');
const roleType = require('./role.type');

module.exports = {
  typeDefs: mergeType([adminType, authType, roleType]),
};
