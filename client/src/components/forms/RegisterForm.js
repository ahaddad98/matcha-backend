import { RegisterFormStyle, SwitchToLogin } from "./RegisterForm.style";
import { FormStyle, TextFieldStyled } from "./input.style";
import useForm from "../../Hooks/useForm";
import { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Rings } from "react-loader-spinner";
const Register = ({ setLog }) => {
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const register = () => {
    // dispatch(
    //     userRegisterAction(
    //         values.firstName,
    //         values.firstName,
    //         values.username,
    //         values.email,
    //         values.password
    //     )
    // );
  };
  const data = useSelector((state) => state.userRegister);
  const { loading, error, user } = data;

  useEffect(() => {
    if (user) {
      MySwal.fire(
        "Good job!",
        "Email verification has been send to your email",
        "success"
      ).then(() => {
        dispatch({ type: "USER_REGISTER_CLEAR" });
        setLog(true);
      });
    }
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "irooooora",
      }).then(() => {
        dispatch({ type: "USER_REGISTER_CLEAR" });
      });
    }
  }, [data]);

  const { handleChange, values, errors, handleSubmit } = useForm(register);
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const Variant = {
    hidden: {
      x: 500,
      opaciy: 0,
    },
    show: {
      opacity: 1,
      x: [500, 0],
      transition: { duration: 1, easing: "easeInOut" },
    },
  };
  return (
    <RegisterFormStyle animate="show" initial="hidden" variants={Variant}>
      <div className="header-register">
        <h1>Welcome !</h1>
      </div>
      <FormStyle className="form-register" onSubmit={handleSubmit}>
        <TextFieldStyled
          className="input-register"
          label="First Name"
          variant="outlined"
          name="firstName"
          onChange={handleChange}
          // helperText={}
        />
        <TextFieldStyled
          className="input-register"
          label="Last Name"
          variant="outlined"
          name="lastName"
          onChange={handleChange}
        />
        <TextFieldStyled
          className="input-register"
          label="username"
          variant="outlined"
          name="username"
          onChange={handleChange}
        />
        <TextFieldStyled
          className="input-register"
          label="Email Address"
          variant="outlined"
          name="email"
          onChange={handleChange}
        />
        <TextFieldStyled
          className="input-register"
          name="password"
          label="Password"
          variant="outlined"
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextFieldStyled
          name="confirmPassword"
          className="input-register"
          label="Confirm Password"
          variant="outlined"
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {loading ? (
          <Rings ariaLabel="loading-indicator" color="red" />
        ) : (
          <input type="submit" value="Register" className="submit" />
        )}
      </FormStyle>
      <SwitchToLogin
        onClick={() => {
          setLog(true);
        }}
      >
        Already have an account ?
      </SwitchToLogin>
    </RegisterFormStyle>
  );
};

export default Register;
