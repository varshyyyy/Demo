import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

export default function Procurement() {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    itemName: "",
    vendor: "",
    quantity: "",
    priority: "Medium",
    reason: "",
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const purchaseData = [
    { month: "Jan", amount: 22 },
    { month: "Feb", amount: 18 },
    { month: "Mar", amount: 32 },
    { month: "Apr", amount: 25 },
    { month: "May", amount: 42 },
  ];

  const statusPie = [
    { name: "Completed", value: 120 },
    { name: "Pending", value: 40 },
    { name: "Rejected", value: 10 },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      
    
      <div className="bg-white p-5 shadow-lg rounded-xl flex justify-between items-center">
        <h1 className="text-2xl font-bold">Procurement Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + New Purchase Request
        </button>
      </div>

      
      <div className="grid grid-cols-4 gap-6 mt-6">
        {[
          { title: "Total Requests", value: 170 },
          { title: "Pending Approvals", value: 18 },
          { title: "Completed Orders", value: 120 },
          { title: "Vendors Available", value: 14 },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow text-center"
          >
            <h2 className="text-3xl font-bold text-blue-600">
              {card.value}
            </h2>
            <p className="text-gray-500 mt-1">{card.title}</p>
          </motion.div>
        ))}
      </div>

  
      <div className="grid grid-cols-3 gap-6 mt-8">
        
      
        <div className="col-span-2 bg-white shadow-xl rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Purchase Requests</h2>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">ID</th>
                <th className="p-2">Item</th>
                <th className="p-2">Vendor</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>

            <tbody>
              {[
                { id: 1, item: "Laptop", vendor: "Dell", status: "Pending", date: "2025-02-10" },
                { id: 2, item: "Projector", vendor: "Epson", status: "Approved", date: "2025-02-05" },
                { id: 3, item: "Furniture", vendor: "UrbanWood", status: "Completed", date: "2025-01-30" },
              ].map((row) => (
                <tr key={row.id} className="border-b hover:bg-gray-100">
                  <td className="p-2">{row.id}</td>
                  <td className="p-2">{row.item}</td>
                  <td className="p-2">{row.vendor}</td>
                  <td className="p-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        row.status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : row.status === "Approved"
                          ? "bg-blue-200 text-blue-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="p-2">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        <div className="bg-white shadow-xl rounded-xl p-6">
          <h2 className="text-lg font-bold mb-4">Order Status Distribution</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusPie}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                <Cell fill="#90CAF9" />
                <Cell fill="#FFF59D" />
                <Cell fill="#EF9A9A" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <h2 className="text-lg font-bold mt-10 mb-4">Monthly Procurement Spend</h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={purchaseData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#90CAF9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-xl p-6 mt-8">
        <h2 className="text-xl font-bold mb-4">Vendors</h2>

        <div className="grid grid-cols-4 gap-6">
          {[
            { name: "Dell Technologies", category: "Electronics" },
            { name: "UrbanWood", category: "Furniture" },
            { name: "Epson", category: "Electrical" },
            { name: "HP India", category: "Computers" },
          ].map((vendor, i) => (
            <div
              key={i}
              className="p-5 bg-gray-50 shadow rounded-xl border border-gray-200"
            >
              <h3 className="font-bold text-lg">{vendor.name}</h3>
              <p className="text-sm text-gray-500">{vendor.category}</p>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full"
          >
            <h2 className="text-xl font-bold mb-4">New Purchase Request</h2>

            <div className="space-y-4">
              <input
                name="itemName"
                placeholder="Item Name"
                className="w-full border p-2 rounded"
                onChange={handleInput}
              />
              <input
                name="vendor"
                placeholder="Vendor Name"
                className="w-full border p-2 rounded"
                onChange={handleInput}
              />
              <input
                name="quantity"
                placeholder="Quantity"
                type="number"
                className="w-full border p-2 rounded"
                onChange={handleInput}
              />
              <select
                name="priority"
                className="w-full border p-2 rounded"
                onChange={handleInput}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <textarea
                name="reason"
                placeholder="Reason for purchase"
                rows="3"
                className="w-full border p-2 rounded"
                onChange={handleInput}
              />

              <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
                onClick={() => setShowForm(false)}
              >
                Submit Request
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
