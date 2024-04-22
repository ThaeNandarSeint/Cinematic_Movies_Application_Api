const { mergeType } = require('@graphql-tools/merge');

const user = `#graphql
    type Avatar {
        url: String
        key: String
        filename: String
    }
    type User {
        _id: String
        userId: String
        name: String
        email: String
        password: String
        isActive: Boolean
        avatar: Avatar
    }
`;

const userResponse = `#graphql
    type Payload {
        count: Int
        users: [User]
    }
`;

const getUsers = `#graphql    
    input getUsersFilter {
        skip: Int, 
        limit: Int
        search: String
    }
    type Query {
        getUsers(filter: getUsersFilter): Payload
    }
`;

const getUserById = `#graphql
    type Query {
        getUserById(id: String): User
    }
`;

module.exports = mergeType([user, userResponse, getUsers, getUserById]);
