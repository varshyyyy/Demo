import React, { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import MinutesOfMeeting from "./pages/MinutesOfMeeting";
import StudentEngagements from "./pages/Studentengagement";
import Procurement from "./pages/procurement";
import BudgetEstimations from "./pages/budgetestimation";
import DivisionalRecord from "./pages/divisionalrecord";
import CustomerFeedback from "./pages/custpmerfeedbacks";
import TrainingRecord from "./pages/Trainingrecord";

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState("Dashboard Overview");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Airbus 320",
      description: "About the real time traffic management , project description here.",
      status: "In Progress",
      progress: 65,
      team: ["John", "Sarah", "Mike"],
      deadline: "2025-03-15",
    },
    {
      id: 2,
      name: "Bharat Wind",
      description: "About real time world coin , project description here.",
      status: "Active",
      progress: 45,
      team: ["Alice", "Bob", "Carol"],
      deadline: "2025-04-20",
    },
  ]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
    progress: 0,
    team: "",
    deadline: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProject = () => {
    if (formData.name && formData.description && formData.deadline) {
      const newProject = {
        id: projects.length + 1,
        name: formData.name,
        description: formData.description,
        status: formData.status,
        progress: parseInt(formData.progress),
        team: formData.team.split(",").map((t) => t.trim()),
        deadline: formData.deadline,
      };
      setProjects([...projects, newProject]);
      setFormData({
        name: "",
        description: "",
        status: "Active",
        progress: 0,
        team: "",
        deadline: "",
      });
      setShowNewProjectForm(false);
    } else {
      alert("Please fill in all required fields");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
     
      <aside className="w-64 bg-white shadow-xl p-5 space-y-4">
        <h2 className="text-xl font-bold">Data Visualisation</h2>
        <nav className="space-y-2">
          {[
            "Dashboard Overview",
            "Minutes of the Meeting",
            "Student Engagement",
            "Procurement Records",
            "Budget Estimation",
            "Divisional Records",
            "Customer Feedbacks",
            "Training Records",
            "Technical Reports",
            "Digital Library",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setCurrentPage(item)}
              className={`w-full text-left cursor-pointer p-2 rounded-lg transition ${
                currentPage === item
                  ? "bg-blue-600 text-white font-semibold"
                  : "hover:bg-blue-100"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

    
      <div className="flex-1 p-6 overflow-y-auto">
        {currentPage === "Dashboard Overview" && (
          <>
            
            <header className="bg-white shadow-lg p-4 rounded-xl flex justify-between items-center">
              <h1 className="text-2xl font-bold">Welcome!</h1>
              <div className="font-semibold">Mr.Peter Mark (Group Head)</div>
            </header>

            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-5 gap-4 mt-6"
            >
              {[
                { label: "Total", value: "93" },
                { label: "CFD", value: "143k" },
                { label: "Wind", value: "124k" },
                { label: "Flight", value: "240k" },
                { label: "Aero", value: "123k" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white shadow-lg p-4 rounded-xl text-center"
            >
              <h3 className="text-xl font-bold">{stat.value}</h3>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        
        <div className="grid grid-cols-2 gap-6 mt-6">
        
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-xl p-5 rounded-xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Projects</h2>
              <button 
                onClick={() => setShowNewProjectForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                + New Project
              </button>
            </div>

            <div className="space-y-4">
              {projects.map((project, i) => (
                <div key={i} className="p-4 border rounded-xl shadow">
                  <h3 className="font-bold text-lg">{project.name}</h3>
                  <p className="text-sm text-gray-600">
                    {project.description}
                  </p>
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="mt-2 bg-gray-800 text-white px-3 py-1 rounded-lg hover:bg-gray-900 transition"
                  >
                    View Project
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

        
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-xl p-5 rounded-xl flex flex-col items-center"
          >
            <h2 className="text-xl font-bold mb-4">Data Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "CFD", value: 143 },
                    { name: "Wind", value: 124 },
                    { name: "Flight", value: 240 },
                    { name: "Aero", value: 123 },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#B3E5FC" />
                  <Cell fill="#E1BEE7" />
                  <Cell fill="#C8E6C9" />
                  <Cell fill="#FFE0B2" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
          </>
        )}

        {currentPage === "Minutes of the Meeting" && (
          <MinutesOfMeeting />
        )}
        {currentPage === "Student Engagement" && (
          <StudentEngagements />
        )}
        {currentPage === "Procurement Records" && (
          <Procurement />
        )}
        {currentPage === "Budget Estimation" && (
          <BudgetEstimations />
        )}
        {currentPage === "Divisional Records" && (
          <DivisionalRecord />
        )}
        {currentPage === "Customer Feedbacks" && (
          <CustomerFeedback />
        )}
        {currentPage === "Training Records" && (
          <TrainingRecord />
        )}
      </div>

  
      {showNewProjectForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowNewProjectForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">New Project</h2>
              <button
                onClick={() => setShowNewProjectForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-gray-600 text-sm font-semibold">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter project name"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-gray-600 text-sm font-semibold">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter project description"
                  rows="3"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-gray-600 text-sm font-semibold">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                >
                  <option>Active</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>

              <div>
                <label className="text-gray-600 text-sm font-semibold">
                  Progress (%)
                </label>
                <input
                  type="number"
                  name="progress"
                  value={formData.progress}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  placeholder="0"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-gray-600 text-sm font-semibold">
                  Team Members (comma separated)
                </label>
                <input
                  type="text"
                  name="team"
                  value={formData.team}
                  onChange={handleInputChange}
                  placeholder="John, Sarah, Mike"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-gray-600 text-sm font-semibold">
                  Deadline *
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddProject}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-semibold"
                >
                  Add Project
                </button>
                <button
                  onClick={() => setShowNewProjectForm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

    
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedProject.name}
              </h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-gray-600 text-sm">Status</p>
                <p className="text-lg font-semibold text-blue-600">
                  {selectedProject.status}
                </p>
              </div>

              <div>
                <p className="text-gray-600 text-sm mb-2">Progress</p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all"
                    style={{ width: `${selectedProject.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedProject.progress}% Complete
                </p>
              </div>

              <div>
                <p className="text-gray-600 text-sm">Deadline</p>
                <p className="text-lg font-semibold">
                  {selectedProject.deadline}
                </p>
              </div>

              <div>
                <p className="text-gray-600 text-sm mb-2">Team Members</p>
                <div className="flex gap-2 flex-wrap">
                  {selectedProject.team.map((member, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-gray-600 text-sm">Description</p>
                <p className="text-gray-700 mt-1">
                  {selectedProject.description}
                </p>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition mt-6"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}