const HttpStatus = Object.freeze({
  EXPIRED_TOKEN: Symbol("EXPIRED_TOKEN"),
  ACTIVATION_KEY_NOT_FOUND: Symbol("ACTIVATION_KEY_NOT_FOUND"),
  RESET_KEY_NOT_FOUND: Symbol("RESET_KEY_NOT_FOUND"),
  RESET_KEY_EXPIRED: Symbol("RESET_KEY_EXPIRED"),
});

export default HttpStatus;
