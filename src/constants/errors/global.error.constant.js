module.exports = {
  INTERNAL_SERVER_ERROR: {
    message: 'Internal Server Error',
    code: 'INTERNAL_SERVER_ERROR',
    status: 500,
  },
  BAD_USER_INPUT: {
    message: 'Bad User Input',
    code: 'BAD_USER_INPUT',
    status: 400,
  },
  BAD_REQUEST: {
    message: 'Bad Request',
    code: 'BAD_REQUEST',
    status: 400,
  },
  UNAUTHENTICATED: {
    message: 'Unauthenticated',
    code: 'UNAUTHENTICATED',
    status: 401,
  },
  UNAUTHORIZED: {
    message: 'Unauthorized',
    code: 'UNAUTHORIZED',
    status: 403,
  },
  GRAPHQL_PARSE_FAILED: {
    message: 'GraphQL Parse Failed',
    code: 'GRAPHQL_PARSE_FAILED',
    status: 400,
  },
  GRAPHQL_VALIDATION_FAILED: {
    message: 'GraphQL Validation Failed',
    code: 'GRAPHQL_VALIDATION_FAILED',
    status: 400,
  },
  PERSISTED_QUERY_NOT_FOUND: {
    message: 'Persisted Query Not Found',
    code: 'PERSISTED_QUERY_NOT_FOUND',
    status: 400,
  },
  PERSISTED_QUERY_NOT_SUPPORTED: {
    message: 'Persisted Query Not Supported',
    code: 'PERSISTED_QUERY_NOT_SUPPORTED',
    status: 400,
  },
  OPERATION_RESOLUTION_FAILURE: {
    message: 'Operation Resolution Failure',
    code: 'OPERATION_RESOLUTION_FAILURE',
    status: 500,
  },
};
