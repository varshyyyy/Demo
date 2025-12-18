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

export default function BudgetEstimations() {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    department: "",
    estimated: "",
    spent: "",
    remarks: "",
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Dummy Chart Data
  const budgetPie = [
    { name: "Allocated", value: 70 },
    { name: "Spent", value: 30 },
  ];

  const departmentBudget = [
    { dept: "IT", amount: 35 },
    { dept: "Library", amount: 22 },
    { dept: "Sports", amount: 18 },
    { dept: "Admin", amount: 28 },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      
      {/* Header */}
      <div className="bg-white p-5 shadow-lg rounded-xl flex justify-between items-center">
        <h1 className="text-2xl font-bold">Budget Estimation</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
        >
          + Add Budget Estimate
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6 mt-6">
        {[
          { title: "Total Budget", value: "₹ 8,50,000" },
          { title: "Amount Spent", value: "₹ 2,50,000" },
          { title: "Remaining Budget", value: "₹ 6,00,000" },
          { title: "Departments Covered", value: "12" },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow text-center"
          >
            <h2 className="text-2xl font-bold text-green-600">
              {card.value}
            </h2>
            <p className="text-gray-500 mt-1">{card.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-6 mt-8">

        {/* Budget Table */}
        <div className="col-span-2 bg-white shadow-xl rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Department-wise Budget</h2>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">Department</th>
                <th className="p-2">Estimated Budget</th>
                <th className="p-2">Spent</th>
                <th className="p-2">Remaining</th>
                <th className="p-2">Remarks</th>
              </tr>
            </thead>

            <tbody>
              {[
                { dept: "IT Department", est: 350000, spent: 160000, remark: "Hardware upgrade" },
                { dept: "Sports", est: 180000, spent: 40000, remark: "Equipment" },
                { dept: "Library", est: 200000, spent: 90000, remark: "New books" },
              ].map((row, i) => (
                <tr key={i} className="border-b hover:bg-gray-100">
                  <td className="p-2">{row.dept}</td>
                  <td className="p-2">₹ {row.est.toLocaleString()}</td>
                  <td className="p-2">₹ {row.spent.toLocaleString()}</td>
                  <td className="p-2 text-green-700 font-bold">
                    ₹ {(row.est - row.spent).toLocaleString()}
                  </td>
                  <td className="p-2">{row.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-xl rounded-xl p-6">
          <h2 className="text-lg font-bold mb-4">Budget Usage</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={budgetPie}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                <Cell fill="#66BB6A" />
                <Cell fill="#EF5350" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <h2 className="text-lg font-bold mt-10 mb-4">Dept. Budget Allocation</h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={departmentBudget}>
              <XAxis dataKey="dept" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#81C784" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Modal Form */}
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
            <h2 className="text-xl font-bold mb-4">Add Budget Estimate</h2>

            <div className="space-y-4">
              <input
                name="department"
                placeholder="Department Name"
                className="w-full border p-2 rounded"
                onChange={handleInput}
              />

              <input
                name="estimated"
                placeholder="Estimated Budget"
                type="number"
                className="w-full border p-2 rounded"
                onChange={handleInput}
              />

              <input
                name="spent"
                placeholder="Amount Spent"
                type="number"
                className="w-full border p-2 rounded"
                onChange={handleInput}
              />

              <textarea
                name="remarks"
                placeholder="Remarks"
                rows="3"
                className="w-full border p-2 rounded"
                onChange={handleInput}
              />

              <button
                className="w-full bg-green-600 text-white py-2 rounded-lg mt-4"
                onClick={() => setShowForm(false)}
              >
                Save Budget Estimate
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

    </div>
  );
}
