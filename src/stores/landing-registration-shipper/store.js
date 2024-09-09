import create from 'zustand';

const useShipperStore = create((set) => ({
    userShipperID: '',
    registrationStatus: 'pending',

    setUserShipperID: (id) => set({ userShipperID: id }),
    setRegistrationStatus: (status) => set({ registrationStatus: status }),
}));

export default useShipperStore;