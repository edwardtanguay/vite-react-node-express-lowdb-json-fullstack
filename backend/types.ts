export type NewFlashcard = {
	category: string;
	front: string;
	back: string;
};

export type Flashcard = NewFlashcard & {
	suuid: string;
};

export type PatchFlashcard = Partial<NewFlashcard>;

export type Database = {
	flashcards: Flashcard[];
};
