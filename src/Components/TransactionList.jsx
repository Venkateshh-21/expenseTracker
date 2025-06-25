import React, { useEffect, useState } from "react";
import styles from "./transactionlist.module.css";
import Pagination from "./Pagination";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { PiPizza, PiGift } from "react-icons/pi";
import { MdOutlineModeEdit } from "react-icons/md";
import { BsSuitcase2 } from "react-icons/bs";
import ReactModal from "react-modal";
import EditExpenseForm from "./EditExpenseForm";
const TransactionCard = ({ expense, handleEdit, handleDelete }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        <div className={styles.cardIcon}>
          {expense.category == "food" && <PiPizza />}
          {expense.category == "entertainment" && <PiGift />}
          {expense.category == "travel" && <BsSuitcase2 />}
        </div>
        <div className={styles.cardInfo}>
          <h5>{expense.title}</h5>
          <p>{expense.date}</p>
        </div>
      </div>

      <div className={styles.cardInner}>
        <p className={styles.cardPrice}>{`₹${expense.price}`}</p>
        <div className={styles.cardButtonWrapper}>
          <button
            className={styles.cardDelete}
            onClick={() => handleDelete(expense.id)}
          >
            <IoMdCloseCircleOutline />
          </button>
          <button className={styles.cardEdit} onClick={handleEdit}>
            <MdOutlineModeEdit />
          </button>
        </div>
      </div>
    </div>
  );
};

const TransactionList = ({ balance, setBalance, expenses, setExpenses }) => {
  const [editId, setEditId] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currTansaction, setCurrTransaction] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currPage, setCurrPage] = useState(1);
  console.log(currTansaction, "currrrr");

  const handleEdit = (id) => {
    setEditId(id);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    const expToDel = expenses.find((a) => a.id == id);
    console.log(expToDel, "delete");
    setBalance((prev) => Number(expToDel.price) + prev);
    setExpenses((prev) => {
      return prev.filter((a) => a.id !== id);
    });
  };
  useEffect(() => {
    const sI = (currPage - 1) * 3;
    const eI = Math.min(expenses.length, currPage * 3);
    setCurrTransaction([...expenses].slice(sI, eI));
    setTotalPages(Math.ceil(expenses.length / 3));
  }, [currPage, expenses]);

  useEffect(() => {
    if (currPage < 1 && totalPages < currPage) setCurrPage((prev) => prev - 1);
  }, [totalPages]);

  return (
    <div className={styles.transactions}>
      <h2>Recent Transactions</h2>
      {expenses.length == 0 ? (
        <div className={styles.noTransactions}>
          <h6>No transactions</h6>
        </div>
      ) : (
        <div className={styles.listandpagination}>
          <div className={styles.list}>
            {currTansaction.map((a) => {
              return (
                <TransactionCard
                  expense={a}
                  key={a.id}
                  handleEdit={()=>handleEdit(a.id)}
                  handleDelete={handleDelete}
                />
              );
            })}
          </div>
          {totalPages > 1 ? (
            <Pagination
              currPage={currPage}
              setCurrPage={setCurrPage}
              totalPages={totalPages}
            />
          ) : (
            ""
          )}
        </div>
      )}
      <ReactModal isOpen={isFormOpen}>
        <EditExpenseForm
          editId={editId}
          balance={balance}
          setBalance={setBalance}
          expenses={expenses}
          setExpenses={setExpenses}
          setIsFormOpen={setIsFormOpen}
          
        />
      </ReactModal>
    </div>
  );
};

export default TransactionList;
