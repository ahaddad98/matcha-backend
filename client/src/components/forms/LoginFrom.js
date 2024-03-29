import {
  LoginFormStyle,
  HelpersStyle,
  FooterStyle,
  LoginStyle,
} from "./LoginForm.style";
import { TextFieldStyled } from "./input.style";
import useForm from "../../Hooks/useForm";
import { ReactComponent as Google } from "../../assets/icons/Google.svg";
import { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ForgotPassword from "../../views/Home/ForgotPassword";

import { Rings } from "react-loader-spinner";
import { userLogin } from "../../store/slices/authActions";
const Login = (props) => {
  let navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const loginForm = () => {
    console.log(values);
    dispatch(
      userLogin({ usename: values.username, password: values.password })
    );
    // if (!loading) {
    //     dispatch(userLoginAction(values.username, values.password));
    // }
  };

  const { handleChange, values, errors, handleSubmit } = useForm(loginForm);
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //   const userLogin = useSelector((state) => state.userLogin);
  //   const { loading, error, user } = userLogin;
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

  //   useEffect(() => {
  //     if (user) {
  //       if (user?.complete === 0) navigate("/completeProfile");
  //       else if (user?.complete) navigate("/profile");
  //     }
  //     console.log(user?.complete);
  //   }, [userLogin]);
  //   useEffect(() => {
  //     if (error) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: error.ErrorMessage,
  //       }).then(() => {
  //         // setLog(true);
  //         dispatch({ type: "USER_LOGIN_CLEAR" });
  //       });
  //     }
  //   }, [error]);
  return (
    <LoginFormStyle animate="show" initial="hidden" variants={Variant}>
      <h1>
        <span> Welcome back! </span>Please login to your account.
      </h1>
      <LoginStyle onSubmit={handleSubmit}>
        <TextFieldStyled
          className="input-login"
          label="UserName"
          variant="outlined"
          name="username"
          onChange={handleChange}
          //   error={error ? true : false}
          // helperText="Incorrect entry."
        />
        <TextFieldStyled
          //   error={error ? true : false}
          onChange={handleChange}
          name="password"
          className="input-login"
          label="Password"
          variant="outlined"
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
        {/* 
        {loading ? (
          <Rings ariaLabel="loading-indicator" color="red" />
        ) : (
          <input type="submit" value="Login" className="submit" />
          )} */}
        <input type="submit" value="Login" className="submit" />
      </LoginStyle>
      <HelpersStyle>
        <p>
          Don't have account ?
          <span
            onClick={() => {
              props.setLog(false);
            }}
            className="signup"
          >
            Sign Up
          </span>
        </p>
        <ForgotPassword />
        {/* <p className="forgot">Forgot Password?</p> */}
      </HelpersStyle>
      <FooterStyle>
        <div className="social">
          <div className="line"></div>
          <p>Or Sign in with</p>
        </div>
        <div className="google">
          <Google />
          <p>Google</p>
        </div>
        <div className="google">
          <Google />
          <p>Google</p>
        </div>
      </FooterStyle>
    </LoginFormStyle>
  );
};

export default Login;
