const { mergeType } = require('@graphql-tools/merge');

const admin = `#graphql
    type Avatar {
        url: String
        key: String
        filename: String
    }
    type Admin {
        _id: String
        adminId: String
        name: String
        email: String
        password: String
        isActive: Boolean
        avatar: Avatar
    }
`;

const adminResponse = `#graphql
    type Payload {
        count: Int
        admins: [Admin]
    }
`;

const getAdmins = `#graphql    
    input getAdminsFilter {
        skip: Int, 
        limit: Int
        search: String
    }
    type Query {
        getAdmins(filter: getAdminsFilter): Payload
    }
`;

const getAdminById = `#graphql
    type Query {
        getAdminById(id: String): Admin
    }
`;

module.exports = mergeType([admin, adminResponse, getAdmins, getAdminById]);
