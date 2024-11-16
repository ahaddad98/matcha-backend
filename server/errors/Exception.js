class Exception extends Error {
  statusCode;
  description;
  errors;

  constructor(name, statusCode = 500, description, errors) {
    super();
    this.name = name;
    this.statusCode = statusCode;
    this.description = description;
    this.errors = errors;
    Object.setPrototypeOf(this, Exception.prototype);
  }
}

export default Exception;
