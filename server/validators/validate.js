class Validate {
  static validate_gender(obj) {
    if (obj.hasOwnProperty("gender")) {
      const valid = /^(MALE)$|^(FEMALE)$/.test(obj.gender);
      if (!valid) {
        return {
          field: "gender",
          error: "invalid value, expected: MALE OR FEMALE",
        };
      }
    }
  }

  static validate_tags(obj) {
    const tags = ["vegan", "geek", "piercing"];
    const set_tags = new Set(tags);
    if (obj.hasOwnProperty("tags")) {
      if (
        !Array.isArray(obj.tags) ||
        obj.tags.some((el) => !set_tags.has(el))
      ) {
        return {
          field: "tags",
          error: `invalid, expected: ${tags}`,
        };
      }
    }
  }

  static validate_birthday(obj) {
    if (obj.hasOwnProperty("birthday")) {
      const valid =
        /^(19|20)\d{2}\-(0[1-9]|1[0-2])\-(0[1-9]|1[0-9]|2[0-9]|3[01])$/.test(
          obj.birthday
        );
      if (!valid) {
        return {
          field: "birthday",
          error: "expected format: YYYY-MM-DD",
        };
      }
    }
  }

  static validate_sexual_preferences(obj) {
    const sexual_preferences = ["MALE", "FEMALE"];
    const set_preferences = new Set(sexual_preferences);
    if (obj.hasOwnProperty("sexual_preferences")) {
      if (
        !Array.isArray(obj.sexual_preferences) ||
        obj.sexual_preferences.some((el) => !set_preferences.has(el))
      ) {
        return {
          field: "sexual_preferences",
          error: `invalid, expected: ${sexual_preferences}`,
        };
      }
    }
  }

  static validate_password(obj) {
    if (obj.hasOwnProperty("password")) {
      const valid =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}_|<>])[A-Za-z\d!@#$%^&*(),.?":{}_|<>]{8,}$/.test(
          obj.password
        );
      if (!valid) {
        return {
          field: "password",
          error: "invalid password",
        };
      }
    }
  }
  static validate_email(obj) {
    if (obj.hasOwnProperty("email")) {
      const valid =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          obj.email
        );
      if (!valid) {
        return {
          field: "email",
          error: "invalid format, ex: tmp@gmail.com",
        };
      }
    }
  }
  static validate_username(obj) {
    if (obj.hasOwnProperty("username")) {
      const valid = /^[A-Za-z0-9_]{7,29}$/.test(obj.username);
      if (!valid) {
        return {
          field: "username",
          error: "invalid username",
        };
      }
    }
  }
  static validate_last_name(obj) {
    if (obj.hasOwnProperty("last_name")) {
      const valid = /^[A-Za-z]{2,29}$/.test(obj.last_name);
      if (!valid) {
        return {
          field: "last_name",
          error: "invalid lastname",
        };
      }
    }
  }

  static validate_first_name(obj) {
    if (obj.hasOwnProperty("first_name")) {
      const valid = /^[A-Za-z]{3,29}$/.test(obj.first_name);
      if (!valid) {
        return {
          field: "first_name",
          error: "invalid firstname",
        };
      }
    }
  }
  static validate_latitude(obj) {
    if (obj.hasOwnProperty("latitude")) {
      const validLatitude = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/.test(
        obj.latitude
      );
      if (!validLatitude) {
        return {
          field: "latitude",
          error: "invalid latitude",
        };
      }
    }
  }
  static validate_longitude(obj) {
    if (obj.hasOwnProperty("longitude")) {
      const validLongitude = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/.test(
        obj.longitude
      );

      if (!validLongitude) {
        return {
          field: "longitude",
          error: "invalid longitude",
        };
      }
    }
  }

  static validate_update_fields(obj) {
    const errors = [];
    errors.push(this.validate_first_name(obj));
    errors.push(this.validate_last_name(obj));
    errors.push(this.validate_gender(obj));
    errors.push(this.validate_sexual_preferences(obj));
    errors.push(this.validate_tags(obj));
    if (obj.hasOwnProperty("latitude") && obj.hasOwnProperty("longitude")) {
      errors.push(this.validate_latitude(obj));
      errors.push(this.validate_longitude(obj));
    }
    errors.push(this.validate_birthday(obj));
    return errors.filter((err) => err);
  }

  static validate_fields(obj) {
    const errors = [];
    if (obj.hasOwnProperty("email")) {
      errors.push(this.validate_email(obj));
    } else {
      errors.push({
        field: "email",
        error: "required",
      });
    }
    if (obj.hasOwnProperty("password")) {
      errors.push(this.validate_password(obj));
    } else {
      errors.push({
        field: "password",
        error: "required",
      });
    }
    if (obj.hasOwnProperty("first_name")) {
      errors.push(this.validate_first_name(obj));
    } else {
      errors.push({
        field: "first_name",
        error: "required",
      });
    }
    if (obj.hasOwnProperty("last_name")) {
      errors.push(this.validate_last_name(obj));
    } else {
      errors.push({
        field: "last_name",
        error: "required",
      });
    }
    if (obj.hasOwnProperty("username")) {
      errors.push(this.validate_username(obj));
    } else {
      errors.push({
        field: "username",
        error: "required",
      });
    }
    if (obj.hasOwnProperty("latitude")) {
      errors.push(this.validate_latitude(obj));
    } else {
      errors.push({
        field: "latitude",
        error: "required",
      });
    }
    if (obj.hasOwnProperty("longitude")) {
      errors.push(this.validate_longitude(obj));
    } else {
      errors.push({
        field: "longitude",
        error: "required",
      });
    }

    return errors.filter((err) => err);
  }
}

