import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const LoginForm = lazy(() => import('./components/login-form/LoginForm'));
const SignUpForm = lazy(() => import('./components/sign-up-form/SignUpForm'));
const ShipperDashboard = lazy(() => import('./components/shipper-dashboard-page/ShipperDashboard'));
const SignUpFormCarrier = lazy(() => import('./components/sign-up-form-carrier/SignUpFormCarrier'));
const CarrierDashboard = lazy(() => import('./components/carrier-dashboard/CarrierDashboard'));
const CarrierTakeLoad = lazy(() => import('./components/carrier-dashboard/carrier-take-load/CarrierTakeLoad'));
const ShipperBidsPage = lazy(() => import('./components/shipper-dashboard-page/bids-page/ShipperBidsPage'));
const ShipperChatPage = lazy(() => import('./components/shipper-dashboard-page/customer-chat-page/ShipperChatPage'));
const CarrierChatPage = lazy(() => import('./components/carrier-dashboard/carrier-chat-page/CarrierChatPage'));
const CarrierSettings = lazy(() => import('./components/carrier-dashboard/carrier-settings-page/CarrierSettings'));
const DriverDashboard = lazy(() => import('./components/driver-dashboard/DriverDashboard'));
const DriverSettings = lazy(() => import('./components/driver-dashboard/driver-settings-page/DriverSettings'));
const CarrierDrivers = lazy(() => import('./components/carrier-dashboard/carrier-drivers/CarrierDrivers'));
const ChoosingRolePage = lazy(() => import('./components/choosing-role-page/ChoosingRolePage'));
const ShipperSettings = lazy(() => import('./components/shipper-dashboard-page/customer-settings/ShipperSettings'));
const LandingPage = lazy(() => import('./components/landing-page/LandingPage'));
const ShipperLoadsPage = lazy(() => import('./components/shipper-dashboard-page/shipper-loads/ShipperLoadsPage'));
const ShipperPaymentsPage = lazy(() => import('./components/shipper-dashboard-page/shipper-payments/ShipperPaymentsPage'));
const ShipperProfilePage = lazy(() => import('./components/shipper-dashboard-page/profile-page/ShipperProfilePage'));
const CarrierProfilePage = lazy(() => import('./components/carrier-dashboard/carrier-profile/CarrierProfilePage'));
const CarrierPaymentsPage = lazy(() => import('./components/carrier-dashboard/carrier-payments/CarrierPaymentsPage'));
const CarrierLoads = lazy(() => import('./components/carrier-dashboard/carrier-loads-page/CarrierLoads'));
const DriverProfile = lazy(() => import('./components/driver-dashboard/driver-details/DriverProfile'));
const DriverAssignedLoads = lazy(() => import('./components/driver-dashboard/driver-assigned-loads-page/DriverAssignedLoads'));
const ShipperLoadPage = lazy(() => import('./components/shipper-dashboard-page/shipper-load/ShipperLoadPage'));
const SuccessPaymentPage = lazy(() => import('./pages/success-payment/SuccessPaymentPage'));
const FailedPaymentPage = lazy(() => import('./pages/failed-payment/FailedPaymentPage'));
const DriverAssignedLoad = lazy(() => import('./components/driver-dashboard/driver-assigned-load/DriverAssignedLoad'));
const SuccessLoadDelivering = lazy(() => import('./pages/success-load-delivering/SuccessLoadDelivering'));
const DistanceCalculator = lazy(() => import('./components/distance-calculator/DistanceCalculator'));
const LandingPageNew = lazy(() => import('./components/landing-page-new/LandingPageNew'));
const OpenPage = lazy(() => import('./pages/open-page/OpenPage'));
const ShipPage = lazy(() => import('./pages/ship-page/ShipPage'));
const AIPage = lazy(() => import('./pages/ai-page/AIPage'));
const SafetyPage = lazy(() => import('./pages/safety-page/SafetyPage'));
const PartnersPage = lazy(() => import('./pages/partners-page/PartnersPage'));
const BlogPage = lazy(() => import('./pages/blog/BlogPage'));
const AboutPage = lazy(() => import('./pages/about/AboutPage'));
const VehicleLoad = lazy(() => import('./pages/vehicle-load-page/VehicleLoad'));
const MovingLoad = lazy(() => import('./pages/moving-load/MovingLoad'));
const HeavyEquipmentLoad = lazy(() => import('./pages/heavy-equipment-load/HeavyEquipmentLoad'));
const FreightLoad = lazy(() => import('./pages/freight-load/FreightLoad'));
const UserAgreement = lazy(() => import('./pages/user-agreement/UserAgreement'));
const LeadGenerate = lazy(() => import('./pages/lead-generate/LeadGenerate'));
const TimeSchedule = lazy(() => import('./pages/time-schedule/TimeSchedule'));
const TermsAndConditions = lazy(() => import('./pages/terms-and-conditions/TermsAndConditions'));
const WhyChooseUs = lazy(() => import('./pages/why-choose-us/WhyChooseUsPage'));
const PricingDirects = lazy(() => import('./pages/pricing-directs/PricingDirects'));
const ProjectManagement = lazy(() => import('./pages/project-management/ProjectManagement'));
const CookiePolicy = lazy(() => import('./pages/cookie-policy/CookiePolicy'));
const PrivacyPolicy = lazy(() => import('./pages/privacy-policy/PrivacyPolicy'));
const ContactUs = lazy(() => import('./pages/contanct-us/ContactUs'));

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/shipper-dashboard/:shipperID" element={<ShipperDashboard />} />
                    <Route path="/shipper-dashboard/:shipperID/:aiChatID" element={<ShipperDashboard />} />
                    <Route path="/shipper-loads/:shipperID" element={<ShipperLoadsPage />} />
                    <Route path="/shipper-chat-conversation/:shipperID" element={<ShipperChatPage />} />
                    <Route path="/customer-deal-chat-conversation/:shipperID" element={<ShipperChatPage />} />
                    <Route path="/customer-deal-chat-conversation/:shipperID/:chatID" element={<ShipperChatPage />} />
                    <Route path="/shipper-qoutes/:shipperID" element={<ShipperBidsPage />} />
                    <Route path="/shipper-payments/:shipperID" element={<ShipperPaymentsPage />} />
                    <Route path="/shipper-profile/:shipperID" element={<ShipperProfilePage />} />
                    <Route path="/shipper-settings/:shipperID" element={<ShipperSettings />} />
                    <Route path="/shipper-load/:shipperID/:loadCredentialID" element={<ShipperLoadPage />} />

                    <Route path="/carrier-dashboard/:carrierID" element={<CarrierDashboard />} />
                    <Route path="/carrier-take-loads/:carrierID" element={<CarrierTakeLoad />} />
                    <Route path="/carrier-loads/:carrierID" element={<CarrierLoads />} />
                    <Route path="/carrier-settings/:carrierID" element={<CarrierSettings />} />
                    <Route path="/carrier-profile/:carrierID" element={<CarrierProfilePage />} />
                    <Route path="/carrier-payments/:carrierID" element={<CarrierPaymentsPage />} />
                    <Route path="/carrier-drivers/:carrierID" element={<CarrierDrivers />} />
                    <Route path="/carrier-chat-conversation/:carrierID" element={<CarrierChatPage />} />

                    <Route path="/driver-dashboard/:driverID" element={<DriverDashboard />} />
                    <Route path="/driver-settings/:driverID" element={<DriverSettings />} />
                    <Route path="/driver-assigned-loads/:driverID" element={<DriverAssignedLoads />} />
                    <Route path="/driver-profile/:driverID" element={<DriverProfile />} />
                    <Route path="/driver-assigned-load/:driverID/:loadID" element={<DriverAssignedLoad />} />

                    <Route path="/bids-page/:personalEndpoint" element={<ShipperBidsPage />} />
                    <Route path="/distance-calculator" element={<DistanceCalculator />} />

                    <Route path="/open-page" element={<OpenPage />} />
                    <Route path="/ship-page" element={<ShipPage />} />
                    <Route path="/user-agreement" element={<UserAgreement />} />
                    <Route path="/ai-page" element={<AIPage />} />
                    <Route path="/safety-page" element={<SafetyPage />} />
                    <Route path="/partners-page" element={<PartnersPage />} />
                    <Route path="/blog-page" element={<BlogPage />} />
                    <Route path="/about-page" element={<AboutPage />} />
                    <Route path="/vehicle-load" element={<VehicleLoad />} />
                    <Route path="/moving-load" element={<MovingLoad />} />
                    <Route path="/construction-load" element={<HeavyEquipmentLoad />} />
                    <Route path="/freight-load" element={<FreightLoad />} />
                    <Route path="/lead-generate" element={<LeadGenerate />} />
                    <Route path="/time-schedule" element={<TimeSchedule />} />
                    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                    <Route path="/why-choose-us" element={<WhyChooseUs />} />
                    <Route path="/pricing-directs" element={<PricingDirects />} />
                    <Route path="/project-management" element={<ProjectManagement />} />
                    <Route path="/cookie-policy" element={<CookiePolicy />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/contact-us" element={<ContactUs />} />

                    <Route path="/carrier-deal-chat-conversation/:carrierID/:chatID" element={<CarrierChatPage />} />
                    <Route path="/sign-up-carrier" element={<SignUpFormCarrier />} />
                    <Route path="/sign-up-shipper" element={<SignUpForm />} />
                    <Route path="/sign-up" element={<ChoosingRolePage />} />
                    <Route path="/sign-in" element={<LoginForm />} />
                    <Route path="/old-landing" element={<LandingPage />} />
                    <Route path="/" element={<LandingPageNew />} />
                    <Route path="/payment-success/:shipperID/:chatID" element={<SuccessPaymentPage />} />
                    <Route path="/load-delivered-success/:driverID" element={<SuccessLoadDelivering />} />
                    <Route path="/payment-failed/:shipperID" element={<FailedPaymentPage />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;