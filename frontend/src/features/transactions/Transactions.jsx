import React, { useEffect, useState } from "react";
import apiClient from "../../utils/axiosInstance";
import TxnCard from "./TxnCard";
import DeleteConfirmModal from "./DeleteConfirmModal";
import EditTransactionModal from "./EditTransactionModal";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [deleteTxn, setDeleteTxn] = useState(null);
  const [editTxn, setEditTxn] = useState(null);

  // Fetch transactions from backend
  const getUserTransactions = async () => {
    try {
      const res = await apiClient.get("/api/transaction/get-transactions");
      setTransactions(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserTransactions();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/api/transaction/${id}`);
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteTxn(null);
    }
  };

  // Handle edit/save
  const handleEditSave = async (updatedTxn) => {
    try {
      const res = await apiClient.put(
        `/api/transaction/${updatedTxn._id}`,
        updatedTxn
      );
      const newTxn = res.data.data;
      setTransactions((prev) =>
        prev.map((t) => (t._id === newTxn._id ? newTxn : t))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setEditTxn(null);
    }
  };

  return (
    <div className="p-3 w-full flex flex-col justify-center space-y-4">
      <TxnCard
        transactions={transactions}
        onEdit={(txn) => setEditTxn(txn)}
        onDelete={(txn) => setDeleteTxn(txn)}
      />

      {deleteTxn && (
        <DeleteConfirmModal
          txnName={deleteTxn.name}
          onClose={() => setDeleteTxn(null)}
          onConfirm={() => handleDelete(deleteTxn._id)}
        />
      )}

      {editTxn && (
        <EditTransactionModal
          txn={editTxn}
          onClose={() => setEditTxn(null)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
}

export default Transactions;
