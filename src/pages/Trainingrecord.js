import React, { useState } from "react";
import { motion } from "framer-motion";

export default function TrainingRecord() {
  const [showForm, setShowForm] = useState(false);

  const [trainings, setTrainings] = useState([
    {
      id: 1,
      program: "AI & ML Basics",
      trainer: "Dr.VijayKumar",
      department: "CSE",
      date: "2025-01-14",
      status: "Completed",
    },
    {
      id: 2,
      program: "Cloud Computing Workshop",
      trainer: "Ms.surya",
      department: "IT",
      date: "2025-02-10",
      status: "Scheduled",
    },
  ]);

  const [formData, setFormData] = useState({
    program: "",
    trainer: "",
    department: "",
    date: "",
    status: "Scheduled",
  });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addTraining = () => {
    if (!formData.program || !formData.trainer || !formData.date) {
      alert("Please fill all required fields");
      return;
    }

    const newTraining = {
      id: trainings.length + 1,
      ...formData,
    };

    setTrainings([...trainings, newTraining]);
    setFormData({
      program: "",
      trainer: "",
      department: "",
      date: "",
      status: "Scheduled",
    });
    setShowForm(false);
  };

  return (
    <div className="p-6">
      
      <div className="bg-white shadow-lg p-4 rounded-xl flex justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Training Records</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          + Add Training
        </button>
      </div>

      
      <div className="grid grid-cols-4 gap-4 mt-6">
        {[
          { label: "Total Programs", value: trainings.length },
          {
            label: "Completed",
            value: trainings.filter((t) => t.status === "Completed").length,
          },
          {
            label: "Scheduled",
            value: trainings.filter((t) => t.status === "Scheduled").length,
          },
          { label: "Departments Covered", value: 6 },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white shadow-md rounded-xl p-5 text-center"
          >
            <h2 className="text-2xl font-bold text-blue-600">
              {stat.value}
            </h2>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

     
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 bg-white shadow-xl p-6 rounded-xl"
      >
        <h2 className="text-xl font-bold mb-4">Training Log</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm">
              <th className="p-3">Program</th>
              <th className="p-3">Trainer</th>
              <th className="p-3">Department</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {trainings.map((t) => (
              <tr
                key={t.id}
                className="border-b text-sm hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium">{t.program}</td>
                <td className="p-3">{t.trainer}</td>
                <td className="p-3">{t.department}</td>
                <td className="p-3">{t.date}</td>
                <td
                  className={`p-3 font-semibold ${
                    t.status === "Completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {t.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

     
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div
            className="bg-white p-6 rounded-xl shadow-2xl w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Add New Training</h2>

            <div className="space-y-3">
              <input
                type="text"
                name="program"
                value={formData.program}
                onChange={handleInput}
                placeholder="Training Program *"
                className="w-full p-2 border rounded-lg"
              />

              <input
                type="text"
                name="trainer"
                value={formData.trainer}
                onChange={handleInput}
                placeholder="Trainer Name *"
                className="w-full p-2 border rounded-lg"
              />

              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInput}
                placeholder="Department"
                className="w-full p-2 border rounded-lg"
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInput}
                className="w-full p-2 border rounded-lg"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleInput}
                className="w-full p-2 border rounded-lg"
              >
                <option>Scheduled</option>
                <option>Completed</option>
              </select>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={addTraining}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
