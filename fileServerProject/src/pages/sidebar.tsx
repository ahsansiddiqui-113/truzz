import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    const storedPic = localStorage.getItem("profilePic");
    if (storedPic) {
      setProfilePic(storedPic);
    }
  }, []);

  const resizeImage = (file: File, maxWidth: number, maxHeight: number) =>
    new Promise<File | null>((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height *= maxWidth / width;
            width = maxWidth;
          } else {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(new File([blob], file.name, { type: file.type }));
          } else {
            resolve(null);
          }
        }, file.type);
      };

      reader.readAsDataURL(file);
    });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const resizedFile = await resizeImage(e.target.files[0], 150, 150);
      if (resizedFile) {
        uploadFile(resizedFile);
      } else {
        setUploadError("Failed to process the image.");
      }
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("profilePic", file);
  
    try {
      const response = await fetch(
        `https://mentorloungeuni-69fabc1001d8.herokuapp.com/users/updateprofilepic`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );
  
      const data = await response.json();
  
      if (response.ok) {
        setProfilePic(data.profilePic);
        localStorage.setItem("profilePic", data.profilePic);
        setUploadError("");
      } else {
        console.error("Upload failed:", data);
        setUploadError(data.message || "Upload failed. Please try again.");
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      setUploadError("Error uploading file. Please check your connection.");
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Photo/Video", link: "/dashboard/photo" },
    { label: "Filing", link: "/dashboard/filing" },
    { label: "Web Filing", link: "/dashboard/webfiling" },
    { label: "Documentation", link: "/dashboard/documentation" },
    { label: "Subadmin", link: "/dashboard/subadmin" },
    { label: "Change Password", link: "/dashboard/password" },
    { label: "Logout", link: "#", clickFunction: handleLogout },
  ];

  return (
    <div className="flex flex-col items-start w-64 border-r border-r-[#000] h-screen px-5 py-7">
      <div className="flex justify-center w-full mb-4">
        <label htmlFor="fileUpload" className="cursor-pointer">
          <img
            src={profilePic || "https://via.placeholder.com/150"}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
        </label>
        <input
          id="fileUpload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
      <div className="text-[#000] font-bold mt-2 text-[20px] text-center">Jake</div>
      <div className="flex flex-col gap-3 mt-5 w-full">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`px-5 py-3 hover:border hover:border-[#000] rounded-lg text-[15px] font-semibold ${activeItem === item.label ? "text-red-500" : ""
              }`}
          >
            <a
              href={item.link}
              onClick={(e) => {
                e.preventDefault();
                setActiveItem(item.label);
                item.clickFunction?.();
                if (item.link !== "#") navigate(item.link);
              }}
            >
              {item.label}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
