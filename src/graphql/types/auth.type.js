const { mergeType } = require('@graphql-tools/merge');

const auth = `#graphql
    type authResponse {
        admin: Admin
        token: String
    }
`;

const register = `#graphql
    input registerInput {
        name: String
        email: String
        password: String
    }        
    type Mutation {
        register(data: registerInput): authResponse        
    }
`;

const login = `#graphql
    input loginInput {
        email: String
        password: String
    }
    type Mutation {
        login(data: loginInput): authResponse
    }
`;

module.exports = mergeType([auth, register, login]);
