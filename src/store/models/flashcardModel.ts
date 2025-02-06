import { action, Action, thunk, Thunk } from "easy-peasy";
import { FrontendFlashcard } from "../../../share/types";
import * as dataModel from "../dataModel";

export interface FlashcardModel {
	// state
	frontendFlashcards: FrontendFlashcard[];

	// actions
	setFrontendFlashcards: Action<this, FrontendFlashcard[]>;
	saveFrontendFlashcard: Action<this, FrontendFlashcard>;

	// thunks
	loadFlashcardsThunk: Thunk<this>;
	toggleFrontendFlashcard: Thunk<this, FrontendFlashcard>;
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

	// thunks
	loadFlashcardsThunk: thunk((actions) => {
		(async () => {
			const _frontendFlashcards = await dataModel.getFlashcards();
			actions.setFrontendFlashcards(_frontendFlashcards);
		})();
	}),
	toggleFrontendFlashcard: thunk((actions, frontendFlashcard) => {
		frontendFlashcard.isOpen = !frontendFlashcard.isOpen;
		actions.saveFrontendFlashcard(frontendFlashcard);
	}),
};
