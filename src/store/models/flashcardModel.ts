import { action, Action, thunk, Thunk } from "easy-peasy";
import { Flashcard } from "../../../share/types";
import * as dataModel from "../dataModel";

export interface FlashcardModel {
	// state
	flashcards: Flashcard[];

	// actions
	setFlashcards: Action<this, Flashcard[]>;

	// thunks
	loadFlashcardsThunk: Thunk<this>;
}

export const flashcardModel: FlashcardModel = {
	// state
	flashcards: [],

	// actions
	setFlashcards: action((state, flashcards) => {
		state.flashcards = structuredClone(flashcards);
	}),

	// thunks
	loadFlashcardsThunk: thunk((actions) => {
		(async () => {
			const _flashcards = await dataModel.getFlashcards();
			actions.setFlashcards(_flashcards);
		})();
	}),
};
