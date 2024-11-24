import React from 'react';
import styles from './Card.module.scss';
import visaIcon from '../../assets/visa-icon.svg';
import mastercardIcon from '../../assets/mastercard-icon.svg';

const Card = ({
                  cardNumber,
                  cardLastNameFirstName,
                  cardCVV,
                  cardExpirationDate,
                  cardPaymentSystem,
                  cardColor,
                  onClick
              }) => {
    const getCardBackground = () => {
        switch (cardColor) {
            case 'red':
                return styles.cardBgRed;
            case 'blue':
                return styles.cardBgBlue;
            case 'green':
                return styles.cardBgGreen;
            case 'yellow':
                return styles.cardBgYellow;
            default:
                return '';
        }
    };

    const getCardPaymentSystemIcon = () => {
        switch (cardPaymentSystem) {
            case 'Visa':
                return <img src={visaIcon} alt="Visa"/>;
            case 'Master Card':
                return <img src={mastercardIcon} alt="Master Card"/>;
            default:
                return null;
        }
    };

    return (
        <div className={`${styles.card} ${getCardBackground()}`} onClick={() => onClick(cardNumber)}>

            <div className={styles.cardUpperSection}>
                <h2>
                </h2>
                <h2>
                    <div className={styles.cardPaymentSystem}>
                        {getCardPaymentSystemIcon()}
                    </div>
                </h2>
            </div>
            <div className={styles.cardBottomSection}>
                <div>
                    <h3>
                        {cardLastNameFirstName}
                    </h3>
                    <h3>
                        {cardNumber}
                    </h3>
                </div>
                <h2>
                    {cardExpirationDate}
                </h2>
            </div>
        </div>
    );
};

export default Card;