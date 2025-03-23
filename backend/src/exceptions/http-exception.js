class HttpException extends Error {
  constructor({type, message, statusCode}) {
    super(message);
    this.type = type;
    this.statusCode = statusCode || 500;
  }
}

export { HttpException }
