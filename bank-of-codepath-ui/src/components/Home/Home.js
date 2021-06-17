import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"

export default function Home() {
  return (
    <div className="Home">
      <AddTransaction AddTransaction={AddTransaction}/>
      <BankActivity />
    </div>
  )
}
