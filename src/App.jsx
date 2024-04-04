import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginForm from "./components/login-form/LoginForm";
import JarvisChatComponent from "./components/jarvis-chat-page/JarvisChatComponent";
import SignUpForm from "./components/sign-up-form/SignUpForm";
import UserPage from "./components/user-page/UserPage";
import ShipperDashboard from "./components/admin-dashboard-page/ShipperDashboard";
import SuperAdminDashboard from "./components/super-admin-dashboard-page/SuperAdminDashboard";
import SignUpFormCarrier from "./components/sign-up-form-carrier/SignUpFormCarrier";
import CarrierDashboard from "./components/carrier-dashboard/CarrierDashboard";
import CarrierDrivers from "./components/carrier-dashboard/carrier-drivers/CarrierDrivers";
import ShipperBidsPage from "./components/admin-dashboard-page/bids-page/ShipperBidsPage";
import ShipperChatPage from "./components/admin-dashboard-page/customer-chat-page/ShipperChatPage";
import CarrierChatPage from "./components/carrier-dashboard/carrier-chat-page/CarrierChatPage";
import CarrierSettings from "./components/carrier-dashboard/carrier-settings-page/CarrierSettings";
import DriverDashboard from "./components/driver-dashboard/DriverDashboard";
import DriverChatPage from "./components/driver-dashboard/driver-chat-page/DriverChatPage";
import DriverSettings from "./components/driver-dashboard/driver-settings-page/DriverSettings";
import DriverDetails from "./components/driver-dashboard/driver-details/DriverDetails";
import CarrierDriverDetails from "./components/carrier-dashboard/carrier-driver-details/CarrierDriverDetails";
import ChoosingRolePage from "./components/choosing-role-page/ChoosingRolePage";
import ShipperSettings from "./components/admin-dashboard-page/customer-settings/ShipperSettings";
import LandingPage from "./components/landing-page/LandingPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/shipper-dashboard/:id" element={<ShipperDashboard/>}/>
                <Route path="/shipper-loads/:id" element={<ShipperDashboard/>}/>
                <Route path="/shipper-chat-conversation/:id" element={<ShipperSettings/>}/>
                <Route path="/shipper-qoutes/:id" element={<ShipperSettings/>}/>
                <Route path="/shipper-payments/:id" element={<ShipperSettings/>}/>
                <Route path="/shipper-profile/:id" element={<ShipperSettings/>}/>
                <Route path="/shipper-settings/:id" element={<ShipperSettings/>}/>
                <Route path="/user/:personalEndpoint" element={<UserPage/>} />
                <Route path="/jarvis-chat/:personalEndpoint/:chatEndpoint" element={<JarvisChatComponent />} />
                <Route path="/sign-in" element={<LoginForm/>}/>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/sign-up-carrier" element={<SignUpFormCarrier/>}/>
                <Route path="/carrier-dashboard/:carrierID" element={<CarrierDashboard/>}/>
                <Route path="/carrier-dashboard/:carrierID/driver/:driverID" element={<CarrierDriverDetails/>}/>
                <Route path="/driver-dashboard/:driverID" element={<DriverDashboard/>}/>
                <Route path="/driver-settings/:driverID" element={<DriverSettings/>}/>
                <Route path="/driver-chat/:driverID" element={<DriverChatPage/>}/>
                <Route path="/driver-details/:driverID" element={<DriverDetails/>}/>
                <Route path="/carrier-drivers/:carrierID" element={<CarrierDrivers/>}/>
                <Route path="/bids-page/:personalEndpoint" element={<ShipperBidsPage/>}/>
                <Route path="/customer-deal-chat-conversation/:personalEndpoint" element={<ShipperChatPage/>}/>
                <Route path="/customer-deal-chat-conversation/:personalEndpoint/:chatID" element={<ShipperChatPage/>}/>
                <Route path="/carrier-deal-chat-conversation/:carrierID" element={<CarrierChatPage/>}/>
                <Route path="/carrier-settings/:carrierID" element={<CarrierSettings/>}/>
                <Route path="/shipper" element={<ShipperDashboard/>}/>
                <Route path="/carrier-settings/:carrierID" element={<CarrierSettings/>}/>
                <Route path="/sign-up" element={<ChoosingRolePage/>}/>
                <Route path="/carrier-deal-chat-conversation/:carrierID/:chatID" element={<CarrierChatPage/>} />
                <Route path="/sign-up-shipper" element={<SignUpForm/>}/>
                <Route path="/super-admin-dashboard/:personalEndpoint" element={<SuperAdminDashboard/>}/>
            </Routes>
        </Router>
    )
}

export default App
