import React from 'react';
import styles from "./TransactionItem.module.scss";
import {ReactComponent as DefaultUserAvatar} from "../../assets/default-avatar.svg";

const TransactionItem = ({currentUser, typeOfPayment, monthAndYear, time, priceAmount, avatar}) => {
    return (
        <div className={styles.transactionItemWrapper}>
            {avatar ? (
                <img src={avatar} className="user-header-avatar" alt="User Avatar" width="50"
                     height="50"/>
            ) : (
                <DefaultUserAvatar width="60" height="60"/>
            )}
            <div className={styles.transactionItemContent}>
                <div className={styles.userCredentials}>
                    <section>
                        <h1>{currentUser}</h1>
                        <p>{typeOfPayment}</p>
                    </section>
                </div>
                <div className={styles.paymentDate}>
                    <h1>{monthAndYear}</h1>
                    <p>{time}</p>
                </div>
                <div className={styles.priceAmount}
                     style={{color: typeOfPayment === "Payed to Card" ? "#52b100" : "inherit"}}>
                    <h1>{typeOfPayment === "Payed to Card" ? `+${priceAmount}` : `-${priceAmount}`}</h1>
                </div>
            </div>
        </div>
    );
};

export default TransactionItem;