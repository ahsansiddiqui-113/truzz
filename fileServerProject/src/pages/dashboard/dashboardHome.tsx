import React, { useEffect, useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import io from 'socket.io-client';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const socket = io('http://localhost:4000');

const DashboardHome: React.FC = () => {
  const [cpuUsage, setCpuUsage] = useState(6.7);
  const [memoryUsage, setMemoryUsage] = useState(69.2);
  const [storageUsage, setStorageUsage] = useState(41.1);

  useEffect(() => {
    socket.on('updateData', (data: { cpu: number; memory: number; storage: number }) => {
      setCpuUsage(data.cpu);
      setMemoryUsage(data.memory);
      setStorageUsage(data.storage);
    });
  }, []);

  const cpuData = {
    labels: ['CPU Usage', 'Free'],
    datasets: [
      {
        data: [cpuUsage, 100 - cpuUsage],
        backgroundColor: ['#0A8ED4', '#e0e0e0'],
      },
    ],
  };

  const memoryData = {
    labels: ['Memory Usage', 'Free'],
    datasets: [
      {
        data: [memoryUsage, 100 - memoryUsage],
        backgroundColor: ['#FFCC00', '#e0e0e0'],
      },
    ],
  };

  const storageData = {
    labels: ['Used', 'Available'],
    datasets: [
      {
        data: [storageUsage, 100 - storageUsage],
        backgroundColor: ['#4CAF50', '#e0e0e0'],
      },
    ],
  };

  const dataTransferData = {
    labels: ['30 Days', '24 Hours'],
    datasets: [
      {
        label: 'Data Transfer (GB)',
        data: [8.9, 7.9],
        borderColor: '#0A8ED4',
        backgroundColor: 'rgba(10, 142, 212, 0.2)',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Servers', count: 3, critical: 1, border: 'red-500', status: 'Critical' },
            { title: 'Drives', count: 9, border: 'green-500', status: 'All drives healthy' },
            { title: 'Virtual Machines', count: 2, border: 'blue-500', status: 'Running' },
            { title: 'Volumes', count: 2, border: 'green-500', status: 'All volumes healthy' },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-xl flex flex-col justify-between items-start"
            >
              <h3 className="text-sm font-bold text-gray-600">{item.title}</h3>
              <div className={`border-l-4 pl-4 border-${item.border}`}>
                <p className="text-gray-600">{item.status}</p>
                {item.critical !== undefined && (
                  <p className="text-2xl font-bold text-gray-800">{item.critical}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { title: 'CPU Usage', data: cpuData },
            { title: 'Memory Usage', data: memoryData },
            { title: 'Storage Usage', data: storageData },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-xl flex flex-col items-center"
            >
              <h3 className="text-sm font-bold text-gray-600 mb-4">{item.title}</h3>
              <Doughnut data={item.data} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-white shadow-lg rounded-xl">
            <h3 className="text-sm font-bold text-gray-600 mb-4">Data Transfer</h3>
            <Line data={dataTransferData} />
          </div>
          <div className="p-6 bg-white shadow-lg rounded-xl">
            <h3 className="text-sm font-bold text-gray-600 mb-4">Top Shares</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>Videos: 852.3 GB</li>
              <li>Design: 13.6 GB</li>
              <li>Images: 15.6 GB</li>
              <li>Shared: 9.4 GB</li>
              <li>Others: 12.0 GB</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="p-6 bg-white shadow-lg rounded-xl flex flex-col items-center">
            <h3 className="text-sm font-bold text-gray-600 mb-4">Data Stored</h3>
            <div className="text-center">
              <p className="text-gray-700">Your Data: <strong>1 TB</strong></p>
              <p className="text-gray-700">You pay for: <strong>950.7 GB</strong> (7% reduced)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
