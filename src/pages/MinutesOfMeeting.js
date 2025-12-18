import React, { useState } from "react";
import { motion } from "framer-motion";

export default function MinutesOfMeeting() {
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      date: "2024-12-01",
      topic: "Project Planning",
      attendees: 15,
      duration: "2 hours",
      notes: "Discussed project timeline and deliverables.",
    },
    {
      id: 2,
      date: "2024-11-28",
      topic: "Budget Review",
      attendees: 12,
      duration: "1.5 hours",
      notes: "Reviewed Q4 budget allocation and expenses.",
    },
    {
      id: 3,
      date: "2024-11-25",
      topic: "Resource Allocation",
      attendees: 18,
      duration: "2.5 hours",
      notes: "Assigned team members to new projects.",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    topic: "",
    attendees: "",
    duration: "",
    notes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddMeeting = () => {
    if (formData.date && formData.topic && formData.attendees) {
      const newMeeting = {
        id: meetings.length + 1,
        date: formData.date,
        topic: formData.topic,
        attendees: parseInt(formData.attendees),
        duration: formData.duration,
        notes: formData.notes,
      };
      setMeetings([...meetings, newMeeting]);
      setFormData({
        date: "",
        topic: "",
        attendees: "",
        duration: "",
        notes: "",
      });
      setShowForm(false);
    } else {
      alert("Please fill in all required fields");
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-lg p-6 rounded-xl flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Minutes of the Meeting</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          + Add Meeting
        </button>
      </header>

      {/* Meetings List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        {meetings.map((meeting) => (
          <motion.div
            key={meeting.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedMeeting(meeting)}
            className="bg-white shadow-lg p-6 rounded-xl cursor-pointer hover:shadow-xl transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {meeting.topic}
                </h3>
                <p className="text-gray-600">Date: {meeting.date}</p>
                <p className="text-gray-600">Duration: {meeting.duration}</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
                {meeting.attendees} Attendees
              </span>
            </div>
            <p className="text-gray-700 mt-3">{meeting.notes}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Add Meeting Form Modal */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add Meeting</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-gray-600 text-sm font-semibold">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-gray-600 text-sm font-semibold">
                  Topic *
                </label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  placeholder="Enter meeting topic"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-gray-600 text-sm font-semibold">
                  Attendees *
                </label>
                <input
                  type="number"
                  name="attendees"
                  value={formData.attendees}
                  onChange={handleInputChange}
                  placeholder="Number of attendees"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-gray-600 text-sm font-semibold">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 2 hours"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-gray-600 text-sm font-semibold">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Meeting notes"
                  rows="3"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddMeeting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-semibold"
                >
                  Add Meeting
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Meeting Details Modal */}
      {selectedMeeting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedMeeting(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedMeeting.topic}
              </h2>
              <button
                onClick={() => setSelectedMeeting(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-gray-600 text-sm">Date</p>
                <p className="text-lg font-semibold">{selectedMeeting.date}</p>
              </div>

              <div>
                <p className="text-gray-600 text-sm">Attendees</p>
                <p className="text-lg font-semibold">{selectedMeeting.attendees} People</p>
              </div>

              <div>
                <p className="text-gray-600 text-sm">Duration</p>
                <p className="text-lg font-semibold">{selectedMeeting.duration}</p>
              </div>

              <div>
                <p className="text-gray-600 text-sm">Notes</p>
                <p className="text-gray-700 mt-1">{selectedMeeting.notes}</p>
              </div>

              <button
                onClick={() => setSelectedMeeting(null)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition mt-6"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
