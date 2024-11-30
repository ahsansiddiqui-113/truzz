import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const apiBaseUrl = "http://localhost:5873/projectsUploads";

const FileManagementTable: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [projectName, setProjectName] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [dateRanges, setDateRanges] = useState(
        Array(2).fill({ startDate: null, endDate: null })
    );
    const [data, setData] = useState<any[]>([]);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [viewDetails, setViewDetails] = useState<any>(null);

    const handleDateChange = (
        idx: number,
        key: "startDate" | "endDate",
        date: Date | null
    ) => {
        const updatedRanges = [...dateRanges];
        updatedRanges[idx] = { ...updatedRanges[idx], [key]: date };
        setDateRanges(updatedRanges);
    };

    const fetchData = () => {
        axios
            .get(`${apiBaseUrl}/getProjectsUploadsWithFullDetails`)
            .then((response) => setData(response.data))
            .catch((error) => console.error("Error fetching data:", error));
    };

    const handleCreateProject = () => {
        if (!orderId || !projectName || !file) {
            alert("All fields are required.");
            return;
        }

        const formData = new FormData();
        formData.append("orderId", orderId);
        formData.append("projectName", projectName);
        formData.append("file", file);

        axios
            .post(`${apiBaseUrl}/createProjectUpload`, formData)
            .then((response) => {
                setData([...data, response.data]); 
                setOrderId("");
                setProjectName("");
                setFile(null);
                setIsModalOpen(false);
            })
            .catch((error) => console.error("Error creating project:", error));
    };

    const handleDeleteProject = () => {
        if (!deleteId) return;

        axios
            .delete(`${apiBaseUrl}/removeProjectsUpload/${deleteId}`)
            .then(() => {
                setData(data.filter((item) => item.id !== deleteId));
                setDeleteId(null);
                setDeleteModalOpen(false);
            })
            .catch((error) => console.error("Error deleting project:", error));
    };

    const handleViewProject = (id: number) => {
        axios
            .get(`${apiBaseUrl}/findProjectsUploadById/${id}`)
            .then((response) => {
                setViewDetails(response.data);
                setViewModalOpen(true);
            })
            .catch((error) => console.error("Error fetching project details:", error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Placeholder"
                        className="flex-1 p-2 border border-gray-300 rounded w-full sm:w-48"
                    />
                    <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
                        Search
                    </button>
                    {[...Array(2)].map((_, idx) => (
                        <div key={idx} className="flex items-center gap-2 w-full sm:w-auto">
                            <span className="text-xs font-semibold">Date Filter</span>
                            <div className="relative">
                                <DatePicker
                                    selected={dateRanges[idx].startDate}
                                    onChange={(date) => handleDateChange(idx, "startDate", date)}
                                    dateFormat="MM/dd/yyyy"
                                    placeholderText="MM / DD / YYYY"
                                    className="p-1 text-xs border border-gray-300 rounded w-28"
                                />
                            </div>
                            <span className="text-xs">To</span>
                            <div className="relative">
                                <DatePicker
                                    selected={dateRanges[idx].endDate}
                                    onChange={(date) => handleDateChange(idx, "endDate", date)}
                                    dateFormat="MM/dd/yyyy"
                                    placeholderText="MM / DD / YYYY"
                                    className="p-1 text-xs border border-gray-300 rounded w-28"
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Create
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full bg-white border border-gray-200 rounded-lg shadow">
                        <thead className="bg-green-200 text-left">
                            <tr>
                                <th className="p-3 text-sm font-semibold">No.</th>
                                <th className="p-3 text-sm font-semibold">Order ID</th>
                                <th className="p-3 text-sm font-semibold">Project Name</th>
                                <th className="p-3 text-sm font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr
                                    key={index}
                                    className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                                >
                                    <td className="p-3 text-sm">{index + 1}</td>
                                    <td className="p-3 text-sm">{row.orderId}</td>
                                    <td className="p-3 text-sm">{row.projectName}</td>
                                    <td className="p-3 flex items-center gap-2">
                                        <button
                                            className="text-green-600 hover:text-green-800 text-sm"
                                            onClick={() => handleViewProject(row.id)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-800 text-sm"
                                            onClick={() => {
                                                setDeleteId(row.id);
                                                setDeleteModalOpen(true);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow w-96">
                        <h2 className="text-xl font-semibold mb-4">Create Project</h2>
                        <input
                            type="text"
                            placeholder="Order ID"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            className="w-full mb-4 p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Project Name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            className="w-full mb-4 p-2 border rounded"
                        />
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                            className="w-full mb-4 p-2 border rounded"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateProject}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow w-96">
                        <h2 className="text-xl font-semibold mb-4">Delete Confirmation</h2>
                        <p>Are you sure you want to delete this project?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setDeleteModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                No
                            </button>
                            <button
                                onClick={handleDeleteProject}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isViewModalOpen && viewDetails && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow w-96">
                        <h2 className="text-xl font-semibold mb-4">Project Details</h2>
                        <p>
                            <strong>Order ID:</strong> {viewDetails.orderId}
                        </p>
                        <p>
                            <strong>Project Name:</strong> {viewDetails.projectName}
                        </p>
                        <button
                            onClick={() => setViewModalOpen(false)}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileManagementTable;
