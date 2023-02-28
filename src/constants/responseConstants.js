const RESPONSE_CONSTANTS = {
  'INVALID_FIELD': () => [`Invalid value for field`, 400],
  'UNAUTHORIZED': () => ['Unauthorized access', 401],
  'INTERNAL_SERVER_ERROR': () => ['Internal Server Error', 500],
  'VALIDATION_ERROR': ()=>['Invalid', 400],
  'FORBIDDEN': ()=>['Forbidde Access', 403],
  'NOT_FOUND': ()=>['Not Found', 404],
  'REQUIRED_FIELD': ()=> ['Fields are missing', 400],
  'ALREADY_EXISTS': ()=>['Resource Already Exists', 400],
  'INCORRECT_PASSWORD_LENGTH': ()=>['Password length must be 8 characters or more', 400]
}
module.exports = RESPONSE_CONSTANTS
