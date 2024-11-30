import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './styles.css';

const localserver = "http://localhost:5873";

const PhotoVideoManager = () => {
  const [createCategoryName, setCreateCategoryName] = useState("");
  const [createCategoryType, setCreateCategoryType] = useState("photo");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [fileUploads, setFileUploads] = useState([]);
  const [selectedFileUpload, setSelectedFileUpload] = useState(null);
  const [mediaCategories, setMediaCategories] = useState([]);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [fileIdToDelete, setFileIdToDelete] = useState<number | null>(null);

  interface MediaCategory {
    _id: number;
    mediaCategoryName: string;
    mediaCategoryType: string;
    isActive: boolean;
  }


  const handleToggle = async (id: number) => {
  try {
    const updatedCategory = mediaCategories.find((cat) => cat._id === id);
    if (updatedCategory) {
      const updatedCategoryData: MediaCategory = {
        ...updatedCategory,
        isActive: !updatedCategory.isActive, 
      };

      const response = await axios.put(`${localserver}/mediaCategory/updateMediaCategory`, updatedCategoryData);
      if (response.status === 200) {
        fetchCategories(); 
      } else {
        alert("Failed to update category status.");
      }
    }
  } catch (error) {
    console.error("Error updating category:", error);
    alert("An error occurred while updating the category.");
  }
};
  

  const handleDeleteCategory = async (id: number) => {
    await axios.delete(`${localserver}/mediaCategory/deleteMediaCategory/${id}`);
    fetchCategories();
  };

  const handleCreateCategory = async () => {
    if (!createCategoryName.trim()) {
      alert("Category name cannot be empty!");
      return;
    }
  
    try {
      const response = await axios.post(`${localserver}/mediaCategory/createMediaCategory`, {
        mediaCategoryName: createCategoryName.trim(),
        mediaCategoryType: createCategoryType,
        isActive: true,
      });
  
      if (response.status === 201 || response.status === 200) {
        alert("Category created successfully!");
        setCreateCategoryName("");
        fetchCategories(); 
      } else {
        alert("Failed to create category. Please try again.");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Error occurred while creating the category.");
    }
  };
  

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${localserver}/mediaCategory/getMediaCategorysList`);
      if (response.status === 200) {
        setMediaCategories(response.data);
      } else {
        alert("Failed to fetch categories.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("Error occurred while fetching categories.");
    }
  };
  
  

  const handleDeleteFileUpload = async (fileId: number | null) => {
    if (!fileId) {
      alert("Invalid file ID.");
      return;
    }
  
    try {
      const response = await axios.delete(`${localserver}/mediaCategory/deleteFileUpload/${fileId}`);
      if (response.status === 200 || response.status === 204) {
        alert("File deleted successfully!");
        setFileUploads((prev) => prev.filter((file) => file._id !== fileId));
        setDeleteModalOpen(false);
      } else {
        alert(`Failed to delete file. Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Error occurred while deleting the file");
    }
  };
  

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;
      const fileSize = file.size / 1024;
      const filePath = URL.createObjectURL(file);
      const newFile = {
        _id: fileUploads.length + 1,
        title: fileName,
        fileSize: fileSize.toFixed(2),
        filePath,
        mediaCategory: createCategoryType,
        uploadDate: new Date(),
      };
      setFileUploads((prev) => [...prev, newFile]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="photoVideo flex w-full h-screen">
      <div className="photoVideo-categories w-[350px] bg-gray h-full p-4 flex flex-col gap-6 shadow-lg rounded-md overflow-y-auto border border-gray-200">
        <div className="categories-create flex items-center gap-4 mb-4">
          <select
            className="w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={createCategoryType}
            onChange={(e) => setCreateCategoryType(e.target.value)}
          >
            <option value="photo">Photo</option>
            <option value="video">Video</option>
          </select>
          <div className="flex items-center w-1/4">
            <input
              type="text"
              placeholder="Category Name"
              className="w-40 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:outline-none px-3 py-2"
              value={createCategoryName}
              onChange={(e) => setCreateCategoryName(e.target.value)}
            />
            <button
              onClick={handleCreateCategory}
              className="bg-green-600 text-white px-5 py-2 rounded-r-md hover:bg-green-700 transition duration-200"
            >
              Add
            </button>
          </div>
        </div>
        <div className="categories-list flex flex-col gap-2">
          {mediaCategories.map((category) => (
            <div
              key={category._id}
              className="flex justify-between items-center px-2 py-1 rounded-lg cursor-pointer bg-[#A3B9B5] text-sm"
            >
              <span>{category.mediaCategoryName}</span>
              <div className="flex items-center gap-2">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={category.isActive}
                    onChange={() => handleToggle(category._id)}
                  />
                  <span className="slider round"></span>
                </label>
                <i
                  className="fa-solid fa-trash-can text-black cursor-pointer"
                  onClick={() => handleDeleteCategory(category._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="photoVideo-fileUploads flex-1 p-5 overflow-y-auto">
        <div className="flex flex-wrap gap-4 mb-5 items-center">
          <select
            className="px-2 py-1 border border-[#000] rounded-lg"
            value={createCategoryType}
            onChange={(e) => setCreateCategoryType(e.target.value)}
          >
            <option value="photo">Photo</option>
            <option value="video">Video</option>
          </select>
          <div className="flex gap-4 items-center">
            <div>
              <label className="block text-sm">Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                className="px-2 py-1 border border-[#000] rounded-lg"
                placeholderText="Select start date"
              />
            </div>
            <div>
              <label className="block text-sm">End Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                className="px-2 py-1 border border-[#000] rounded-lg"
                placeholderText="Select end date"
              />
            </div>
          </div>
          <button
            className="bg-gray-500 text-white font-bold px-4 py-2 rounded-lg ml-auto"
            onClick={() => document.getElementById("file-upload").click()}
          >
            Create
          </button>
          <input
            id="file-upload"
            type="file"
            accept="image/*, video/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {fileUploads.map((item) => (
            <div
              key={item._id}
              className="relative border border-gray-300 rounded-lg bg-gray-100 shadow-md overflow-hidden"
            >
              <div className="absolute top-2 left-2 text-white bg-black/60 px-2 py-1 rounded-md text-xs">
                {item.fileSize} KB
              </div>
              <div className="absolute top-2 right-2 flex gap-2 bg-gray rounded-lg px-2 py-1">
                <i
                  className="fa-solid fa-eye text-black cursor-pointer"
                  onClick={() => {
                    setSelectedFileUpload(item);
                    setViewModalOpen(true);
                  }}
                />
                <i
                  className="fa-solid fa-pencil text-black cursor-pointer"
                  onClick={() => {
                    setSelectedFileUpload(item);
                    setEditModalOpen(true);
                  }}
                />
                <i
                  className="fa-solid fa-trash-can text-black cursor-pointer"
                  onClick={() => {
                    setFileIdToDelete(item._id);
                    setDeleteModalOpen(true);
                  }}
                />
              </div>
              <img src={item.filePath} alt={item.title} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        {isViewModalOpen && selectedFileUpload && (
          <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg max-w-lg w-full">
              <h2 className="text-lg font-bold mb-4">{selectedFileUpload.title}</h2>
              <img
                src={selectedFileUpload.filePath}
                alt="Preview"
                className="w-full h-auto rounded-lg"
              />
              <button
                onClick={() => setViewModalOpen(false)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {isEditModalOpen && selectedFileUpload && (
          <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg max-w-lg w-full">
              <h2 className="text-lg font-bold mb-4">Edit Details</h2>
              <label className="block mb-2">Title</label>
              <input
                type="text"
                value={selectedFileUpload}
                onChange={(e) =>
                  setSelectedFileUpload({ ...selectedFileUpload, title: e.target.value })
                }
                className="border px-3 py-2 rounded-lg w-full"
              />
              <button
                onClick={() => setEditModalOpen(false)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        )}
        {isDeleteModalOpen && (
          <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg max-w-sm w-full">
              <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
              <p className="mb-4">Are you sure you want to delete this file?</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteFileUpload(fileIdToDelete)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoVideoManager;
