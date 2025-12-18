import React, { useState, useMemo } from "react";

const CustomerFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([
    { id: "FB001", name: "Akshitha", text: "Excellent service! The support team responded very quickly.", rating: 5, date: "05-Dec-2025", status: "Resolved" },
    { id: "FB002", name: "Megha ", text: "The website is slow sometimes. Please optimize.", rating: 3, date: "28-Nov-2025", status: "Pending" },
    { id: "FB003", name: "Vikitha", text: "Good UI but needs more dark-mode options.", rating: 4, date: "21-Nov-2025", status: "Reviewed" },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({ name: "", text: "", rating: 5, status: "Pending" });
  const [replyText, setReplyText] = useState("");

  const totals = useMemo(() => {
    const total = feedbacks.length;
    const positive = feedbacks.filter((f) => f.rating >= 4).length;
    const negative = feedbacks.filter((f) => f.rating <= 2).length;
    return { total, positive, negative };
  }, [feedbacks]);

  const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

  const openAdd = () => {
    setForm({ name: "", text: "", rating: 5, status: "Pending" });
    setShowAdd(true);
  };

  const handleAdd = () => {
    if (!form.name || !form.text) return alert("Please provide name and feedback text");
    const nextId = `FB${String(feedbacks.length + 1).padStart(3, "0")}`;
    const today = new Date().toLocaleDateString();
    setFeedbacks([{ id: nextId, name: form.name, text: form.text, rating: Number(form.rating), date: today, status: form.status }, ...feedbacks]);
    setShowAdd(false);
  };

  const handleView = (f) => {
    setSelected(f);
    setShowView(true);
  };

  const handleReply = (f) => {
    setSelected(f);
    setReplyText("");
    setShowReply(true);
  };

  const submitReply = () => {
    if (!selected) return;
   
    setFeedbacks(feedbacks.map((fb) => (fb.id === selected.id ? { ...fb, status: "Resolved", reply: replyText } : fb)));
    setShowReply(false);
    setShowView(false);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this feedback?")) return;
    setFeedbacks(feedbacks.filter((f) => f.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

     
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Customer Feedback</h1>
        <p className="text-gray-600 mt-1">View, analyze, and manage feedback received from customers and users.</p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-700 font-semibold text-lg">Total Feedback</h2>
          <p className="text-3xl mt-2 font-bold text-blue-600">{totals.total}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-700 font-semibold text-lg">Positive</h2>
          <p className="text-3xl mt-2 font-bold text-green-600">{totals.positive}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-700 font-semibold text-lg">Negative</h2>
          <p className="text-3xl mt-2 font-bold text-red-600">{totals.negative}</p>
        </div>
      </div>

      
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-700">Customer Feedback Records</h2>
          <div className="flex items-center gap-3">
            <button onClick={openAdd} className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700">+ New Feedback</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="p-3 border">Feedback ID</th>
                <th className="p-3 border">Customer Name</th>
                <th className="p-3 border">Feedback</th>
                <th className="p-3 border">Rating</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {feedbacks.map((fb) => (
                <tr key={fb.id} className="hover:bg-gray-100 transition">
                  <td className="p-3 border">{fb.id}</td>
                  <td className="p-3 border">{fb.name}</td>
                  <td className="p-3 border w-72">{fb.text}</td>
                  <td className="p-3 border">{stars(fb.rating)}</td>
                  <td className="p-3 border">{fb.date}</td>
                  <td className="p-3 border">
                    <span className={`${fb.status === 'Resolved' ? 'bg-green-100 text-green-700' : fb.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'} px-3 py-1 rounded-full text-sm`}>
                      {fb.status}
                    </span>
                  </td>
                  <td className="p-3 border space-x-2">
                    <button onClick={() => handleView(fb)} className="text-blue-600 hover:underline">View</button>
                    <button onClick={() => handleReply(fb)} className="text-yellow-600 hover:underline">Reply</button>
                    <button onClick={() => handleDelete(fb.id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      
      {showAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">New Feedback</h3>
            <div className="space-y-3">
              <input name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Customer Name" className="w-full border p-2 rounded" />
              <textarea name="text" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="Feedback" className="w-full border p-2 rounded" />
              <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="w-full border p-2 rounded">
                <option value={5}>5 - Excellent</option>
                <option value={4}>4 - Good</option>
                <option value={3}>3 - OK</option>
                <option value={2}>2 - Poor</option>
                <option value={1}>1 - Very Poor</option>
              </select>
              <div className="flex gap-2 mt-4">
                <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                <button onClick={() => setShowAdd(false)} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

     
      {showView && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowView(false)}>
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-2">{selected.name}</h3>
            <p className="text-sm text-gray-700 mb-2">{selected.text}</p>
            <p className="text-sm text-gray-600">Rating: {stars(selected.rating)}</p>
            <p className="text-sm text-gray-600">Status: {selected.status}</p>
            {selected.reply && <div className="mt-3 p-3 bg-gray-50 rounded">Reply: {selected.reply}</div>}
            <div className="mt-4 flex gap-2">
              <button onClick={() => { setShowView(false); handleReply(selected); }} className="bg-yellow-500 text-white px-4 py-2 rounded">Reply</button>
              <button onClick={() => setShowView(false)} className="bg-gray-200 px-4 py-2 rounded">Close</button>
            </div>
          </div>
        </div>
      )}

     
      {showReply && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowReply(false)}>
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-2">Reply to {selected.name}</h3>
            <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} className="w-full border p-2 rounded" placeholder="Write your reply here" />
            <div className="mt-4 flex gap-2">
              <button onClick={submitReply} className="bg-blue-600 text-white px-4 py-2 rounded">Send Reply</button>
              <button onClick={() => setShowReply(false)} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CustomerFeedback;
