import { action, Action, thunk, Thunk } from "easy-peasy";
import { FrontendFlashcard } from "../../../share/types";
import * as dataModel from "../dataModel";

export interface FlashcardModel {
	// state
	frontendFlashcards: FrontendFlashcard[];

	// actions
	setFrontendFlashcards: Action<this, FrontendFlashcard[]>;

	// thunks
	loadFlashcardsThunk: Thunk<this>;
}

export const flashcardModel: FlashcardModel = {
	// state
	frontendFlashcards: [],

	// actions
	setFrontendFlashcards: action((state, flashcards) => {
		state.frontendFlashcards = structuredClone(flashcards);
	}),

	// thunks
	loadFlashcardsThunk: thunk((actions) => {
		(async () => {
			const _frontendFlashcards = await dataModel.getFlashcards();
			actions.setFrontendFlashcards(_frontendFlashcards);
		})();
	}),
};
