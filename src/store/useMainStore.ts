import { create } from 'zustand';
import { BlueSpecialtyCareProviders, CenterOfExcellenceProviders, Provider } from '@/types/ServiceModels';

interface MainState {
  blueSpecialtyCareProviders: BlueSpecialtyCareProviders[];
  centerOfExcellenceProviders: CenterOfExcellenceProviders[];
  loading: boolean;
  providerList: Provider[];
  selectedProviderType: string;
  sessionToken: string;
  showErrorMessage: boolean;
  showSuccessMessage: boolean;
}

interface MainActions {
  setBlueSpecialtyCareProviders: (providers: BlueSpecialtyCareProviders[]) => void;
  setCenterOfExcellenceProviders: (providers: CenterOfExcellenceProviders[]) => void;
  setLoading: (loading: boolean) => void;
  setProviderList: (providers: Provider[]) => void;
  setSelectedProviderType: (type: string) => void;
  setSessionToken: (token: string) => void;
  setShowErrorMessage: (show: boolean) => void;
  setShowSuccessMessage: (show: boolean) => void;
  resetStore: () => void;
}

type MainStore = MainState & MainActions;

const initialState: MainState = {
  blueSpecialtyCareProviders: [],
  centerOfExcellenceProviders: [],
  loading: false,
  providerList: [],
  selectedProviderType: '',
  sessionToken: '',
  showErrorMessage: false,
  showSuccessMessage: false,
};

export const useMainStore = create<MainStore>((set) => ({
  ...initialState,

  setBlueSpecialtyCareProviders: (providers) =>
    set({ blueSpecialtyCareProviders: providers }),

  setCenterOfExcellenceProviders: (providers) =>
    set({ centerOfExcellenceProviders: providers }),

  setLoading: (loading) =>
    set({ loading }),

  setProviderList: (providers) =>
    set({ providerList: providers }),

  setSelectedProviderType: (type) =>
    set({ selectedProviderType: type }),

  setSessionToken: (token) =>
    set({ sessionToken: token }),

  setShowErrorMessage: (show) =>
    set({ showErrorMessage: show }),

  setShowSuccessMessage: (show) =>
    set({ showSuccessMessage: show }),

  resetStore: () =>
    set(initialState),
}));
