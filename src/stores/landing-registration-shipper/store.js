import create from 'zustand';

const useShipperStore = create((set) => ({
    userShipperID: '',
    registrationStatus: 'pending',
    carrierID: '',

    setUserShipperID: (id) => set({ userShipperID: id }),
    setRegistrationStatus: (status) => set({ registrationStatus: status }),
    setCarrierID: (id) => set({ carrierID: id }), // Add setCarrierID action
}));
export default useShipperStore;