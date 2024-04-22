const { mergeResolvers } = require('@graphql-tools/merge');
const adminResolver = require('./admin.resolver');
const authResolver = require('./auth.resolver');

module.exports = mergeResolvers([adminResolver, authResolver]);
