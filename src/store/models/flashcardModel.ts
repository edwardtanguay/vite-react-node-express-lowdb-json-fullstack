import { action, Action, thunk, Thunk } from "easy-peasy";
import { Flashcard } from "../../../share/types";

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
		// (async () => {
		// 	const _skills = await dataModel.getSkills();
		// 	actions.setSkills(_skills);
		// })();

		actions.setFlashcards([
			{
				suuid: "mock01",
				category: "git",
				front: "show commit history with hash, title, author",
				back: 'git log --pretty=format:"%h - %s - %an" ',
			},
			{
				suuid: "mock02",
				category: "linux",
				front: "navigate to the home directory",
				back: "cd ~",
			},
		]);
	}),
};
