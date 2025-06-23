import styles from "./card.module.css";

const Card = ({
  title,
  cost,
  money,
  buttonContent,
  btType,
  handleClick
}) => {
  return (
    <div className={styles.cardBackground}>
      <h4 className={styles.title}>
        {title} :
        <span
          className={
            title === "Wallet Balance" ? styles.addTitle : styles.expenseTitle
          }
        >
          {" "}
          ₹{money}
        </span>
      </h4>
     <button
        type="button"
        className={btType == "addMoney" ? styles.addMoney : styles.addExpense}
        onClick={handleClick}
      >
        {buttonContent}
      </button>
    </div>
  );
};

export default Card;
