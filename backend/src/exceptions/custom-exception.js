class CustomException extends Error {
  constructor(message, type, statusCode) {
    super(message);
    this.type = type;
    this.statusCode = statusCode || 500;
    Error.captureStackTrace(this, this.constructor);
  }
}

export { CustomException }
