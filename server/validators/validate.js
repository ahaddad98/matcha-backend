class Validate {
  static validate_register_payload(obj) {
    const errors = [];
    if (obj.hasOwnProperty("email")) {
      const valid =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          obj.email
        );
      if (!valid) {
        errors.push({
          field: "email",
          error: "invalid format, ex: tmp@gmail.com",
        });
      }
    } else {
      errors.push({
        field: "email",
        error: "required",
      });
    }
    if (obj.hasOwnProperty("password")) {
      const valid =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
          obj.password
        );
      if (!valid) {
        errors.push({
          field: "password",
          error: "invalid password",
        });
      }
    } else {
      errors.push({
        field: "password",
        error: "required",
      });
    }

    if (obj.hasOwnProperty("geoPoint")) {
      const { geoPoint } = obj;
      if (geoPoint.hasOwnProperty("latitude")) {
        const validLatitude = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/.test(
          geoPoint.latitude
        );
        if (!validLatitude) {
          errors.push({
            field: "latitude",
            error: "invalid latitude",
          });
        }
      } else {
        errors.push({
          field: "latitude",
          error: "required",
        });
      }
      if (geoPoint.hasOwnProperty("longitude")) {
        const validLongitude = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/.test(
          obj.geoPoint.longitude
        );

        if (!validLongitude) {
          errors.push({
            field: "longitude",
            error: "invalid longitude",
          });
        }
      } else {
        errors.push({
          field: "longitude",
          error: "required",
        });
      }
    } else {
      errors.push({
        field: "geoPoint",
        error: "required",
      });
    }
    if (obj.hasOwnProperty("username")) {
      const valid = /^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(obj.username);
      if (!valid) {
        errors.push({
          field: "username",
          error: "invalid username",
        });
      }
    } else {
      errors.push({
        field: "username",
        error: "required",
      });
    }

    if (obj.hasOwnProperty("first_name")) {
      const valid = /^[A-Za-z]{3,29}$/.test(obj.first_name);
      if (!valid) {
        errors.push({
          field: "first_name",
          error: "invalid firstname",
        });
      }
    } else {
      errors.push({
        field: "first_name",
        error: "required",
      });
    }

    if (obj.hasOwnProperty("last_name")) {
      const valid = /^[A-Za-z]{2,29}$/.test(obj.last_name);
      if (!valid) {
        errors.push({
          field: "last_name",
          error: "invalid lastname",
        });
      }
    } else {
      errors.push({
        field: "last_name",
        error: "required",
      });
    }
    return errors;
  }

  static validate_profile_payload(obj) {
    return [];
  }
}

export default Validate;
