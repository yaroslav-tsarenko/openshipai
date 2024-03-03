import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginForm from "./components/login-form/LoginForm";
import JarvisChatPage from "./components/jarvis-chat-page/JarvisChatPage";
import SignUpForm from "./components/sign-up-form/SignUpForm";
import UserPage from "./components/user-page/UserPage";
import AdminDashboard from "./components/admin-dashboard-page/AdminDashboard";
import SuperAdminDashboard from "./components/super-admin-dashboard-page/SuperAdminDashboard";
import SignUpFormCarrier from "./components/sign-up-form-carrier/SignUpFormCarrier";
import CarrierDashboard from "./components/carrier-dashboard/CarrierDashboard";
import CarrierDrivers from "./components/carrier-dashboard/carrier-drivers/CarrierDrivers";
import BidsPage from "./components/admin-dashboard-page/bids-page/BidsPage";
import CustomerChatPage from "./components/admin-dashboard-page/customer-chat-page/CustomerChatPage";
import CarrierChatPage from "./components/carrier-dashboard/carrier-chat-page/CarrierChatPage";
import CarrierSettings from "./components/carrier-dashboard/carrier-settings-page/CarrierSettings";
import CustomerSettings from "./components/admin-dashboard-page/customer-settings/CustomerSettings";
import DriverDashboard from "./components/driver-dashboard/DriverDashboard";
import DriverChatPage from "./components/driver-dashboard/driver-chat-page/DriverChatPage";
import DriverSettings from "./components/driver-dashboard/driver-settings-page/DriverSettings";
import DriverDetails from "./components/driver-dashboard/driver-details/DriverDetails";
import CarrierDriverDetails from "./components/carrier-dashboard/carrier-driver-details/CarrierDriverDetails";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/user/:personalEndpoint" element={<UserPage/>} />
                <Route path="/jarvis-chat/:personalEndpoint/:chatEndpoint" element={<JarvisChatPage />} />
                <Route path="/sign-in" element={<LoginForm/>}/>
                <Route path="/sign-up-carrier" element={<SignUpFormCarrier/>}/>
                <Route path="/carrier-dashboard/:carrierID" element={<CarrierDashboard/>}/>
                <Route path="/carrier-dashboard/:carrierID/driver/:driverID" element={<CarrierDriverDetails/>}/>
                <Route path="/driver-dashboard/:driverID" element={<DriverDashboard/>}/>
                <Route path="/driver-settings/:driverID" element={<DriverSettings/>}/>
                <Route path="/driver-chat/:driverID" element={<DriverChatPage/>}/>
                <Route path="/driver-details/:driverID" element={<DriverDetails/>}/>
                <Route path="/carrier-drivers/:carrierID" element={<CarrierDrivers/>}/>
                <Route path="/bids-page/:personalEndpoint" element={<BidsPage/>}/>
                <Route path="/customer-deal-chat-conversation/:personalEndpoint" element={<CustomerChatPage/>}/>
                <Route path="/customer-deal-chat-conversation/:personalEndpoint/:chatID" element={<CustomerChatPage/>}/>
                <Route path="/carrier-deal-chat-conversation/:carrierID" element={<CarrierChatPage/>}/>
                <Route path="/carrier-settings/:carrierID" element={<CarrierSettings/>}/>
                <Route path="/customer-settings/:personalEndpoint" element={<CustomerSettings/>}/>
                <Route path="/carrier-deal-chat-conversation/:carrierID/:chatID" element={<CarrierChatPage/>} />
                <Route path="/" element={<SignUpForm/>}/>
                <Route path="/admin-dashboard/:personalEndpoint" element={<AdminDashboard/>}/>
                <Route path="/super-admin-dashboard/:personalEndpoint" element={<SuperAdminDashboard/>}/>
            </Routes>
        </Router>
    )
}

export default App
