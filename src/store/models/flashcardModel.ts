import { action, Action, thunk, Thunk } from "easy-peasy";
import { FrontendFlashcard } from "../../../share/types";
import * as dataModel from "../dataModel";
import { StoreModel } from "../store";

export interface FlashcardModel {
	// state
	frontendFlashcards: FrontendFlashcard[];

	// actions
	setFrontendFlashcards: Action<this, FrontendFlashcard[]>;
	saveFrontendFlashcard: Action<this, FrontendFlashcard>;
	deleteFrontendFlashcard: Action<this, FrontendFlashcard>;

	// thunks
	loadFlashcardsThunk: Thunk<this>;
	toggleFrontendFlashcardThunk: Thunk<this, FrontendFlashcard>;
	deleteFlashcardFromDatasourceThunk: Thunk<
		this,
		FrontendFlashcard,
		void,
		StoreModel
	>;
}

export const flashcardModel: FlashcardModel = {
	// state
	frontendFlashcards: [],

	// actions
	setFrontendFlashcards: action((state, flashcards) => {
		state.frontendFlashcards = structuredClone(flashcards);
	}),
	saveFrontendFlashcard: action((state, frontendFlashcard) => {
		const index = state.frontendFlashcards.findIndex(
			(s) => s.suuid === frontendFlashcard.suuid
		);
		if (index !== -1) {
			state.frontendFlashcards[index] =
				structuredClone(frontendFlashcard);
		}
	}),
	deleteFrontendFlashcard: action((state, frontendFlashcard) => {
		const index = state.frontendFlashcards.findIndex(
			(s) => s.suuid === frontendFlashcard.suuid
		);
		if (index !== -1) {
			state.frontendFlashcards.splice(index, 1);
		}
	}),

	// thunks
	loadFlashcardsThunk: thunk((actions) => {
		(async () => {
			const _frontendFlashcards = await dataModel.getFlashcards();
			actions.setFrontendFlashcards(_frontendFlashcards);
		})();
	}),
	toggleFrontendFlashcardThunk: thunk((actions, frontendFlashcard) => {
		frontendFlashcard.isOpen = !frontendFlashcard.isOpen;
		actions.saveFrontendFlashcard(frontendFlashcard);
	}),
	deleteFlashcardFromDatasourceThunk: thunk(
		async (actions, frontendFlashcard, helpers) => {
			try {
				const dataModelResponse = await dataModel.deleteFlashcard(
					frontendFlashcard.suuid
				);
				if (dataModelResponse.success) {
					helpers
						.getStoreActions()
						.mainModel.setMessage(dataModelResponse.message);
					actions.deleteFrontendFlashcard(frontendFlashcard);
				} else {
					helpers
						.getStoreActions()
						.mainModel.setMessage(dataModelResponse.message);
					console.log(dataModelResponse.message);
				}
			} catch (e: unknown) {
					helpers.getStoreActions().mainModel.setMessage(`ERROR: flashcard ${frontendFlashcard.suuid} could not be deleted`);
				console.error((e as Error).message, e);
			}
		}
	),
};
