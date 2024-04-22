const { mergeResolvers } = require('@graphql-tools/merge');
const adminResolver = require('./admin.resolver');
const authResolver = require('./auth.resolver');
const roleResolver = require('./role.resolver');

module.exports = mergeResolvers([adminResolver, authResolver, roleResolver]);
