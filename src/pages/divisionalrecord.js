import React, { useState } from "react";

const DivisionalRecord = () => {
  const [divisions, setDivisions] = useState([
    { id: "DIV001", name: "Computer Science", head: "Dr.VenuVardhan", staff: 22, status: "Active", lastUpdated: "02-Nov-2025" },
    { id: "DIV002", name: "Electronics", head: "Prof.Joshua", staff: 18, status: "Under Review", lastUpdated: "10-Oct-2025" },
    { id: "DIV003", name: "Mechanical", head: "Dr.Sanjay", staff: 30, status: "Inactive", lastUpdated: "18-Sep-2025" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState(null);

  const [form, setForm] = useState({ name: "", head: "", staff: "", status: "Active" });

  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openAdd = () => {
    setForm({ name: "", head: "", staff: "", status: "Active" });
    setShowAddModal(true);
  };

  const handleAdd = () => {
    if (!form.name || !form.head) {
      alert("Please provide division name and head");
      return;
    }
    const nextId = `DIV${String(divisions.length + 1).padStart(3, "0")}`;
    const today = new Date().toLocaleDateString();
    setDivisions([...divisions, { id: nextId, name: form.name, head: form.head, staff: Number(form.staff) || 0, status: form.status, lastUpdated: today }]);
    setShowAddModal(false);
  };

  const handleView = (div) => {
    setSelectedDivision(div);
    setShowViewModal(true);
  };

  const handleEdit = (div) => {
    setSelectedDivision(div);
    setForm({ name: div.name, head: div.head, staff: String(div.staff), status: div.status });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!selectedDivision) return;
    setDivisions(divisions.map((d) => (d.id === selectedDivision.id ? { ...d, name: form.name, head: form.head, staff: Number(form.staff) || 0, status: form.status, lastUpdated: new Date().toLocaleDateString() } : d)));
    setShowEditModal(false);
    setSelectedDivision(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this division?")) {
      setDivisions(divisions.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Divisional Records</h1>
        <p className="text-gray-600 mt-1">
          Manage and track academic, administrative, and departmental division records.
        </p>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">Add New Division</h3>
            <div className="space-y-3">
              <input name="name" value={form.name} onChange={handleInput} placeholder="Division Name" className="w-full border p-2 rounded" />
              <input name="head" value={form.head} onChange={handleInput} placeholder="Head of Division" className="w-full border p-2 rounded" />
              <input name="staff" value={form.staff} onChange={handleInput} placeholder="Total Staff" type="number" className="w-full border p-2 rounded" />
              <select name="status" value={form.status} onChange={handleInput} className="w-full border p-2 rounded">
                <option>Active</option>
                <option>Under Review</option>
                <option>Inactive</option>
              </select>
              <div className="flex gap-2 mt-4">
                <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                <button onClick={() => setShowAddModal(false)} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedDivision && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowViewModal(false)}>
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-2">{selectedDivision.name}</h3>
            <p className="text-sm text-gray-600">Head: {selectedDivision.head}</p>
            <p className="text-sm text-gray-600">Staff: {selectedDivision.staff}</p>
            <p className="text-sm text-gray-600">Status: {selectedDivision.status}</p>
            <p className="text-sm text-gray-600">Last Updated: {selectedDivision.lastUpdated}</p>
            <div className="mt-4">
              <button onClick={() => setShowViewModal(false)} className="bg-blue-600 text-white px-4 py-2 rounded">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowEditModal(false)}>
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">Edit Division</h3>
            <div className="space-y-3">
              <input name="name" value={form.name} onChange={handleInput} placeholder="Division Name" className="w-full border p-2 rounded" />
              <input name="head" value={form.head} onChange={handleInput} placeholder="Head of Division" className="w-full border p-2 rounded" />
              <input name="staff" value={form.staff} onChange={handleInput} placeholder="Total Staff" type="number" className="w-full border p-2 rounded" />
              <select name="status" value={form.status} onChange={handleInput} className="w-full border p-2 rounded">
                <option>Active</option>
                <option>Under Review</option>
                <option>Inactive</option>
              </select>
              <div className="flex gap-2 mt-4">
                <button onClick={handleSaveEdit} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                <button onClick={() => setShowEditModal(false)} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-800 font-semibold text-lg">Total Divisions</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-800 font-semibold text-lg">Active Departments</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">08</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-800 font-semibold text-lg">Inactive Divisions</h2>
          <p className="text-3xl font-bold text-red-600 mt-2">02</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-700">Division Records Table</h2>
          <button onClick={openAdd} className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700">
            + Add New Division
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 border">Division ID</th>
                <th className="p-3 border">Division Name</th>
                <th className="p-3 border">Head of Division</th>
                <th className="p-3 border">Total Staff</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Last Updated</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {divisions.map((row) => (
                <tr key={row.id} className="hover:bg-gray-100 transition">
                  <td className="p-3 border">{row.id}</td>
                  <td className="p-3 border">{row.name}</td>
                  <td className="p-3 border">{row.head}</td>
                  <td className="p-3 border">{row.staff}</td>
                  <td className="p-3 border">
                    <span className={`${row.status === 'Active' ? 'bg-green-100 text-green-700' : row.status === 'Inactive' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'} px-3 py-1 rounded-full text-sm`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 border">{row.lastUpdated}</td>
                  <td className="p-3 border space-x-2">
                    <button onClick={() => handleView(row)} className="text-blue-600 font-semibold hover:underline">View</button>
                    <button onClick={() => handleEdit(row)} className="text-yellow-600 font-semibold hover:underline">Edit</button>
                    <button onClick={() => handleDelete(row.id)} className="text-red-600 font-semibold hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DivisionalRecord;
