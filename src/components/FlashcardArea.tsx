import { useTypedStoreState } from "../store/hooks";

export const FlashcardArea = () => {
	const { frontendFlashcards } = useTypedStoreState(
		(state) => state.flashcardModel
	);

	return (
		<div>
			<h2 className="text-xl mb-2">
				There are {frontendFlashcards.length} flashcards:{" "}
			</h2>
			{frontendFlashcards.length} flashcards
		</div>
	);
};
