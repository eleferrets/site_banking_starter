import { formatAmount, formatDate } from "../../utils/format";
import "./TransactionDetail.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
/*
 - Fragment tags as return only returns one thing<> </>*/
export default function TransactionDetail() {
  const { transactionId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchTransactionById = async () => {

      setIsLoading(true);
      try {
        const res = await axios.get(`http://localhost:3001/bank/transactions/${transactionId}`)
        const data = res.data
        if (res?.data?.transaction)
        setTransaction(res.data.transaction)
      } catch (err) {
        setError(err);
      }

      setIsLoading(false);
    };
    fetchTransactionById();
  }, [transactionId]);
  const renderTransactionContent = () => {
    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <p className="description">No transaction found</p>;

    return (
      <>
        <p className="description">{transaction?.description}</p>
        <div className="meta">
          <p className={`amount ${transaction?.amount < 0 ? "minus" : ""}`}>
            {formatAmount(transaction?.amount)}
          </p>
          <p className="date">{formatDate(transaction?.postedAt)}</p>
        </div>
      </>
    );
  };

  return (
    <div className="TransactionDetail">
      <div className="card">
        <div className="title">
          <h3>Transaction #{transactionId}</h3>
          <p className="category">{transaction?.category}</p>
        </div>

        {renderTransactionContent()}
      </div>
    </div>
  );
}
