import "./AddTransaction.css";
import { useState } from "react";
import axios from "axios";
export default function AddTransaction( addTransaction) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    description: "",
    category: "",
    amount: "",
  });
  const handleOnSubmit = async () => {
    setIsProcessing(true);
    try {
      const res = await axios.post(`http://localhost:3001/bank/transactions/`, {post: form});
      if (res?.data?.transaction) {
        addTransaction(res.data.transaction)
      }
    } catch (err) {
      setError(err);
    }
    setForm({
      description: "",
      category: "",
      amount: "",
    });
    setIsProcessing(false);
  };

  const handleOnChange = async (evt) => {
    setForm((f) => ({ ...f, [evt.target.name]: evt.target.value }));
  };

  return (
    <div className="AddTransaction">
      <h2>Add Transaction</h2>

      <div className="form">
        <div className="fields">
          <div className="field">
            <label>Description</label>
            <input
              type="text"
              name="description"
              placeholder="Enter a description..."
              value={form.description}
              onChange={handleOnChange}
            />
          </div>
          <div className="field">
            <label>Category</label>
            <input
              type="text"
              name="category"
              placeholder="Enter a category..."
              value={form.category}
              onChange={handleOnChange}
            />
          </div>
          <div className="field" style={{ flex: 0.5 }}>
            <label>Amount (cents)</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleOnChange}
            />
          </div>

          <button className="btn add-transaction" type="submit" onClick={handleOnSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
