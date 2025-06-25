import React, { useState } from 'react'
import styles from "./Addexpense.module.css"
import { enqueueSnackbar } from "notistack";

const EditExpenseForm = ({editId,balance,setBalance,expenses,setExpenses,setIsFormOpen}) => {
     const editExpense=expenses.find(a => editId===a.id)
     const prevPrice=editExpense.price
     const [inputData,setInputData]=useState(editExpense)
     console.log(typeof(prevPrice),"from edit expense")

    
 
    
    console.log(editExpense,"edit expense")

   const handleChange= (e)=>{
        const name = e.target.name;
    setInputData((prev) => ({ ...prev, [name]: e.target.value }));
   }
    
    const onSubmit =(e)=>{
       e.preventDefault()
       if (balance < Number(inputData.price)) {
             enqueueSnackbar("Price should be less than the wallet balance", {
               variant: "warning",
             });
             setIsFormOpen(false);
             return;
           }
        const Updated=expenses.map(a=>{
            if(a.id==editId){
                return a=inputData
            }
            else{
                return a
            }
        })
        setExpenses(Updated)
        setIsFormOpen(false)

    }

  return (
    <div className={styles.formwrapper}>
      <h2>Edit Expense</h2>
      <form action="" className={styles.addexpenseform} onSubmit={onSubmit}>
        <div className={styles.subdivs}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className={styles.inputsize}
            required
            onChange={handleChange}
            value={inputData.title}
          />
          <input
            type="number"
            placeholder="Price"
            name="price"
            className={styles.inputsize}
            required
            onChange={handleChange}
            value={inputData.price}
          />
        </div>
        <div className={styles.subdivs}>
          <select
            name="category"
            value={inputData.selectCategory}
            className={styles.inputsize}
            required
            onChange={handleChange}
            defaultValue={inputData.category}
            
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
            value={inputData.date}
          />
        </div>
        <div className={styles.subdivs}>
          <button type="submit" className={styles.addexpense}>
            Addexpense
          </button>
          <button className={styles.cancel} onClick={()=>setIsFormOpen(false)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditExpenseForm