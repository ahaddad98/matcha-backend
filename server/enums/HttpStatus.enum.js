const HttpStatus = Object.freeze({
  EXPIRED_TOKEN: Symbol("EXPIRED_TOKEN"),
  ACTIVATION_KEY_NOT_FOUND: Symbol("ACTIVATION_KEY_NOT_FOUND"),
});

export default HttpStatus;
