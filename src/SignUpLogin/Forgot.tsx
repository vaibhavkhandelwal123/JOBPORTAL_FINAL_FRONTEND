import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useState, useEffect } from "react";
import { forgotUser, sendOtp, verifyOtp } from "../Services/UsersService";
import { AtSignIcon, LockKeyholeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Notification, rem } from "@mantine/core";
import { Check } from "lucide-react";
import { loginValidation } from "../Services/FormValidation";
import { NotificationError, NotificationSuccess } from "./NotificationAny";
import { useInterval, useMediaQuery } from "@mantine/hooks";
const form = {
  email: "",
  password: "",
};
const Forgot = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [seconds, setSeconds] = useState(60);
  const interval = useInterval(() => setSeconds((s) => s - 1), 1000);
  const matches = useMediaQuery("(min-width: 475px)");

  useEffect(() => {
    if (interval.active && seconds <= 0) {
      interval.stop();
      setSeconds(0);
    }
  }, [seconds, interval]);

  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const [time, setTime] = useState(5);
  const [submit, setSubmit] = useState(false);
  const [Otp, setOtp] = useState(false);
  const [verify, setVerify] = useState(false);
  const [otpValue, setOtpValueState] = useState("");
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(false);
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
    setFormError({
      ...formError,
      [name]: loginValidation(name, value),
    });
  };

  const handleSubmit = () => {
    let valid = true;
    const newFormError: { [key: string]: string } = {};

    for (const key in data) {
      newFormError[key] = loginValidation(key, data[key]);

      if (newFormError[key]) valid = false;
    }

    if (valid) {
      forgotUser(data)
        .then((res) => {
          console.log("Password reset successful:", res);
          setSubmit(true);
          const interval = setInterval(() => {
            setTime((prev) => {
              if (prev <= 1) {
                clearInterval(interval);
                navigate("/login");
                return 5;
              }
              return prev - 1;
            });
          }, 1000);
        })
        .catch((err) => {
          console.error("Password reset failed:", err);
          NotificationError(
            "Password reset failed",
            err.response.data.errorMessage
          );
        });
    }
  };
  const handleOTP = () => {
    setLoading(true);
    if (data.email) {
      sendOtp(data.email)
        .then((res) => {
          console.log("OTP sent successfully:", res);
          NotificationSuccess(
            "OTP sent successfully",
            "Enter the OTP to verify your email"
          );
          setOtp(true);
          setFirst(true);
          setLoading(false);
          setSeconds(60);
          interval.start();
        })
        .catch((err) => {
          NotificationError(
            "Failed to send OTP",
            err.response.data.errorMessage
          );
          setLoading(false);
        });
    } else {
      NotificationError("Email required", "Please enter your email");
    }
  };
  const handleverify = () => {
    if (otpValue !== "" && data.email) {
      let value = data.email.trim();
      verifyOtp(value, otpValue)
        .then((res) => {
          console.log("OTP verified successfully:", res);
          NotificationSuccess(
            "OTP verified successfully",
            "Please enter your new password"
          );
          setVerify(true);
        })
        .catch((err) => {
          console.error("Failed to verify OTP:", err);
          NotificationError(
            "Failed to verify OTP",
            err.response.data.errorMessage
          );
        });
    } else {
      alert("Please enter your OTP");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5 items-center justify-center min-h-screen">
        <div className="border md-mx:w-[80vh] sm-mx:w-[60vh] xs-mx:w-[40vh] bg-mine-shaft-850 w-[100vh] border-bright-sun-400 rounded-xl p-5 flex flex-col gap-3">
          <div className="text-2xl sm-mx:text-xl xs-mx:text-lg font-semibold text-center">
            Forgot Password
          </div>
          <div className="md-mx:gap-5 flex flex-wrap items-center gap-7 sm-mx:gap-2 xs-mx:gap-0">
            <TextInput
              error={formError.email}
              value={data.email}
              onChange={handleChange}
              name="email"
              withAsterisk
              leftSection={<AtSignIcon size={20} />}
              label="Your email"
              placeholder="Your email"
              className="w-3/4 sm-mx:w-[250px] xs-mx:w-full"
            />

            {!first ? (
              <Button
                className="mt-6"
                w={!matches ? "100%":""}
                onClick={handleOTP}
                loading={loading}
                autoContrast
                variant="filled"
                disabled={Otp || data.email === "" || formError.email !== ""}
              >
                Send OTP
              </Button>
            ) : (
              <Button
                className="mt-6"
                onClick={handleOTP}
                w={!matches ? "100%":""}
                loading={loading}
                autoContrast
                variant="filled"
                disabled={
                  interval.active || data.email === "" || formError.email !== ""
                }
              >
                {interval.active ? `${seconds} s` : "Resend OTP"}
              </Button>
            )}
          </div>

          <div className=" md-mx:gap-5 w-full flex flex-wrap items-center gap-7 sm-mx:gap-2 xs-mx:gap-0">
            {Otp && (
              <>
                <TextInput
                  value={otpValue}
                  onChange={(e) => setOtpValueState(e.target.value)}
                  name="otp"
                  withAsterisk
                  label="Enter OTP"
                  placeholder="Enter OTP"
                  className="w-3/4 sm-mx:w-[250px] xs-mx:w-full"
                />

                <Button
                  className="mt-3"
                  onClick={handleverify}
                  w={!matches ? "100%":""}
                  autoContrast
                  variant="filled"
                  disabled={verify || otpValue === "" || data.email === ""}
                >
                  Verify OTP
                </Button>
              </>
            )}
          </div>

          {verify && (
            <PasswordInput
              error={formError.password}
              value={data.password}
              onChange={handleChange}
              name="password"
              withAsterisk
              leftSection={<LockKeyholeIcon size={20} />}
              label="New Password"
              placeholder="New Password"
              className="w-3/4 mt-3 sm-mx:w-[250px] xs-mx:w-full"
            />
          )}
          {verify && (
            <Button
              className="mt-3"
              onClick={handleSubmit}
              autoContrast
              variant="filled"
              disabled={
                data.password === "" || formError.password !== "" || !verify
              }
            >
              Reset Password
            </Button>
          )}
          <div className="text-sm text-bright-sun-400">
            <Link
              className="cursor-pointer sm-mx:text-sm xs-mx:text-xs hover:underline"
              to="/login"
            >
              return to login page
            </Link>
          </div>
        </div>
      </div>
      <Notification
        className={`!border-bright-sun-400 !fixed top-0 left-[35%] z-[1001] -translate-y-20 transition duration-300 ease-in-out ${
          submit ? "translate-y-0" : "-translate-y-40"
        }`}
        icon={<Check style={{ width: rem(20), height: rem(20) }} />}
        color="teal"
        title="Password Reset Successfully..."
        mt="md"
        withBorder
        withCloseButton={false}
      >
        Redirecting to the Login page in {time} seconds ...
      </Notification>
    </>
  );
};

export default Forgot;
