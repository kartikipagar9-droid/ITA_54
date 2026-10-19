
import { useState } from "react";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  function addExpense(e) {
    e.preventDefault();

    if (!name.trim() || Number(amount) <= 0 || !amount) {
      alert("Please enter valid expense details.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: name.trim(),
      amount: Number(amount),
      category,
      date,
    };

    setExpenses([...expenses, newExpense]);
    setName("");
    setAmount("");
  }

  function deleteExpense(id) {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  }

  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const categoryTotals = expenses.reduce((totals, expense) => {
    totals[expense.category] =
      (totals[expense.category] || 0) + expense.amount;
    return totals;
  }, {});

  return (
    <div className="container">
      <h1>Personal Expense Tracker</h1>
      <p className="subtitle">
        Record and analyze your daily expenses
      </p>

      <div className="summary">
        <div className="card">
          <h3>Total Expenses</h3>
          <h2>₹{total.toFixed(2)}</h2>
        </div>

        <div className="card">
          <h3>Total Records</h3>
          <h2>{expenses.length}</h2>
        </div>
      </div>

      <form onSubmit={addExpense} className="expense-form">
        <h2>Add New Expense</h2>

        <label>Expense Name</label>
        <input
          type="text"
          placeholder="e.g. Lunch"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Amount (₹)</label>
        <input
          type="number"
          placeholder="Enter amount"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Education</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Other</option>
        </select>

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit">Add Expense</button>
      </form>

      <section className="expense-list">
        <h2>Expense Records</h2>

        {expenses.length === 0 ? (
          <p>No expenses recorded yet.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.name}</td>
                    <td>₹{expense.amount.toFixed(2)}</td>
                    <td>{expense.category}</td>
                    <td>{expense.date}</td>
                    <td>
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => deleteExpense(expense.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="analysis">
        <h2>Category-wise Analysis</h2>

        {Object.keys(categoryTotals).length === 0 ? (
          <p>Add expenses to see the analysis.</p>
        ) : (
          Object.entries(categoryTotals).map(([cat, value]) => (
            <div className="category-row" key={cat}>
              <span>{cat}</span>
              <strong>₹{value.toFixed(2)}</strong>
              <div className="bar">
                <div
                  className="bar-fill"
                  style={{ width: `${(value / total) * 100}%` }}
                />
              </div>
              <small>
                {((value / total) * 100).toFixed(1)}% of total
              </small>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default App;
