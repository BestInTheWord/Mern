import React from "react";
import TransactionsList from "../components/TransactionsList.js";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm.js";
import Cookies from "js-cookie";

function Home() {
  const [transactions, setTransaction] = useState([]);
  const [editTransactions, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const token = Cookies.get('token');

    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction` , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await res.json();
    setTransaction(data);
  }
  return (
    <Container>
      <TransactionForm
        fetchTransactions={fetchTransactions}
        editTransactions={editTransactions}
      />
      <TransactionsList
        transactions={transactions}
        fetchTransactions={fetchTransactions}
        setEditTransaction={setEditTransaction}
      />
    </Container>
  );
}
export default Home;