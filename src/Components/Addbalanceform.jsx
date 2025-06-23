import React, { useState } from 'react'
import styles from "./Addbalance.module.css"
import { enqueueSnackbar, useSnackbar } from 'notistack';

const Addbalanceform = ({setisAddBalanceOpen,setBalance,balance}) => {

  const [addBal,setBal]=useState("")
  const onChnage=(e)=>{
    setBal(Number(e.target.value))
  }
  const onSubmit=(e)=>{
    e.preventDefault()
    if(addBal<1){
      enqueueSnackbar("Income should be more than 0",{variant:"error"})
      setisAddBalanceOpen(false)
    }
    else{
    setBalance(balance+addBal)
    setisAddBalanceOpen(false)
    }
  }

  return (
    <div>
        <h2>Add Balance</h2>
        <form action="" onSubmit={onSubmit} className={styles.addamountform}>
            <input type="number" placeholder='Income Amount' className={styles.amount} value={addBal} onChange={onChnage}/>
            <button type='submit' className={styles.addamount}>Add Balance</button>
            <button className={styles.cancel} onClick={()=>setisAddBalanceOpen(false)}>Cancel</button>
        </form>
    </div>
  )
}

export default Addbalanceform