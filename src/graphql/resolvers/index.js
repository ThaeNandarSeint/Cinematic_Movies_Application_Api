const { mergeResolvers } = require('@graphql-tools/merge');
const userResolvers = require('./user.resolver');
const authResolvers = require('./auth.resolver');

module.exports = mergeResolvers([userResolvers, authResolvers]);
