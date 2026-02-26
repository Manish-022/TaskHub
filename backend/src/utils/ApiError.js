class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
      this.statusCode = statusCode;
      this.status = "fail";
    }
}
module.exports = ApiError;