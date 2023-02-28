const RESPONSE_CONSTANTS  = require('../constants/responseConstants');

class SuccessResponse {
  constructor(payload, status_code = 200) {
    this.response = {
      status: 'success',
      result: payload,
    };
    this.status_code = status_code;
  }
  get (){
    return [this.status_code, this.response]
  }
}

class ErrorResponse {
    constructor(args) {
      const error = {};
      const types = args.name !== 'Error'? args.name : args.message;
      let error_format;
      try {
            error_format = RESPONSE_CONSTANTS[types];
            if (!error_format){
                console.log(args);
                error_format = RESPONSE_CONSTANTS.INTERNAL_SERVER_ERROR;
            }
      } catch (err) {
            console.log(err);
            error_format = RESPONSE_CONSTANTS.INTERNAL_SERVER_ERROR;
      } 
      error.message = error_format()[0];
  
      this.response = {
        status: 'error',
        error,
      };
      this.status_code = error_format()[1];
    }
    get (){
      return [this.status_code, this.response];
    }
  }

module.exports = { SuccessResponse, ErrorResponse };
