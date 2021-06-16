import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import "./App.css";
import TransactionDetail from "../TransactionDetail/TransactionDetail";

export default function App() {
  //const [posts, setPosts] = useState([])
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState(0);
  const [filterInputValue, setInputValue] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [transfers, setTransfers] = useState([]);

  // Every time the site or inside the array rendered
  // It will run only once as there is nothing in the array
  useEffect(() => {
    const fetchTransactions = async () => {
      //   try {
      //     // attaches data to res.data
      //     const res = await axios.get("http://localhost:3001/bank")
      //     const data = res.data
      //     // Optional chain operator for if statements
      //     // This is the same thing as if data, then set posts
      //     const posts = res?.data?.posts
      //   }
      //   catch(err) {
      //     console.log({err})
      //   }
      // }

      setFetching(true);
      try {
        const transferRes = await axios.get(
          "http://localhost:3001/bank/transfers"
        );
        const transferData = transferRes.data;
        const transfers = transferRes?.transferData?.transfers;
        setTransfers(transfers);
        const transactionRes = await axios.get(
          "http://localhost:3001/bank/transactions"
        );
        const transactionData = transactionRes.data;
        const transactions = transactionRes?.transactionData?.transactions;
        setTransactions(transactions);
      } catch (err) {
        setError(err);
      }

      setFetching(false);
    };
    fetchTransactions();
  }, []);
  return (
    <div className="App"> 
      <BrowserRouter>
      <Navbar />
      <Routes>
<Route path="/"  element={<Home />}></Route>
<Route path="/bank/:transactionId" element={<TransactionDetail />}></Route>
</Routes>
{/* <Link to="/"></Link> */}
</BrowserRouter>
      
    </div>
  );
}
