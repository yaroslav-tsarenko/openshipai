import React, {useEffect, useState, useRef} from "react";
import {ReactComponent as DefaultUserAvatar} from "../../../assets/images/default-avatar.svg";
import {ReactComponent as PlusIcon} from "../../../assets/images/plus-icon-static.svg";
import {ReactComponent as SortIcon} from "../../../assets/images/sort-icon-blue.svg";
import {ReactComponent as DeleteIcon} from "../../../assets/images/delete-account-bin-icon.svg";
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
import TextInput from "../../text-input/TextInput";
import Button from "../../button/Button";
import RotatingLinesLoader from "../../rotating-lines/RotatingLinesLoader";

const CarrierPaymentPage = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const {shipperID} = useParams();
    const {carrierID} = useParams();
    const [shipperInfo, setShipperInfo] = useState(null);
    const [carrierInfo, setCarrierInfo] = useState(null);
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loadingCards, setLoadingCards] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const toggleMobileSidebar = () => {setIsMobileSidebarOpen(!isMobileSidebarOpen);};
    const [formData, setFormData] = useState({
        cardLastNameFirstName: '',
        userID: carrierID,
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        cardPaymentSystem: '',
        cardColor: (() => {
            const colors = ['red', 'green', 'blue', "yellow"];
            return colors[Math.floor(Math.random() * colors.length)];
        })(),
        userEmail: '',
    });

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/get-current-user/carrier/${carrierID}`);
                const data = await response.json();
                setCarrierInfo(data);
                console.log(carrierInfo.carrierAccountAccountEmail)
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
                const response = await fetch(`${BACKEND_URL}/get-cards/${carrierID}`);
                const data = await response.json();
                if (data.status === 'Success' && Array.isArray(data.cards)) {
                    setCards(data.cards);
                } else {
                    console.error(data.message);
                    setCards([]);
                }
            } catch (error) {
                console.error('Error fetching cards:', error);
                setCards([]);
            } finally {
                setLoadingCards(false);
            }
        };
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-all-transactions/${carrierID}`);
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
        fetchCards();
    }, [carrierID]);

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
        setLoading(true);
        try {
            // Generate stripeAccountID
            const stripeResponse = await axios.post(`${BACKEND_URL}/create-stripe-account`, { email: formData.userEmail });
            const stripeAccountID = stripeResponse.data.stripeAccountID;

            const cardData = { ...formData, stripeAccountID };

            const response = await axios.post(`${BACKEND_URL}/save-card`, cardData);
            if (response.data.status === 'Success') {
                alert('Card added successfully');
            } else {
                alert('Error adding card');
            }
        } catch (error) {
            console.error('Error adding card:', error);
            alert('Error adding card');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchSelectedCard = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-selected-card/carrier/${carrierID}`);
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
        const getAvatar = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-carrier-avatar/${carrierID}`);
                if (response.data.carrierAvatar) {
                    setPreviewSavedImage(`${BACKEND_URL}/${response.data.carrierAvatar}`);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getAvatar();
        fetchSelectedCard();
    }, [carrierID]);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleCardClickAsync = async (cardNumber) => {
        try {
            const response = await axios.put(`${BACKEND_URL}/update-selected-card/carrier/${carrierID}`, {cardNumber});
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
                const response = await fetch(`${BACKEND_URL}/get-current-user/carrier/${carrierID}`);
                const data = await response.json();

                setShipperInfo(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getUser();
    }, [carrierID]);

    return (
        <>
            {isPopupOpen && (
                <Popup onClose={togglePopup} title="Add Card" footerText="You need to enter full data of your card">
                    <TextInput
                        type="text"
                        id="cardLastNameFirstName"
                        value={formData.cardLastNameFirstName}
                        onChange={handleChange('cardLastNameFirstName')}
                        label="Card Last Name & First Name"
                        style={{placeholder: 'JOHN DOE'}}
                    />
                    <TextInput
                        type="text"
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        label="Card Number"
                        style={{placeholder: '1234 5678..'}}
                    />
                    <TextInput
                        type="text"
                        id="userEmail"
                        value={formData.userEmail}
                        onChange={handleChange('userEmail')}
                        label="User Email"
                        style={{ placeholder: 'example@example.com' }}
                    />
                    <div className="card-data-section">
                        <TextInput
                            type="text"
                            id="expirationDate"
                            value={formData.expirationDate}
                            onChange={handleExpirationDateChange}
                            label="Expiration Date"
                            style={{placeholder: 'MM/YY'}}
                        />
                        <TextInput
                            type="text"
                            id="cvv"
                            value={formData.cvv}
                            onChange={handleCVVChange}
                            label="CVV"
                            style={{placeholder: 'CVV'}}
                        />
                    </div>
                    <TextInput
                        type="select"
                        id="cardPaymentSystem"
                        value={formData.cardPaymentSystem}
                        onChange={handleChange('cardPaymentSystem')}
                        options={[
                            {value: 'Visa', label: 'Visa'},
                            {value: 'Master Card', label: 'Master Card'}
                        ]}
                    />
                    <Button variant="apply-non-responsive" onClick={handleAddCard}>
                        {isLoading ?
                            <>
                                <RotatingLinesLoader title="Processing..."/>
                            </>
                            :
                            "Add Card"}
                    </Button>
                </Popup>
            )}
            <div className={styles.shipperDashboardContentWrapper}>
                <DashboardSidebar
                    DashboardAI={{visible: true, route: `/carrier-dashboard/${carrierID}`}}
                    TakeLoad={{visible: true, route: `/carrier-take-loads/${carrierID}`}}
                    MyLoads={{visible: true, route: `/carrier-loads/${carrierID}`}}
                    DriversAndEquip={{visible: true, route: `/carrier-drivers/${carrierID}`}}
                    Payments={{visible: true, route: `/carrier-payments/${carrierID}`}}
                    ChatWithShipper={{visible: true, route: `/carrier-chat-conversation/${carrierID}`}}
                    Settings={{visible: true, route: `/carrier-settings/${carrierID}`}}
                    isSidebarOpen={isSidebarOpen}
                    type="carrier"
                    userID={carrierID}
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
                            <div className={styles.addNewCard} onClick={togglePopup}>
                                <section>
                                    <PlusIcon/>
                                    <h2>Add New</h2>
                                </section>
                            </div>
                            {loadingCards ? (
                                <Skeleton variant="rounded" width={300} height={200}/>
                            ) : (
                                cards.length === 0 ? (
                                    <p className="text-message-p">You haven't added any card to the list</p>
                                ) : (
                                    cards.map(card => (
                                        <Card
                                            key={card._id}
                                            cardNumber={card.cardNumber}
                                            cardCVV={card.cvv}
                                            cardColor={card.cardColor}
                                            cardExpirationDate={card.expirationDate}
                                            cardLastNameFirstName={card.cardLastNameFirstName}
                                            cardPaymentSystem={card.cardPaymentSystem}
                                        />
                                    ))
                                )
                            )}
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
                                {transactions.length === 0 ? (
                                    <p className="text-message-p">You didn't have any transactions</p>
                                ) : (
                                    transactions.map(transaction => (
                                        <TransactionItem
                                            key={transaction._id}
                                            avatar={previewSavedImage}
                                            currentUser="You"
                                            monthAndYear={transaction.currentDate}
                                            time={transaction.currentTime}
                                            typeOfPayment={transaction.paymentStatus}
                                            priceAmount={`${transaction.amount}$`}
                                        />
                                    ))
                                )}
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
                                    <p className="text-message-p">No card selected</p>
                                )}
                                {/*<section>
                                    <Button variant="darkGrey-100"><PinCodeSettingsIcon/> Pin code settings</Button>
                                    <Button variant="darkGrey-100"><CashbackIcon/> Cashback</Button>
                                    <Button variant="darkGrey-100"><LockIcon/> Block Card</Button>
                                    <Button variant="darkGrey-100"><SettingsIcon/> Settings Limits</Button>
                                </section>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CarrierPaymentPage;
