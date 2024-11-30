"use client";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, RefObject } from "react";
import btnImage from "../assets/btn.png";

const Verify = () => {
  const [email, setEmail] = useState(() => localStorage.getItem("email"));
  const [timer, setTimer] = useState(219);
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const inputRefs: RefObject<HTMLInputElement>[] = Array(5)
    .fill(null)
    .map(() => useRef<HTMLInputElement>(null));

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const handleInput = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      if (value !== "" && index < 4) {
        inputRefs[index + 1]?.current?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: any) => {
    if (e.key === "Backspace" && index > 0 && verificationCode[index] === "") {
      inputRefs[index - 1]?.current?.focus();
    }
  };

  const handleVerify = async () => {
    setError("");
    const code = verificationCode.join("");

    if (code.length !== 5) {
      setError("Please enter the complete verification code.");
      return;
    }

    try {
      const response = await fetch("{{liveserver}}/users/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await response.json();

      if (response.ok) {
        navigate("/dashboard");
      } else {
        setError(data.message || "Verification failed. Try again.");
      }
    } catch {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="bg-[#D8D8D8] flex justify-center items-center h-screen transition-all">
      <div
        className="bg-[#00FF6633] flex justify-center flex-col
            items-center gap-7 p-14 w-[500px] rounded-[20px] transition-all
            border border-[#000]"
      >
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-[36px] font-bold">Verification!</h1>
        </div>
        <div className="flex justify-center items-center flex-col gap-1">
          <p className="text-[#000] text-center">We have sent you a 5-digit verification code on</p>
          <p className="text-[#000] text-center font-bold text-[17px]">{email}</p>
        </div>
        <div className="flex items-center justify-center gap-5 w-full">
          {verificationCode.map((digit, index) => (
            <div key={index} className="relative">
              <input
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInput(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="bg-[#F8F6F080] w-12 h-12 text-center text-xl font-medium 
                        rounded-lg border border-blue-300 focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
        </div>

        {error && <div className="text-red-500 text-sm text-center">{error}</div>}

        <div className="flex items-center justify-center flex-col">
          <p>{formatTime(timer)}</p>
          <p className="text-[20px]">
            Didn’t receive code? <span className="font-bold">Resend Again.</span>
          </p>
        </div>

        <button
          onClick={handleVerify}
          className="relative w-[180px] h-[55px] flex justify-center items-center"
        >
          <img src={btnImage} alt="" className="absolute inset-0 w-full" />
          <div className="text-white font-bold text-[18px] z-10">Verify</div>
        </button>
      </div>
    </div>
  );
};

export default Verify;
