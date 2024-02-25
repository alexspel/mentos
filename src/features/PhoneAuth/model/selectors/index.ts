import { StateSchema } from "app/providers/StoreProvider/config/schema";
import { ConfirmationResult } from "firebase/auth";

export const getConfirmation = (state: StateSchema): ConfirmationResult | undefined => state.phoneAuth?.confirmation;
export const getLoading = (state: StateSchema): boolean => state.phoneAuth?.loading;
export const getPhone = (state: StateSchema): string => state.phoneAuth.phone;
export const getPin = (state: StateSchema): string => state.phoneAuth.pin;
