import React, { useState } from "react";

function EditTransactionModal({ txn, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...txn });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 max-w-sm shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Transaction</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Name"
            required
          />

          <input
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Amount"
            required
          />

          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Description"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTransactionModal;
