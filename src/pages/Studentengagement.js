import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const StudentEngagements = () => {
  
  const attendanceData = [
    { day: "Mon", value: 80 },
    { day: "Tue", value: 72 },
    { day: "Wed", value: 90 },
    { day: "Thu", value: 85 },
    { day: "Fri", value: 95 },
  ];

  const participationData = [
    { name: "Week 1", score: 60 },
    { name: "Week 2", score: 75 },
    { name: "Week 3", score: 85 },
    { name: "Week 4", score: 70 },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* PageHeader */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Student Engagement Dashboard
      </h1>

      {/* CardsSection */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { title: "Attendance", value: "89%" },
          { title: "Participation", value: "76%" },
          { title: "Assignments Done", value: "24" },
          { title: "Projects Submitted", value: "5" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 text-center"
          >
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-3xl font-bold text-blue-600">{item.value}</p>
          </div>
        ))}
      </div>

      {/* ChartsSection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        {/* AttendanceChart */}
        <div className="bg-white p-6 shadow-lg rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Participation */}
        <div className="bg-white p-6 shadow-lg rounded-xl">
          <h3 className="text-lg font-semibold mb-4">
            Weekly Participation Score
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={participationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Leaderboard & Recent Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Leader */}
        <div className="bg-white p-6 shadow-lg rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Top Active Students</h3>
          <ul>
            {["Harini", "David", "Aishwarya", "Manoj", "Riya"].map(
              (student, index) => (
                <li
                  key={index}
                  className="flex justify-between py-3 border-b last:border-none"
                >
                  <span className="font-medium">{student}</span>
                  <span className="font-bold text-blue-600">
                    {90 - index * 5}%
                  </span>
                </li>
              )
            )}
          </ul>
        </div>

        {/* RecentActivity */}
        <div className="bg-white p-6 shadow-lg rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              "Assignment 3 Submitted",
              "Attended Machine Learning Workshop",
              "Completed Project Review",
              "Scored 85% in Quiz",
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-gray-700">{activity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* UpcomingEvents */}
      <div className="bg-white p-6 shadow-lg rounded-xl mt-10">
        <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
        <ul className="space-y-4">
          {[
            "Hackathon - Jan 25",
            "AI Workshop - Feb 3",
            "Internal Project Review - Feb 10",
          ].map((event, index) => (
            <li key={index} className="flex justify-between border-b pb-2">
              <span className="font-medium">{event}</span>
              <span className="text-gray-500">Register Now</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentEngagements;
