import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import Input from "../Components/Input";
import { base_url } from "../utils/config.js";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await fetch(`${base_url}users/adminSignin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (result.status == "Success") {
        localStorage.setItem("email", email);
        localStorage.setItem("verification_code", result.data.code);
        navigate("/verify");
      } else {
        setError(result.message || "Login failed.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen transition-all">
      <div className="bg-green2 flex flex-col items-center p-14 w-[500px] rounded-[20px] transition-all border border-black">
        <div>
          <h1 className="text-[36px] font-semibold pb-[50px]">Login !</h1>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="pb-[26px]">
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="pb-[40px]">
            <Input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <Link
              to={"/forgot-password"}
              className="underline flex items-end justify-end w-full font-bold text-[14px] pt-[5px]"
            >
              Forget Password?
            </Link>
          </div>

          {error && <div className="text-red-500 text-sm pb-2 text-center">{error}</div>}

          <div className="flex justify-center">
            <Button text="Sign In" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
