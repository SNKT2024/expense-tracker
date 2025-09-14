import React from "react";

function DeleteConfirmModal({ txnName, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-70 max-w-sm shadow-lg lg:w-lg ">
        <h2 className="text-lg font-semibold mb-3">Confirm Delete</h2>
        <p className="text-gray-600 mb-4">
          Are you sure you want to delete{" "}
          <span className="font-medium">{txnName}</span>? <br />
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
