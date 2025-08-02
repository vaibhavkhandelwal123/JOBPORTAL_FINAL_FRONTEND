const SignUpValidation = (name: string, value: string) => {
  switch (name) {
    case "name":
      if (value.length == 0) return "Name is required";
      if (value.length < 3) return "Name must be at least 3 characters";
      return "";
    case "email":
      if (value.length == 0) return "Email is required";
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
        return "Email is invalid";
      return "";

    case "password":
      if (value.length == 0) return "Password is required";
      if (!/[A-Z]/.test(value))
        return "Password must contain at least one uppercase letter";
      if (!/[a-z]/.test(value))
        return "Password must contain at least one lowercase letter";
      if (!/[0-9]/.test(value))
        return "Password must contain at least one number";
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
        return "Password must contain at least one special character";
      if (value.length > 20) return "Password must be at most 20 characters";
      if (value.length < 8) return "Password must be at least 8 characters";
      return "";
  }
};

const loginValidation = (name: string, value: string) => {
  switch (name) {
    case "email":
      if (value.length == 0) return "Email is required";
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
        return "Email is invalid";
      return "";

    case "password":
      if (value.length == 0) return "Password is required";
      if (!/[A-Z]/.test(value))
        return "Password must contain at least one uppercase letter";
      if (!/[a-z]/.test(value))
        return "Password must contain at least one lowercase letter";
      if (!/[0-9]/.test(value))
        return "Password must contain at least one number";
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
        return "Password must contain at least one special character";
      if (value.length > 20) return "Password must be at most 20 characters";
      if (value.length < 8) return "Password must be at least 8 characters";
      return "";
    default:
      return "";
  }
};
export { SignUpValidation, loginValidation };
