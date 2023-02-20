const { Response, sendFile } = require('express');
const RESPONSE_CONSTANTS  = require('../constants/responseConstants');


class CoreResponse {
  static json(response, status, mimetype = 'application/json') {
    console.log(`status : ${status}`);
    return Response.status(status).json(response, {mimetype});
  }

  static file(file_content, file_name, mimetype = 'application/zip') {
    return sendFile(file_content, {
      root: '/',
      headers: {
        'Content-Type': mimetype,
        'Content-Disposition': `attachment; filename=${file_name}`,
      },
    });
  }
}

class SuccessResponse {
  constructor(payload, status_code = 200) {
    this.response = {
      status: 'success',
      result: payload,
    };
    this.status_code = status_code;
  }

  send(res) {
    return CoreResponse.json(this.response, this.status_code);
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
            error_format = RESPONSE_CONSTANTS.INTERNAL_SERVER_ERROR;
            console.log(error_format);
      } 

      error.message = error_format()[0];
  
      this.response = {
        status: 'error',
        error,
      };
      this.status_code = error_format()[1];
    }
  
    send(res) {
      return CoreResponse.json(this.response, this.status_code);
    }
  }

module.exports = { SuccessResponse, ErrorResponse };
