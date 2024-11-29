import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginForm from "./components/login-form/LoginForm";
import SignUpForm from "./components/sign-up-form/SignUpForm";
import ShipperDashboard from "./components/shipper-dashboard-page/ShipperDashboard";
import SignUpFormCarrier from "./components/sign-up-form-carrier/SignUpFormCarrier";
import CarrierDashboard from "./components/carrier-dashboard/CarrierDashboard";
import CarrierTakeLoad from "./components/carrier-dashboard/carrier-take-load/CarrierTakeLoad";
import ShipperBidsPage from "./components/shipper-dashboard-page/bids-page/ShipperBidsPage";
import ShipperChatPage from "./components/shipper-dashboard-page/customer-chat-page/ShipperChatPage";
import CarrierChatPage from "./components/carrier-dashboard/carrier-chat-page/CarrierChatPage";
import CarrierSettings from "./components/carrier-dashboard/carrier-settings-page/CarrierSettings";
import DriverDashboard from "./components/driver-dashboard/DriverDashboard";
import DriverSettings from "./components/driver-dashboard/driver-settings-page/DriverSettings";
import CarrierDrivers from "./components/carrier-dashboard/carrier-drivers/CarrierDrivers";
import ChoosingRolePage from "./components/choosing-role-page/ChoosingRolePage";
import ShipperSettings from "./components/shipper-dashboard-page/customer-settings/ShipperSettings";
import LandingPage from "./components/landing-page/LandingPage";
import ShipperLoadsPage from "./components/shipper-dashboard-page/shipper-loads/ShipperLoadsPage";
import ShipperPaymentsPage from "./components/shipper-dashboard-page/shipper-payments/ShipperPaymentsPage";
import ShipperProfilePage from "./components/shipper-dashboard-page/profile-page/ShipperProfilePage";
import CarrierProfilePage from "./components/carrier-dashboard/carrier-profile/CarrierProfilePage";
import CarrierPaymentsPage from "./components/carrier-dashboard/carrier-payments/CarrierPaymentsPage";
import CarrierLoads from "./components/carrier-dashboard/carrier-loads-page/CarrierLoads";
import DriverProfile from "./components/driver-dashboard/driver-details/DriverProfile";
import DriverAssignedLoads from "./components/driver-dashboard/driver-assigned-loads-page/DriverAssignedLoads";
import ShipperLoadPage from "./components/shipper-dashboard-page/shipper-load/ShipperLoadPage";
import SuccessPaymentPage from "./pages/success-payment/SuccessPaymentPage";
import FailedPaymentPage from "./pages/failed-payment/FailedPaymentPage";
import DriverAssignedLoad from "./components/driver-dashboard/driver-assigned-load/DriverAssignedLoad";
import SuccessLoadDelivering from "./pages/success-load-delivering/SuccessLoadDelivering";
import DistanceCalculator from "./components/distance-calculator/DistanceCalculator";
import LandingPageNew from "./components/landing-page-new/LandingPageNew";
import OpenPage from "./pages/open-page/OpenPage";
import ShipPage from "./pages/ship-page/ShipPage";
import AIPage from "./pages/ai-page/AIPage";
import SafetyPage from "./pages/safety-page/SafetyPage";
import PartnersPage from "./pages/partners-page/PartnersPage";
import BlogPage from "./pages/blog/BlogPage";
import AboutPage from "./pages/about/AboutPage";
import VehicleLoad from "./pages/vehicle-load-page/VehicleLoad";
import MovingLoad from "./pages/moving-load/MovingLoad";
import HeavyEquipmentLoad from "./pages/heavy-equipment-load/HeavyEquipmentLoad";
import FreightLoad from "./pages/freight-load/FreightLoad";
import UserAgreement from "./pages/user-agreement/UserAgreement";
import LeadGenerate from "./pages/lead-generate/LeadGenerate";
import TimeSchedule from "./pages/time-schedule/TimeSchedule";
import TermsAndConditions from "./pages/terms-and-conditions/TermsAndConditions";
import WhyChooseUs from "./pages/why-choose-us/WhyChooseUsPage";
import PricingDirects from "./pages/pricing-directs/PricingDirects";
import ProjectManagement from "./pages/project-management/ProjectManagement";
import CookiePolicy from "./pages/cookie-policy/CookiePolicy";
import PrivacyPolicy from "./pages/privacy-policy/PrivacyPolicy";
import ContactUs from "./pages/contanct-us/ContactUs";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/shipper-dashboard/:shipperID" element={<ShipperDashboard/>}/>
                <Route path="/shipper-dashboard/:shipperID/:aiChatID" element={<ShipperDashboard/>}/>
                <Route path="/shipper-loads/:shipperID" element={<ShipperLoadsPage/>}/>
                <Route path="/shipper-chat-conversation/:shipperID" element={<ShipperChatPage/>}/>
                <Route path="/customer-deal-chat-conversation/:shipperID" element={<ShipperChatPage/>}/>
                <Route path="/customer-deal-chat-conversation/:shipperID/:chatID" element={<ShipperChatPage/>}/>
                <Route path="/shipper-qoutes/:shipperID" element={<ShipperBidsPage/>}/>
                <Route path="/shipper-payments/:shipperID" element={<ShipperPaymentsPage/>}/>
                <Route path="/shipper-profile/:shipperID" element={<ShipperProfilePage/>}/>
                <Route path="/shipper-settings/:shipperID" element={<ShipperSettings/>}/>
                <Route path="/shipper-load/:shipperID/:loadCredentialID" element={<ShipperLoadPage/>}/>

                <Route path="/carrier-dashboard/:carrierID" element={<CarrierDashboard/>}/>
                <Route path="/carrier-take-loads/:carrierID" element={<CarrierTakeLoad/>}/>
                <Route path="/carrier-loads/:carrierID" element={<CarrierLoads/>}/>
                <Route path="/carrier-settings/:carrierID" element={<CarrierSettings/>}/>
                <Route path="/carrier-profile/:carrierID" element={<CarrierProfilePage/>}/>
                <Route path="/carrier-payments/:carrierID" element={<CarrierPaymentsPage/>}/>
                <Route path="/carrier-drivers/:carrierID" element={<CarrierDrivers/>}/>
                <Route path="/carrier-chat-conversation/:carrierID" element={<CarrierChatPage/>}/>

                <Route path="/driver-dashboard/:driverID" element={<DriverDashboard/>}/>
                <Route path="/driver-settings/:driverID" element={<DriverSettings/>}/>
                <Route path="/driver-assigned-loads/:driverID" element={<DriverAssignedLoads/>}/>
                <Route path="/driver-profile/:driverID" element={<DriverProfile/>}/>
                <Route path="/driver-assigned-load/:driverID/:loadID" element={<DriverAssignedLoad/>}/>

                <Route path="/bids-page/:personalEndpoint" element={<ShipperBidsPage/>}/>
                <Route path="/distance-calculator" element={<DistanceCalculator/>}/>

                <Route path="/open-page" element={<OpenPage/>}/>
                <Route path="/ship-page" element={<ShipPage/>}/>
                <Route path="/user-agreement" element={<UserAgreement/>}/>
                <Route path="/ai-page" element={<AIPage/>}/>
                <Route path="/safety-page" element={<SafetyPage/>}/>
                <Route path="/partners-page" element={<PartnersPage/>}/>
                <Route path="/blog-page" element={<BlogPage/>}/>
                <Route path="/about-page" element={<AboutPage/>}/>
                <Route path="/vehicle-load" element={<VehicleLoad/>}/>
                <Route path="/moving-load" element={<MovingLoad/>}/>
                <Route path="/construction-load" element={<HeavyEquipmentLoad/>}/>
                <Route path="/freight-load" element={<FreightLoad/>}/>
                <Route path="/lead-generate" element={<LeadGenerate/>}/>
                <Route path="/time-schedule" element={<TimeSchedule/>}/>
                <Route path="/terms-and-conditions" element={<TermsAndConditions/>}/>
                <Route path="/why-choose-us" element={<WhyChooseUs/>}/>
                <Route path="/pricing-directs" element={<PricingDirects/>}/>
                <Route path="/project-management" element={<ProjectManagement/>}/>
                <Route path="/cookie-policy" element={<CookiePolicy/>}/>
                <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
                <Route path="/contact-us" element={<ContactUs/>}/>


                <Route path="/carrier-deal-chat-conversation/:carrierID/:chatID" element={<CarrierChatPage/>} />
                <Route path="/sign-up-carrier" element={<SignUpFormCarrier/>}/>
                <Route path="/sign-up-shipper" element={<SignUpForm/>}/>
                <Route path="/sign-up" element={<ChoosingRolePage/>}/>
                <Route path="/sign-in" element={<LoginForm/>}/>
                <Route path="/old-landing" element={<LandingPage/>}/>
                <Route path="/" element={<LandingPageNew/>}/>
                <Route path="/payment-success/:shipperID/:chatID" element={<SuccessPaymentPage/>}/>
                <Route path="/load-delivered-success/:driverID" element={<SuccessLoadDelivering/>}/>
                <Route path="/payment-failed/:shipperID" element={<FailedPaymentPage/>}/>
            </Routes>
        </Router>
    )
}

export default App
