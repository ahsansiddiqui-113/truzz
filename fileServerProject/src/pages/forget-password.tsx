import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Components/Input";
import Button from "../Components/Button";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required.");
      return;
    }

    setError("");
    try {
      const response = await fetch(`https://mentorloungeuni-69fabc1001d8.herokuapp.com/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccess("OTP sent successfully to your email.");
        setTimeout(() => navigate("/verify"), 2000);
      } else {
        setError(data.message || "Failed to send OTP. Try again.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen transition-all">
      <div className="bg-green2 flex flex-col gap-y-[70px] items-center p-14 w-[500px] rounded-[20px] transition-all border border-black">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-[36px] font-semibold">Forget Password!</h1>
          <p className="text-black text-center">
            Enter your valid email address where you receive the OTP.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="w-full pb-[40px]">
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500 text-sm pb-2 text-center">{error}</div>}
          {success && <div className="text-green-500 text-sm pb-2 text-center">{success}</div>}
          <div className="flex justify-center">
            <Button text="Reset" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
