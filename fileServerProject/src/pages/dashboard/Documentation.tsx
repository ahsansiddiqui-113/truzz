import React, { useState } from 'react';

const Documentation: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCertificateGenerated, setIsCertificateGenerated] = useState(false);
    const [certificateData, setCertificateData] = useState({
        category: '',
        courseId: '',
        courseName: '',
        studentName: '',
        fatherName: '',
        motherName: '',
        rollNo: '',
        registrationNo: '',
        session: '',
        cgpa: ''
    });

    const toggleModal = () => setIsOpen(!isOpen);

    const generateCertificate = () => {
        setCertificateData({
            category: 'Sample Category',
            courseId: '1234',
            courseName: 'Sample Course',
            studentName: 'Ahsan Siddiqui',
            fatherName: 'Mr. Ahsan',
            motherName: 'Mrs. Ahsan',
            rollNo: '456',
            registrationNo: '789',
            session: '2024',
            cgpa: '3.5'
        });
        setIsCertificateGenerated(true);
    };

    const closeCertificatePopup = () => {
        setIsCertificateGenerated(false);
        setIsOpen(false);
    };

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [isViewOpen, setIsViewOpen] = useState(false);

    const openDeleteModal = (row: any) => {
        setSelectedRow(row);
        setIsDeleteOpen(true);
    };

    const closeModal = () => {
        setIsViewOpen(false);
        setIsDeleteOpen(false);
    };

    const openViewModal = (row: any) => {
        setSelectedRow(row);
        setIsViewOpen(true);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex items-center justify-between mb-4">
                <button className="bg-teal-500 text-white px-4 py-2 rounded" onClick={toggleModal}>Signature</button>
                {isOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg w-3/4 p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold">Institute Signature</h2>
                                <button
                                    onClick={toggleModal}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✖
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Teacher</label>
                                    <input
                                        type="file"
                                        className="border border-gray-300 p-2 rounded w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">CEO</label>
                                    <input
                                        type="file"
                                        className="border border-gray-300 p-2 rounded w-full"
                                    />
                                </div>
                            </div>

                            <h2 className="text-lg font-bold mb-4">Non-Institution Signature</h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Teacher</label>
                                    <input
                                        type="file"
                                        className="border border-gray-300 p-2 rounded w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">CEO</label>
                                    <input
                                        type="file"
                                        className="border border-gray-300 p-2 rounded w-full"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={toggleModal}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button className="bg-teal-500 text-white px-4 py-2 rounded">
                                    Upload
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex space-x-4">
                    <select className="border border-gray-300 p-2 rounded">
                        <option>Category</option>
                        <option>ins</option>
                        <option>non ins</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Placeholder text"
                        className="border border-gray-300 p-2 rounded w-64"
                    />
                    <button className="bg-green-500 text-white px-4 py-2 rounded">Search</button>
                </div>
                <div className="flex space-x-2">
                    <input
                        type="date"
                        className="border border-gray-300 p-2 rounded"
                        placeholder="MM/DD/YYYY"
                    />
                    <span className="text-gray-700">To</span>
                    <input
                        type="date"
                        className="border border-gray-300 p-2 rounded"
                        placeholder="MM/DD/YYYY"
                    />
                </div>
                <button onClick={toggleModal} className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
            </div>

            <table className="w-full bg-white border-collapse border border-gray-200">
                <thead className="bg-green-500 text-white">
                    <tr>
                        <th className="border border-gray-200 p-2">No.</th>
                        <th className="border border-gray-200 p-2">Category</th>
                        <th className="border border-gray-200 p-2">Course ID</th>
                        <th className="border border-gray-200 p-2">Course Name</th>
                        <th className="border border-gray-200 p-2">Session</th>
                        <th className="border border-gray-200 p-2">Roll No</th>
                        <th className="border border-gray-200 p-2">Registration No</th>
                        <th className="border border-gray-200 p-2">File Delete Date</th>
                        <th className="border border-gray-200 p-2">Storage</th>
                        <th className="border border-gray-200 p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {[1, 2, 3, 4].map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="border border-gray-200 p-2 text-center">{row}</td>
                            <td className="border border-gray-200 p-2">{row % 2 === 0 ? 'non ins' : 'ins'}</td>
                            <td className="border border-gray-200 p-2">46449</td>
                            <td className="border border-gray-200 p-2">{row === 1 ? 'App dev' : 'Web des'}</td>
                            <td className="border border-gray-200 p-2">{[2024, 2023, 1025, 2018][index]}</td>
                            <td className="border border-gray-200 p-2">{['45624222', '7272727', '10272727225', '27272720128'][index]}</td>
                            <td className="border border-gray-200 p-2">94949494</td>
                            <td className="border border-gray-200 p-2">
                                {index === 3 ? 'non' : '20-02-2025'}
                            </td>
                            <td className="border border-gray-200 p-2">
                                {['1 kb', '10 kb', '1 gb', '500 mb'][index]}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <button className="text-blue-500 mr-2" onClick={() => openViewModal(row)}>
                                    <i className="fas fa-eye"></i>
                                </button>
                                <button onClick={toggleModal} className="text-yellow-500 mr-2">
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
            {isDeleteOpen && selectedRow && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded w-1/3">
                        <h2 className="text-lg font-bold">Are you sure?</h2>
                        <p className="mt-4">Do you really want to delete this file?</p>
                        <div className="mt-4 flex justify-between">
                            <button className="bg-gray-200 px-4 py-2 rounded" onClick={closeModal}>No</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded">Yes</button>
                        </div>
                    </div>
                </div>
            )}
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
                            <button className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                        </div>
                    </div>
                </div>
            )}

            {isOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-3/4 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Create Certificate</h2>
                            <button
                                onClick={toggleModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✖
                            </button>
                        </div>

                        <form className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Category</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 p-2 rounded w-full"
                                    placeholder="Enter category"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Course ID</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 p-2 rounded w-full"
                                    placeholder="Enter course ID"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Course Name</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 p-2 rounded w-full"
                                    placeholder="Enter course name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Student Name</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 p-2 rounded w-full"
                                    placeholder="Enter student name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Father's Name</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 p-2 rounded w-full"
                                    placeholder="Enter father's name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Mother's Name</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 p-2 rounded w-full"
                                    placeholder="Enter mother's name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Roll No</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 p-2 rounded w-full"
                                    placeholder="Enter roll number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Registration No</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 p-2 rounded w-full"
                                    placeholder="Enter registration number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Session</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 p-2 rounded w-full"
                                    placeholder="Enter session"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">CGPA</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 p-2 rounded w-full"
                                    placeholder="Enter CGPA"
                                />
                            </div>
                        </form>

                        <div className="flex justify-center mt-6">
                            <button
                                onClick={generateCertificate}
                                className="bg-teal-500 text-white px-6 py-2 rounded"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isCertificateGenerated && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-2xl w-3/4 md:w-2/3 lg:w-1/2 p-10 border-4 border-solid border-gray-200">
                        <div className="flex flex-col items-center justify-center mb-8">
                            <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 mb-4"></div>
                            <h1 className="text-3xl font-extrabold text-blue-700">Certificate of Completion</h1>
                            <p className="mt-2 text-xl text-gray-600">This is to certify that</p>
                        </div>

                        <div className="text-center mb-6">
                            <h2 className="text-4xl font-semibold text-blue-800">{certificateData.studentName}</h2>
                            <p className="text-lg text-gray-700 mt-2">has successfully completed the course</p>
                        </div>

                        <div className="flex justify-between mb-8">
                            <div className="w-1/2 pr-4">
                                <p className="text-lg font-medium text-gray-700"><strong>Category:</strong> {certificateData.category}</p>
                                <p className="text-lg font-medium text-gray-700"><strong>Course Name:</strong> {certificateData.courseName}</p>
                                <p className="text-lg font-medium text-gray-700"><strong>Session:</strong> {certificateData.session}</p>
                                <p className="text-lg font-medium text-gray-700"><strong>Roll No:</strong> {certificateData.rollNo}</p>
                            </div>
                            <div className="w-1/2 pl-4 border-l-2 border-gray-300">
                                <p className="text-lg font-medium text-gray-700"><strong>Course ID:</strong> {certificateData.courseId}</p>
                                <p className="text-lg font-medium text-gray-700"><strong>Father's Name:</strong> {certificateData.fatherName}</p>
                                <p className="text-lg font-medium text-gray-700"><strong>Mother's Name:</strong> {certificateData.motherName}</p>
                                <p className="text-lg font-medium text-gray-700"><strong>Registration No:</strong> {certificateData.registrationNo}</p>
                                <p className="text-lg font-medium text-gray-700"><strong>CGPA:</strong> {certificateData.cgpa}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-8 border-t-2 pt-6">
                            <div className="text-lg font-medium text-gray-600">
                                <p>Issued on: {certificateData.session}</p>
                            </div>
                            <div className="text-lg font-medium text-gray-600">
                                <p>Authorized Signature</p>
                            </div>
                        </div>

                        <div className="flex justify-center mt-8">
                            <button
                                onClick={closeCertificatePopup}
                                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-10 py-3 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-blue-800 transition duration-300 shadow-lg">
                                Done
                            </button>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
};

export default Documentation;
