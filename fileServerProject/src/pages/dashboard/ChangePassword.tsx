import { useState } from "react";
import Button from "../../Components/Button";
import Input from "../../Components/Input";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = formData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    try {
      const response = await fetch(`https://mentorloungeuni-69fabc1001d8.herokuapp.com/users/changePassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccess("Password changed successfully!");
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen transition-all">
      <div className="bg-green2 flex flex-col items-center p-14 w-[500px] rounded-[20px] transition-all border border-black">
        <div>
          <h1 className="text-[36px] font-semibold pb-[50px]">Password Change</h1>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="pb-[26px]">
            <Input
              type="password"
              id="oldPassword"
              placeholder="Old Password"
              value={formData.oldPassword}
              onChange={handleChange}
            />
          </div>
          <div className="pb-[40px]">
            <Input
              type="password"
              id="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
          <div className="pb-[40px]">
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {error && <div className="text-red-500 text-sm pb-2 text-center">{error}</div>}
          {success && <div className="text-green-500 text-sm pb-2 text-center">{success}</div>}

          <div className="flex justify-center">
            <Button text="Continue" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
