import React, { useState } from "react";
import styles from "./Addexpense.module.css";
import { enqueueSnackbar } from "notistack";

const Addexpenseform = ({ expenses, balance, setExpenses, setExpenseOpen,setBalance,setExpense}) => {
  const [inputData, setInputData] = useState({
    title: "",
    price: "",
    category: "",
    date: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    setInputData((prev) => ({ ...prev, [name]: e.target.value }));
  };
 
  console.log(inputData);
  const onSubmit =  (e) => {
    e.preventDefault();
    if (balance < Number(inputData.price)) {
      enqueueSnackbar("Price should be less than the wallet balance", {
        variant: "warning",
      });
      setExpenseOpen(false);
      return;
    }
     setExpenses([...expenses,inputData]);
     setBalance(balance-Number(inputData.price))
     setExpense()

    setInputData ({
      title: "",
      price: "",
      selectCategory: "",
      date: "",
    });
    setExpenseOpen(false);
  };

  return (
    <div className={styles.formwrapper}>
      <h2>Add expense</h2>
      <form action="" className={styles.addexpenseform} onSubmit={onSubmit}>
        <div className={styles.subdivs}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className={styles.inputsize}
            required
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            className={styles.inputsize}
            required
            onChange={handleChange}
          />
        </div>
        <div className={styles.subdivs}>
          <select
            name="category"
            value={inputData.selectCategory}
            className={styles.inputsize}
            required
            onChange={handleChange}
            defaultValue={""}
          >
            <option value="" >
              Select Category
            </option>
            <option value="food" >Food</option>
            <option value="entertainment">Entertainment</option>
            <option value="travel">Travel</option>
          </select>
          <input
            type="date"
            placeholder="dd/mm/yyyy"
            name="date"
            className={styles.inputsize}
            required
            onChange={handleChange}
          />
        </div>
        <div className={styles.subdivs}>
          <button type="submit" className={styles.addexpense}>
            Addexpense
          </button>
          <button className={styles.cancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Addexpenseform;
