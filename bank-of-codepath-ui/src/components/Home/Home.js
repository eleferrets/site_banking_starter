import { listTransactions } from "../../../../bank-of-codepath-express-api/models/bank";
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"

export default function Home(filterInputValue, handleOnInputChange) {
  let filteredTransactions = [];
  if (filterInputValue) {
    filteredTransactions += filterInputValue;
  } else {
    filteredTransactions = listTransactions();
  }
  return (
    <div className="Home">
      <AddTransaction AddTransaction={AddTransaction}/>
      <BankActivity filteredTransactions={filteredTransactions} />
    </div>
  )
}
