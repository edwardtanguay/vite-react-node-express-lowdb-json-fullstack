import { thunk, Thunk } from "easy-peasy";
import { StoreModel } from "../store";

export interface MainModel {
	// state
	message: string;

	// thunks
	initialize: Thunk<this, void, void, StoreModel>;
}

export const mainModel: MainModel = {
	// state
	message: 'This is the welcome page.',

	// thunks
	initialize: thunk((_, __, { getStoreActions }) => {
		getStoreActions().flashcardModel.loadFlashcardsThunk()
	}),
};
