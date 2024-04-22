const { mergeType } = require('@graphql-tools/merge');

const role = `#graphql
    type Permission {
        action: [String]
        subject: [String]
    }
    type Role {
        _id: String
        roleId: String
        name: String
        permissions: [Permission]
    }
`;

const roleResponse = `#graphql
    type Payload {
        count: Int
        roles: [Role]
    }
`;

const getAllRoles = `#graphql    
    input getAllRolesFilter {
        skip: Int, 
        limit: Int
        search: String
    }
    type Query {
        getAllRoles(filter: getAllRolesFilter): Payload
    }
`;

const getRoleById = `#graphql
    type Query {
        getRoleById(id: String): Role
    }
`;

const createRole = `#graphql
    input permissionInput {
        action: [String]
        subject: [String]
    }
    input roleInput {
        name: String
        permissions: [permissionInput]
    }
    type Mutation {
        createRole(data: roleInput): Role        
    }
`;

const updateRole = `#graphql
    type Mutation {
        updateRole(id: String, data: roleInput): Role
    }
`;

module.exports = mergeType([
  role,
  roleResponse,
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
]);
