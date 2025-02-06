import { action, Action, thunk, Thunk } from "easy-peasy";
import { FrontendFlashcard } from "../../../share/types";
import * as dataModel from "../dataModel";

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
	deleteFlashcardFromDatasourceThunk: Thunk<this, FrontendFlashcard>;
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
		async (actions, frontendFlashcard) => {
			try {
				const dataModelResponse = await dataModel.deleteFlashcard(
					frontendFlashcard.suuid
				);
				if (dataModelResponse.success) {
					actions.deleteFrontendFlashcard(frontendFlashcard);
					console.log(dataModelResponse.message);
				} else {
					console.error(dataModelResponse.message);
					// display message to user
				}
			} catch (e: unknown) {
				console.error((e as Error).message);
			}
		}
	),
};