export default Validate;

// console.log(obj);
// const errors = [];
// if (obj.hasOwnProperty("email")) {
//   const valid =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
//       obj.email
//     );
//   if (!valid) {
//     errors.push({
//       field: "email",
//       error: "invalid format, ex: tmp@gmail.com",
//     });
//   }
// } else {
//   errors.push({
//     field: "email",
//     error: "required",
//   });
// }
// if (obj.hasOwnProperty("password")) {
//   const valid =
//     /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
//       obj.password
//     );
//   if (!valid) {
//     errors.push({
//       field: "password",
//       error: "invalid password",
//     });
//   }
// } else {
//   errors.push({
//     field: "password",
//     error: "required",
//   });
// }

// if (obj.hasOwnProperty("geoPoint")) {
// const { geoPoint } = obj;
// if (geoPoint.hasOwnProperty("latitude")) {
//   const validLatitude = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/.test(
//     geoPoint.latitude
//   );
//   if (!validLatitude) {
//     errors.push({
//       field: "latitude",
//       error: "invalid latitude",
//     });
//   }
// } else {
//   errors.push({
//     field: "latitude",
//     error: "required",
//   });
// }
//   if (geoPoint.hasOwnProperty("longitude")) {
//     const validLongitude = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/.test(
//       obj.geoPoint.longitude
//     );

//     if (!validLongitude) {
//       errors.push({
//         field: "longitude",
//         error: "invalid longitude",
//       });
//     }
//   } else {
//     errors.push({
//       field: "longitude",
//       error: "required",
//     });
//   }
// } else {
//   errors.push({
//     field: "geoPoint",
//     error: "required",
//   });
// }
// if (obj.hasOwnProperty("username")) {
//   const valid = /^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(obj.username);
//   if (!valid) {
//     errors.push({
//       field: "username",
//       error: "invalid username",
//     });
//   }
// } else {
//   errors.push({
//     field: "username",
//     error: "required",
//   });
// }

// if (obj.hasOwnProperty("first_name")) {
//   const valid = /^[A-Za-z]{3,29}$/.test(obj.first_name);
//   if (!valid) {
//     errors.push({
//       field: "first_name",
//       error: "invalid firstname",
//     });
//   }
// } else {
//   errors.push({
//     field: "first_name",
//     error: "required",
//   });
// }

// if (obj.hasOwnProperty("last_name")) {
//   const valid = /^[A-Za-z]{2,29}$/.test(obj.last_name);
//   if (!valid) {
//     errors.push({
//       field: "last_name",
//       error: "invalid lastname",
//     });
//   }
// } else {
//   errors.push({
//     field: "last_name",
//     error: "required",
//   });
// }
