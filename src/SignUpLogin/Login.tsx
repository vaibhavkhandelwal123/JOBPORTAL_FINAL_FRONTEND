import { Button, LoadingOverlay, PasswordInput, TextInput } from "@mantine/core";
import { AtSignIcon, LockKeyholeIcon} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginValidation } from "../Services/FormValidation";
import { useDispatch } from "react-redux";
import { NotificationError, NotificationSuccess } from "./NotificationAny";
import { setUser } from "../Slices/UserSlice";
import { setjwt } from "../Slices/JWTSlice";
import { loginUser } from "../Services/AuthService";
import {jwtDecode} from "jwt-decode";
const form = {
  email: "",
  password: "",
};
const Login = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    const updatedData = { ...data, [name]: value };
    setData(updatedData);

    setFormError({
      ...formError,
      [name]: loginValidation(name, value),
    });
  };

  const handleSubmit = () => {
    setLoader(true);
    let valid = true;
    const newFormError: { [key: string]: string } = {};

    for (const key in data) {
      newFormError[key] = loginValidation(key, data[key]);

      if (newFormError[key]) valid = false;
    }
    if (valid) {
      loginUser(data)
        .then((res) => {
          NotificationSuccess("Login successful", "Redirecting to Home Page...");
          dispatch(setjwt(res.jwt));
          const decoded = jwtDecode(res.jwt);
          dispatch(setUser({...decoded,email:decoded.sub}));
          setTimeout(() => {
            setLoader(false);
            navigate("/home");
          }, 4000);
        })
        .catch((err) => {
          setLoader(false);
          console.error("Login failed:", err);
          NotificationError("Login failed", err.response.data.errorMessage);
        });
    }
  };
  return <>
    <LoadingOverlay
          visible={loader}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'bright-sun.4', type: 'bars' }}
        />
    <div className="w-1/2 sm-mx:w-full px-20  bs-mx:px-10 md-mx:px-5 flex flex-col justify-center gap-3">
      <div className="text-2xl font-semibold">Login</div>
      <TextInput
        error={formError.email}
        value={data.email}
        onChange={handleChange}
        name="email"
        withAsterisk
        leftSection={<AtSignIcon size={20} />}
        label="Your email"
        placeholder="Your email"
      />
      <PasswordInput
        error={formError.password}
        value={data.password}
        onChange={handleChange}
        name="password"
        withAsterisk
        leftSection={<LockKeyholeIcon size={20} />}
        label="Password"
        placeholder="Password"
      />

      <Link
        to="/forgot"
        className="text-bright-sun-400 text-sm cursor-pointer hover:underline"
      >
        forgot your password?
      </Link>

      <Button loading={loader} onClick={handleSubmit} autoContrast variant="filled">
        Login
      </Button>
      <div className="mx-auto sm-mx:text-sm xs-mx:text-xs">
        Don't have an account?{" "}
        <span
          onClick={() => {
            navigate("/signup");
          }}
          className="text-bright-sun-400 sm-mx:text-sm xs-mx:text-xs hover:underline cursor-pointer"
        >
          SignUp
        </span>
      </div>
    </div>
  </>
};

export default Login;
