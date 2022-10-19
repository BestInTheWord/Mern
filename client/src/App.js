import { useEffect, useState } from "react";
import Transaction from "../../server/models/Transaction.js";

function App() {
  const [form, setForm] = useState({
    amount: 0,
    description: "",
    date: "",
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const res = await fetch("http://localhost:4000/transaction");
    const { data } = await res.json();
    console.log(data);
  }

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/transaction", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>amount </label>

        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleInput}
          placeholder="Enter transtion amount"
        />

        <label>Description </label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleInput}
          placeholder="Enter transtion description"
        />

        <label>date </label>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleInput}
        />

        <button type="submit">Submit</button>
      </form>

      <br />

      <section>
        <table>
          <thead>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
          </thead>
          <tbody>
            <tr>
              <td>dis</td>
              <td>amount</td>
              <td>date</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
