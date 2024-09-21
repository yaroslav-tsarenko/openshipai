import React, {useEffect, useState, useRef} from "react";
import {ReactComponent as DefaultUserAvatar} from "../../../assets/default-avatar.svg";
import {ReactComponent as PlusIcon} from "../../../assets/plus-icon-static.svg";
import {ReactComponent as SortIcon} from "../../../assets/sort-icon-blue.svg";
import {ReactComponent as DeleteIcon} from "../../../assets/delete-account-bin-icon.svg";
import {ReactComponent as PinCodeSettingsIcon} from "../../../assets/pin-code-icon.svg";
import {ReactComponent as CashbackIcon} from "../../../assets/cashback-icon.svg";
import {ReactComponent as LockIcon} from "../../../assets/lock-card-icon.svg";
import {ReactComponent as SettingsIcon} from "../../../assets/settings-icon-card.svg";
import {useParams} from 'react-router-dom';
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import {Skeleton} from "@mui/material";
import axios from "axios";
import {BACKEND_URL} from "../../../constants/constants";
import Popup from "../../popup/Popup";
import Card from "../../card/Card";
import styles from "./CarrierPaymentsPage.module.scss"
import TransactionItem from "../../transaction-item/TransactionItem";

const CarrierPaymentPage = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const {shipperID} = useParams();
    const {carrierID} = useParams();
    const [shipperInfo, setShipperInfo] = useState(null);
    const [carrierInfo, setCarrierInfo] = useState(null);
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loadingCards, setLoadingCards] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const toggleMobileSidebar = () => {setIsMobileSidebarOpen(!isMobileSidebarOpen);};
    const [formData, setFormData] = useState({
        cardLastNameFirstName: '',
        userID: shipperID,
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        cardPaymentSystem: '',
        cardColor: (() => {
            const colors = ['red', 'green', 'blue', "yellow"];
            return colors[Math.floor(Math.random() * colors.length)];
        })()
    });

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/get-current-user/carrier/${carrierID}`);
                const data = await response.json();
                setCarrierInfo(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getUser();
    }, [carrierID]);


    useEffect(() => {
        const fetchCards = async () => {
            try {
                setLoadingCards(true);
                const response = await fetch(`${BACKEND_URL}/get-cards/${shipperID}`);
                const data = await response.json();
                if (data.status === 'Success' && Array.isArray(data.cards)) {
                    setCards(data.cards);
                } else {
                    console.error(data.message);
                    setCards([]); // Set to empty array on error
                }
            } catch (error) {
                console.error('Error fetching cards:', error);
                setCards([]); // Set to empty array on error
            } finally {
                setLoadingCards(false);
            }
        };
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-all-transactions/${shipperID}`);
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
        fetchCards();
    }, [shipperID]);

    const handleChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };

    const handleExpirationDateChange = (event) => {
        let value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4); // Insert '/' after the first two digits
        }
        if (value.length > 5) {
            value = value.slice(0, 5); // Limit to 5 characters (MM/YY)
        }
        setFormData({
            ...formData,
            expirationDate: value
        });
    };

    const handleCVVChange = (event) => {
        let value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        if (value.length > 3) {
            value = value.slice(0, 3); // Limit to 3 characters
        }
        setFormData({
            ...formData,
            cvv: value
        });
    };

    const handleCardNumberChange = (event) => {
        let value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        value = value.match(/.{1,4}/g)?.join(' ') || ''; // Insert space after every 4 digits
        if (value.length > 19) {
            value = value.slice(0, 19); // Limit to 19 characters (16 digits + 3 spaces)
        }
        setFormData({
            ...formData,
            cardNumber: value
        });
    };

    const handleAddCard = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/save-card`, formData);
            if (response.data.status === 'Success') {
                alert('Card added successfully');
                console.log(response);
            } else {
                alert('Error adding card');
            }
        } catch (error) {
            console.error('Error adding card:', error);
            alert('Error adding card');
        }
    };

    useEffect(() => {
        const fetchSelectedCard = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-selected-card/${shipperID}`);
                if (response.data.status === 'Success') {
                    setSelectedCard(response.data.card);
                    console.log(response);
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error('Error fetching selected card:', error);
            }
        };


        fetchSelectedCard();
    }, [shipperID]);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    useEffect(() => {
        if (shipperInfo && shipperInfo.userShipperAvatar) {
            setLoading(true);
            const avatarUrl = `${BACKEND_URL}/${shipperInfo.userShipperAvatar}`;

            axios.get(avatarUrl)
                .then(() => {
                    setPreviewSavedImage(avatarUrl);
                    setLoading(false);
                })
                .catch(() => {
                    console.error('Image does not exist');
                    setLoading(false);
                });
        }
    }, [shipperInfo]);

    const handleCardClickAsync = async (cardNumber) => {
        try {
            const response = await axios.put(`${BACKEND_URL}/update-selected-card/${shipperID}`, {cardNumber});
            if (response.data.status === 'Success') {
                alert('Card selected successfully');
            } else {
                alert('Error selecting card');
            }
        } catch (error) {
            console.error('Error selecting card:', error);
            alert('Error selecting card');
        }
        window.location.reload();
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/get-current-user/shipper/${shipperID}`);
                const data = await response.json();

                setShipperInfo(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getUser();
    }, [shipperID]);

    return (
        <>
            {isPopupOpen && (
                <Popup onClose={togglePopup} title="Add Card" footerText="You need to enter full data of your card">
                    <div className="google-input-wrapper">
                        <input
                            type="text"
                            id="cardLastNameFirstName"
                            autoComplete="off"
                            className="google-style-input"
                            placeholder="JOHN DOE"
                            required
                            onChange={handleChange('cardLastNameFirstName')}
                            value={formData.cardLastNameFirstName}
                        />
                        <label htmlFor="cardLastNameFirstName" className="google-style-input-label">Card Last Name &
                            First Name</label>
                    </div>
                    <div className="google-input-wrapper">
                        <input
                            type="text"
                            id="cardNumber"
                            autoComplete="off"
                            className="google-style-input"
                            placeholder="1234 5678.."
                            required
                            onChange={handleCardNumberChange}
                            value={formData.cardNumber}
                        />
                        <label htmlFor="cardNumber" className="google-style-input-label">Card Number</label>
                    </div>
                    <section className="card-data-section">
                        <div className="google-input-wrapper">
                            <input
                                type="text"
                                id="expirationDate"
                                autoComplete="off"
                                className="google-style-input"
                                placeholder="MM/YY"
                                required
                                onChange={handleExpirationDateChange}
                                value={formData.expirationDate}
                            />
                            <label htmlFor="expirationDate" className="google-style-input-label">Expiration Date</label>
                        </div>
                        <div className="google-input-wrapper">
                            <input
                                type="text"
                                id="cvv"
                                autoComplete="off"
                                className="google-style-input"
                                placeholder="CVV"
                                required
                                onChange={handleCVVChange}
                                value={formData.cvv}
                            />
                            <label htmlFor="cvv" className="google-style-input-label">CVV</label>
                        </div>
                    </section>
                    <div className="custom-select-wrapper">
                        <select
                            className="custom-select"
                            onChange={handleChange('cardPaymentSystem')}
                            value={formData.cardPaymentSystem}
                        >
                            <option value="Visa">Visa</option>
                            <option value="Master Card">Master Card</option>
                        </select>
                    </div>
                    <button className="custom-button" onClick={handleAddCard}>
                        Add Card
                    </button>
                </Popup>
            )}
            <div className={styles.shipperDashboardContentWrapper}>
                <DashboardSidebar
                    DashboardAI={{ visible: true, route: `/carrier-dashboard/${carrierID}` }}
                    TakeLoad={{ visible: true, route: `/carrier-take-loads/${carrierID}` }}
                    MyLoads={{ visible: true, route: `/carrier-loads/${carrierID}` }}
                    DriversAndEquip={{ visible: true, route: `/carrier-drivers/${carrierID}` }}
                    Payments={{ visible: true, route: `/carrier-payments/${carrierID}` }}
                    ChatWithShipper={{ visible: true, route: `/carrier-chat-conversation/${carrierID}` }}
                    Settings={{ visible: true, route: `/carrier-settings/${carrierID}` }}
                    isMobileSidebarOpen={isMobileSidebarOpen} toggleMobileSidebar={toggleMobileSidebar}
                />
                <div className={styles.shipperDashboardContent}>
                    <HeaderDashboard
                        contentTitle={carrierInfo ?
                            <>Welcome back, {carrierInfo.carrierContactCompanyName}!</> :
                            <Skeleton variant="text" width={250} />}
                        contentSubtitle="Monitor payments, loads, revenues"
                        accountName={carrierInfo ? carrierInfo.carrierContactCompanyName : <Skeleton variant="text" width={60} />}
                        accountRole={carrierInfo ? carrierInfo.role : <Skeleton variant="text" width={40} />}
                        bellLink={`/carrier-settings/${carrierID}`}
                        settingsLink={`/carrier-profile/${carrierID}`}
                        avatar={previewSavedImage ? previewSavedImage : DefaultUserAvatar}
                        onBurgerClick={toggleMobileSidebar}
                    />
                    <div className={styles.paymentsMethodSelector}>
                        <button>Credit Card</button>
                    </div>
                    <div className={styles.allCardsSection}>
                        <h4>All cards</h4>
                        <section>
                            {loadingCards ? (
                                <Skeleton variant="rounded" width={300} height={200}/>
                            ) : (
                                cards.map(card => (
                                    <Card
                                        key={card._id}
                                        onClick={handleCardClickAsync}
                                        cardNumber={card.cardNumber}
                                        cardCVV={card.cvv}
                                        cardColor={card.cardColor}
                                        cardExpirationDate={card.expirationDate}
                                        cardLastNameFirstName={card.cardLastNameFirstName}
                                        cardPaymentSystem={card.cardPaymentSystem}
                                    />
                                ))
                            )}
                            <div className={styles.addNewCard} onClick={togglePopup}>
                                <section>
                                    <PlusIcon/>
                                    <h2>Add New</h2>
                                </section>
                            </div>
                        </section>

                    </div>
                    <div className={styles.cardContentWrapper}>
                        <div className={styles.transactionHistoryWrapper}>
                            <div className={styles.transactionHistoryWrapperHeader}>
                                <h4>Transaction History</h4>
                                <button>
                                    <SortIcon/>
                                </button>
                            </div>
                            <div className={styles.transactionHistoryContent}>
                                {transactions.map(transaction => (
                                    <TransactionItem
                                        key={transaction._id}
                                        avatar={previewSavedImage}
                                        currentUser="You"
                                        monthAndYear={transaction.currentDate}
                                        time={transaction.currentTime}
                                        typeOfPayment={transaction.paymentStatus}
                                        priceAmount={`${transaction.amount}$`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className={styles.cardSettingsWrapper}>
                            <div className={styles.cardSettingsWrapperHeader}>
                                <h4>Selected Card</h4>
                                <button>
                                    <DeleteIcon/>
                                </button>
                            </div>

                            <div className={styles.cardSettingsContent}>
                                {selectedCard ? (
                                    <Card
                                        cardNumber={selectedCard.cardNumber}
                                        cardCVV={selectedCard.cvv}
                                        cardColor={selectedCard.cardColor}
                                        cardExpirationDate={selectedCard.expirationDate}
                                        cardLastNameFirstName={selectedCard.cardLastNameFirstName}
                                        cardPaymentSystem={selectedCard.cardPaymentSystem}
                                    />
                                ) : (
                                    <p>No card selected</p>
                                )}
                                <section>
                                    <button><PinCodeSettingsIcon/> Pin code settings</button>
                                    <button><CashbackIcon/> Cashback</button>
                                    <button><LockIcon/> Block Card</button>
                                    <button><SettingsIcon/> Settings Limits</button>
                                </section>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </>
    );
};

export default CarrierPaymentPage;
