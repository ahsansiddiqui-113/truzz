import React, { useState, useEffect } from "react";

const TablePage: React.FC = () => {
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [data, setData] = useState<any[]>([]);

    const API_BASE_URL = "http://localhost:5873/webFiling";

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/getWebFilingsList`);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openViewModal = (row: any) => {
        setSelectedRow(row);
        setIsViewOpen(true);
    };

    const openEditModal = (row: any) => {
        setSelectedRow(row);
        setIsEditOpen(true);
    };

    const openDeleteModal = (row: any) => {
        setSelectedRow(row);
        setIsDeleteOpen(true);
    };

    const closeModal = () => {
        setIsViewOpen(false);
        setIsEditOpen(false);
        setIsDeleteOpen(false);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/removeWebFiling`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: selectedRow.no }),
            });

            if (response.ok) {
                alert("File deleted successfully");
                fetchData(); 
                closeModal();
            } else {
                alert("Failed to delete file");
            }
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            const updatedData = {
                id: selectedRow.no,
                updatedDate: selectedRow.updatedDate, 
            };

            const response = await fetch(`${API_BASE_URL}/updateWebFiling`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                alert("File updated successfully");
                fetchData(); 
                closeModal();
            } else {
                alert("Failed to update file");
            }
        } catch (error) {
            console.error("Error updating file:", error);
        }
    };

    return (
        <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
                <select className="border border-gray-300 px-4 py-2 rounded">
                    <option>Type</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                    <option>E</option>
                    <option>F</option>
                </select>
                <select className="border border-gray-300 px-4 py-2 rounded">
                    <option>Select</option>
                    <option>Active</option>
                    <option>Delete</option>
                    <option>Deactivate</option>
                </select>
                <input
                    type="text"
                    placeholder="search"
                    className="border border-gray-300 px-4 py-2 rounded flex-grow"
                />
                <button className="bg-green-500 text-white px-4 py-2 rounded">Search</button>
                <div className="flex gap-4">
                    <input
                        type="date"
                        className="border border-gray-300 px-4 py-2 rounded"
                    />
                    <input
                        type="date"
                        className="border border-gray-300 px-4 py-2 rounded"
                    />
                </div>
            </div>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-green-500 text-white">
                        {["NO", "User ID", "Project Name", "Upload Date", "Updated Date", "Type", "URL", "Storage", "Status", "Action"].map((header) => (
                            <th key={header} className="border border-gray-300 px-4 py-2">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className="bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{row.no}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.userId}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.projectName}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.uploadDate}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.updatedDate}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.type}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <a href={row.url} download className="text-blue-500">
                                    <i className="fas fa-download"></i>
                                </a>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{row.storage}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.status}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <button className="text-blue-500 mr-2" onClick={() => openViewModal(row)}>
                                    <i className="fas fa-eye"></i>
                                </button>
                                <button className="text-yellow-500 mr-2" onClick={() => openEditModal(row)}>
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button className="text-red-500" onClick={() => openDeleteModal(row)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isViewOpen && selectedRow && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded w-1/3">
                        <div className="flex justify-between">
                            <h2 className="text-lg font-bold">View Details</h2>
                            <button onClick={closeModal}>✖</button>
                        </div>
                        <div className="mt-4">
                            <p><strong>ID:</strong> {selectedRow.userId}</p>
                            <p><strong>Project Name:</strong> {selectedRow.projectName}</p>
                            <p><strong>Upload Date:</strong> {selectedRow.uploadDate}</p>
                            <p><strong>Updated Date:</strong> {selectedRow.updatedDate}</p>
                            <p><strong>Deleted Date:</strong> {selectedRow.deleteDate}</p>
                        </div>
                        <div className="mt-4 flex justify-between">
                            <select className="border border-gray-300 px-4 py-2 rounded">
                                <option>Select</option>
                                <option>Active</option>
                                <option>Delete</option>
                                <option>Deactivate</option>
                            </select>
                            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleUpdate}>Save</button>
                        </div>
                    </div>
                </div>
            )}

            {isEditOpen && selectedRow && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded w-1/3">
                        <div className="flex justify-between">
                            <h2 className="text-lg font-bold">Edit Details</h2>
                            <button onClick={closeModal}>✖</button>
                        </div>
                        <div className="mt-4">
                            <p><strong>ID:</strong> {selectedRow.userId}</p>
                            <p><strong>Project Name:</strong> {selectedRow.projectName}</p>
                            <p><strong>Updated Date:</strong> <input type="date" className="border px-2 py-1 rounded" value={selectedRow.updatedDate} onChange={(e) => setSelectedRow({ ...selectedRow, updatedDate: e.target.value })} /></p>
                            <p><strong>Deleted Date:</strong> <input type="date" className="border px-2 py-1 rounded" /></p>
                        </div>
                        <button className="bg-yellow-500 text-white px-4 py-2 rounded mt-4" onClick={handleUpdate}>Save</button>
                    </div>
                </div>
            )}

            {isDeleteOpen && selectedRow && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded w-1/3">
                        <h2 className="text-lg font-bold">Are you sure?</h2>
                        <p className="mt-4">Do you really want to delete this file?</p>
                        <div className="mt-4 flex justify-between">
                            <button className="bg-gray-200 px-4 py-2 rounded" onClick={closeModal}>No</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>Yes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TablePage;
