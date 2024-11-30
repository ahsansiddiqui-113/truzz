import React, { useEffect, useState } from "react";

export const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <p>You are going to delete this item!</p>
        <button onClick={onClose} className=" bg-gray-300 px-4 py-2 rounded">
          No
        </button>
        <button onClick={onConfirm} className="ml-2 bg-[#236BFE] text-white px-4 py-2 mt-4 rounded">
          Yes, Delete
        </button>
      </div>
    </div>
  );
};

export const CreateEditModal = ({ isOpen, onClose, data, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [date, setDate] = useState("");

  useEffect(() => {
    if (data) {
      setTitle(data.title || "");
      setDate(data.deleteDate ? new Date(data.deleteDate).toISOString().split("T")[0] : ""); // Format to YYYY-MM-DD for date input
    }
  }, [data]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || (!file && !data.file) || !date) {
      // Allow missing file if data has existing file
      alert("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    if (file) formData.append("file", file); // Only append file if there's a new file
    formData.append("date", date);

    onSubmit(formData); // Call the provided onSubmit function
    onClose(); // Close modal after submitting
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
      <div className="bg-white p-6 rounded-lg w-96">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Text Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border rounded px-3 py-2"
            required
          />

          {/* File Upload Input */}
          <input
            type="file"
            onChange={handleFileChange}
            className="border rounded px-3 py-2"
            required={!data} // Only required if there is no existing data
          />

          {/* Date Input */}
          <label htmlFor="deleteDate">Delete Date</label>
          <input
            id="deleteDate"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />

          {/* Upload Button */}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {data ? "Update" : "Upload"}
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-gray-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export const ViewModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const formatDate = (timestamp) => (timestamp ? new Date(timestamp).toLocaleDateString() : "N/A");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="text-gray-700 space-y-2">
          <p>
            <strong>ID:</strong> {data._id || "N/A"}
          </p>
          <p>
            <strong>Title:</strong> {data.title || "N/A"}
          </p>
          <p>
            <strong>Upload Date:</strong> {formatDate(data.uploadDate) || "N/A"}
          </p>
          <p>
            <strong>Updated Date:</strong> {formatDate(data.updateDate) || "N/A"}
          </p>
          <p>
            <strong>Delete Date:</strong> {formatDate(data.deleteDate) || "N/A"}
          </p>
        </div>
        <button onClick={onClose} className="mt-4 text-gray-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};
