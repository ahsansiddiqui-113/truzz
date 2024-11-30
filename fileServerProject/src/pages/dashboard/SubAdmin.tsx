import React, { useState } from "react";

const SubAdminPage = () => {
    const [isCreateAdminModalOpen, setCreateAdminModalOpen] = useState(false);
    const [isAccessModalOpen, setAccessModalOpen] = useState(false);
    const [access, setAccess] = useState<string[]>([]);

    const toggleAccess = (item: string) => {
        setAccess((prev) =>
            prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
    };

    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    return (
        <div className="subadmin p-5">
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-md">
                        Web Filling API
                    </button>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-md">
                        Documentation API
                    </button>
                </div>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => setCreateAdminModalOpen(true)}
                >
                    Create Admin
                </button>
            </div>


            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-green-500 text-white">
                    <tr>
                        <th className="border border-gray-300 p-2">No.</th>
                        <th className="border border-gray-300 p-2">Photo</th>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Username</th>
                        <th className="border border-gray-300 p-2">Gmail</th>
                        <th className="border border-gray-300 p-2">Login Url</th>
                        <th className="border border-gray-300 p-2">Password</th>
                        <th className="border border-gray-300 p-2">Access</th>
                        <th className="border border-gray-300 p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-green-100">
                        <td className="border border-gray-300 p-2 text-center">4</td>
                        <td className="border border-gray-300 p-2 text-center">
                            <img src="/path/to/photo1.jpg" alt="Photo" className="w-8 h-8 rounded-full mx-auto" />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">Mr. Jack</td>
                        <td className="border border-gray-300 p-2 text-center">mrjack</td>
                        <td className="border border-gray-300 p-2 text-center">jack4515@gmail.com</td>
                        <td className="border border-gray-300 p-2 text-center">
                            <span className="truncate block w-48 mx-auto">/login/random-url1</span>
                        </td>
                        <td className="border border-gray-300 p-2 text-center">45********d4</td>
                        <td className="border border-gray-300 p-2 text-center">5</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                            <button
                                className="text-blue-500 mr-2"
                                onClick={() => setViewModalOpen(true)}
                            >
                                <i className="fas fa-eye"></i>
                            </button>
                            <button
                                className="text-yellow-500 mr-2"
                                onClick={() => setEditModalOpen(true)}
                            >
                                <i className="fas fa-edit"></i>
                            </button>
                            <button
                                className="text-red-500"
                                onClick={() => setDeleteModalOpen(true)}
                            >
                                <i className="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                    <tr className="bg-yellow-100">
                        <td className="border border-gray-300 p-2 text-center">3</td>
                        <td className="border border-gray-300 p-2 text-center">
                            <img src="/path/to/photo2.jpg" alt="Photo" className="w-8 h-8 rounded-full mx-auto" />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">Mr. Jack</td>
                        <td className="border border-gray-300 p-2 text-center">mrjack</td>
                        <td className="border border-gray-300 p-2 text-center">maadmin@gmail.com</td>
                        <td className="border border-gray-300 p-2 text-center">
                            <span className="truncate block w-48 mx-auto">/login/random-url2</span>
                        </td>
                        <td className="border border-gray-300 p-2 text-center">45********d4</td>
                        <td className="border border-gray-300 p-2 text-center">5</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                            <button className="text-blue-500 mr-2">
                                <i className="fas fa-eye"></i>
                            </button>
                            <button className="text-yellow-500 mr-2">
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className="text-red-500">
                                <i className="fas fa-trash"></i>
                            </button>
                        </td>

                    </tr>
                </tbody>
            </table>
            {viewModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-lg font-bold mb-4">View Details</h2>
                        <p>ID:</p>
                        <p>Name:</p>
                        <p>Gmail:</p>
                        <p>Password:</p>
                        <button
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={() => setViewModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {editModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-lg font-bold mb-4">Edit User</h2>
                        <form>
                            <input
                                type="text"
                                placeholder="Edit Name"
                                className="w-full border p-2 rounded-md mb-4"
                            />
                            <button
                                type="button"
                                className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                                onClick={() => setEditModalOpen(false)}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md"
                                onClick={() => setEditModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {deleteModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-lg font-bold mb-4 text-red-500">Delete User</h2>
                        <p>Are you sure you want to delete this user?</p>
                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
                            onClick={() => {
                                setDeleteModalOpen(false);
                            }}
                        >
                            Yes, Delete
                        </button>
                        <button
                            className="mt-4 ml-4 bg-gray-500 text-white px-4 py-2 rounded-md"
                            onClick={() => setDeleteModalOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {isCreateAdminModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md w-[400px]">
                        <h2 className="text-lg font-semibold mb-4">Create Admin</h2>
                        <div className="space-y-3">
                            <div>
                                <label className="block mb-1">Photo</label>
                                <input type="file" className="border w-full px-2 py-1" />
                            </div>
                            <div>
                                <label className="block mb-1">Name</label>
                                <input type="text" className="border w-full px-2 py-1" />
                            </div>
                            <div>
                                <label className="block mb-1">Username</label>
                                <input type="text" className="border w-full px-2 py-1" />
                            </div>
                            <div>
                                <label className="block mb-1">Gmail</label>
                                <input type="email" className="border w-full px-2 py-1" />
                            </div>
                            <div>
                                <label className="block mb-1">Password</label>
                                <input type="password" className="border w-full px-2 py-1" />
                            </div>
                            <div>
                                <label className="block mb-1">Re-Password</label>
                                <input type="password" className="border w-full px-2 py-1" />
                            </div>
                            <div>
                                <label className="block mb-1">Access</label>
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                    onClick={() => setAccessModalOpen(true)}
                                >
                                    Select Access
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                className="bg-gray-300 px-3 py-1 rounded"
                                onClick={() => setCreateAdminModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button className="bg-green-500 text-white px-3 py-1 rounded">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Access Modal */}
            {isAccessModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md w-[300px]">
                        <h2 className="text-lg font-semibold mb-4">Access Permissions</h2>
                        <div className="space-y-2">
                            {["Main Admin", "Dashboard", "Filing", "Photo/Video", "Documentation"].map(
                                (item) => (
                                    <div key={item}>
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={access.includes(item)}
                                                onChange={() => toggleAccess(item)}
                                            />
                                            <span>{item}</span>
                                        </label>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                className="bg-gray-300 px-3 py-1 rounded"
                                onClick={() => setAccessModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-500 text-white px-3 py-1 rounded"
                                onClick={() => setAccessModalOpen(false)}
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubAdminPage;
