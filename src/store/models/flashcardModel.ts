import { action, Action, thunk, Thunk } from "easy-peasy";
import { FrontendFlashcard } from "../../../share/types";
import * as dataModel from "../dataModel";
import axios from "axios";

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
	deleteFlashcardFromDatasourceThunk: thunk((actions, frontendFlashcard) => {
		try {
			(async () => {
				const response = await axios.delete(
					`http://localhost:3300/api/flashcards/${frontendFlashcard.suuid}`
				);

				if (response.status === 200) {
					actions.deleteFrontendFlashcard(frontendFlashcard);
					console.log(`flashcard ${frontendFlashcard.suuid} deleted successfully`);
				} else {
					console.error(`failed to delete flashcard ${frontendFlashcard.suuid}`);
				}
			})();
		} catch (error) {
			console.error(`Error deleting flashcard ${frontendFlashcard.suuid}:`, error);
		}
	}),
};
