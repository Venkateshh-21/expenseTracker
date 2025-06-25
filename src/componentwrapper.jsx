import Card from "./Components/Card/card";
import styles from "./componentwrapper.module.css";
import Piechart from "./Components/Card/Piechart";
import Addbalanceform from "./Components/Addbalanceform";
import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import Addexpenseform from "./Components/Addexpenseform";
import TransactionList from "./Components/TransactionList";
import Barchart from "./Components/Barchart";
ReactModal.setAppElement('#root');

const Componentwrapper = (e) => {
  const [balance, setBalance] = useState(localStorage.getItem("balance") || 0);
  const [expense, setExpense] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [cateoSpends, setCateoSpends] = useState({});
  const [didMount, setDidMount] = useState(false);
  const [isAddBalanceOpen, setisAddBalanceOpen] = useState(false);
  const [isExpenseOpen, setExpenseOpen] = useState(false);

  const addButtonClick = () => {
    setisAddBalanceOpen(true);
  };
  const addExpenseClick = () => {
    setExpenseOpen(true);
  };
  const handleCloseadd = () => {
    setisAddBalanceOpen(false);
  };
  const handleCloseexpense = () => {
    setExpenseOpen(false);
  };
  console.log(expenses, "from componentwrapper");

  useEffect(() => {
    if (localStorage.getItem("balance")) {
      setBalance(Number(localStorage.getItem("balance")));
    } else {
      setBalance(5000);
      localStorage.setItem("balance", 5000);
    }
    const exps = JSON.parse(localStorage.getItem("expenses"));
    if (exps) setExpenses(exps);
    else setExpenses([]);
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (expenses.length > 0 || didMount)
      localStorage.setItem("expenses", JSON.stringify(expenses));

    if (expenses.length < 1) {
      setExpense(0);
    } else {
      setExpense(
        expenses.reduce((accu, curr) => {
          return accu + Number(curr.price);
        }, 0)
      );
    }
    let foodTotal=0;
    let entertainmentTotal=0
    let travelTotal=0
    expenses.forEach(a=>{
      if(a.category=="food") foodTotal += Number(a.price)
      else if(a.category=="entertainment") entertainmentTotal += Number(a.price)
      else if(a.category=="travel") travelTotal += Number(a.price)
    })
   setCateoSpends({
    food:foodTotal,
    entertainment: entertainmentTotal,
    travel:travelTotal
   })
   console.log(cateoSpends,"spends")
  }, [expenses]);

  useEffect(() => {
    if (didMount) {
      localStorage.setItem("balance", balance);
    }
  }, [balance]);

  return (
    <div className={styles.allComponents}>
      <h1 className={styles.heading}>Expense Tracker</h1>
      <div className={styles.add}>
        <Card
          title={"Wallet Balance"}
          money={balance}
          buttonContent={"+ Add Income"}
          btType={"addMoney"}
          handleClick={addButtonClick}
        />
        <Card
          title={"Expenses"}
          money={expense}
          buttonContent={"+Add expense"}
          handleClick={addExpenseClick}
        />
        <Piechart data ={[{name:"Food",value:cateoSpends.food}, {name: "Entertainment", value: cateoSpends.entertainment },
            { name: "Travel", value: cateoSpends.travel }]} />
      </div>
      <div className={styles.transactionBar}>
        <TransactionList 
        balance={balance}
        setBalance={setBalance}
        expenses={expenses}
        setExpenses={setExpenses}

        />
        <Barchart  data={[{name:"Food",value:cateoSpends.food}, {name: "Entertainment", value: cateoSpends.entertainment },
            { name: "Travel", value: cateoSpends.travel }]} />
      </div>
      <ReactModal
        isOpen={isAddBalanceOpen}
        className={styles.addmodalform}
        onRequestClose={handleCloseadd}
        shouldCloseOnOverlayClick={true}
         ariaHideApp={false}
      >
        <Addbalanceform
          setisAddBalanceOpen={setisAddBalanceOpen}
          setBalance={setBalance}
          balance={balance}

        />
      </ReactModal>
      <ReactModal
        isOpen={isExpenseOpen}
        className={styles.addmodalform}
        onRequestClose={handleCloseexpense}
        shouldCloseOnOverlayClick={true}
         ariaHideApp={false}
      >
        <Addexpenseform
          setExpenses={setExpenses}
          setExpenseOpen={setExpenseOpen}
          expenses={expenses}
          balance={balance}
          setBalance={setBalance}
          setExpense={setExpense}
        />
      </ReactModal>
    </div>
  );
};

export default Componentwrapper;
