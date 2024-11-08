class Exception extends Error {
  statusCode;
  description;
  class_name;
  errors;

  constructor(name, statusCode = 500, description, class_name, errors) {
    super();
    this.name = name;
    this.statusCode = statusCode;
    this.description = description;
    this.class_name = class_name;
    this.errors = errors;
    Object.setPrototypeOf(this, Exception.prototype);
  }
}

export default Exception;
