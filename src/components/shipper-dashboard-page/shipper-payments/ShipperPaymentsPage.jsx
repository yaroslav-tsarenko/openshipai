import React, {useEffect, useState, useRef} from "react";
import '../ShipperDashboard.css';
import {ReactComponent as DefaultUserAvatar} from "../../../assets/images/default-avatar.svg";
import {ReactComponent as PlusIcon} from "../../../assets/images/plus-icon-static.svg";
import {ReactComponent as SortIcon} from "../../../assets/images/sort-icon-blue.svg";
import {ReactComponent as DeleteIcon} from "../../../assets/images/delete-account-bin-icon.svg";
import {ReactComponent as PinCodeSettingsIcon} from "../../../assets/images/pin-code-icon.svg";
import {ReactComponent as CashbackIcon} from "../../../assets/images/cashback-icon.svg";
import {ReactComponent as LockIcon} from "../../../assets/images/lock-card-icon.svg";
import {ReactComponent as SettingsIcon} from "../../../assets/images/settings-icon-card.svg";
import {useParams} from 'react-router-dom';
import DashboardSidebar from "../../dashboard-sidebar/DashboardSidebar";
import HeaderDashboard from "../../header-dashboard/HeaderDashboard";
import {Skeleton} from "@mui/material";
import axios from "axios";
import {BACKEND_URL} from "../../../constants/constants";
import Popup from "../../popup/Popup";
import Card from "../../card/Card";
import styles from "./ShipperPayments.module.scss"
import TransactionItem from "../../transaction-item/TransactionItem";
import Button from "../../button/Button";
import TextInput from "../../text-input/TextInput";
import RotatingLinesLoader from "../../rotating-lines/RotatingLinesLoader";
import useGsapAnimation from "../../../hooks/useGsapAnimation";

const ShipperPaymentsPage = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const {shipperID} = useParams();
    const [shipperInfo, setShipperInfo] = useState(null);
    const [previewSavedImage, setPreviewSavedImage] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loadingCards, setLoadingCards] = useState(true);
    const cardsAnimation = useGsapAnimation("slideLeft")
    const cardContentAnimation = useGsapAnimation("slideUp")
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

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
        setLoading(true);
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
        setLoading(false);
    };

    useEffect(() => {
        const fetchSelectedCard = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get-selected-card/carrier/${shipperID}`);
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
            const response = await axios.put(`${BACKEND_URL}/update-selected-card/shipper/${shipperID}`, {cardNumber});
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
                    DashboardAI={{visible: true, route: `/shipper-dashboard/${shipperID}`}}
                    Settings={{visible: true, route: `/shipper-settings/${shipperID}`}}
                    Payments={{visible: true, route: `/shipper-payments/${shipperID}`}}
                    ChatWithCarrier={{visible: true, route: `/shipper-chat-conversation/${shipperID}`}}
                    MyLoads={{visible: true, route: `/shipper-loads/${shipperID}`}}
                    isMobileSidebarOpen={isMobileSidebarOpen} toggleMobileSidebar={toggleMobileSidebar}
                />
                <div className={styles.shipperDashboardContent}>
                    <HeaderDashboard
                        contentTitle={shipperInfo ?
                            <>Welcome back, {shipperInfo.userShipperName}!</> :
                            <Skeleton variant="text" width={250}/>}
                        contentSubtitle="Monitor payments, loads, revenues"
                        accountName={shipperInfo ? shipperInfo.userShipperName :
                            <Skeleton variant="text" width={60}/>}
                        accountRole={shipperInfo ? shipperInfo.userShipperRole :
                            <Skeleton variant="text" width={40}/>}
                        profileLink={`/shipper-profile/${shipperID}`}
                        bellLink={`/shipper-settings/${shipperID}`}
                        settingsLink={`/shipper-profile/${shipperID}`}
                        avatar={previewSavedImage ? previewSavedImage : previewSavedImage}
                        onBurgerClick={toggleMobileSidebar}
                    />
                    {/*  <div className={styles.paymentsMethodSelector}>
                        <button>Credit Card</button>
                    </div>*/}
                    <div ref={cardsAnimation} className={styles.allCardsSection}>
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
                    <div ref={cardContentAnimation} className={styles.cardContentWrapper}>
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

export default ShipperPaymentsPage;
