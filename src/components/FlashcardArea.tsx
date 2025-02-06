import { useTypedStoreState } from "../store/hooks";

export const FlashcardArea = () => {
	const { flashcards } = useTypedStoreState((state) => state.flashcardModel);

	return (
		<div>
			nnnThere are {flashcards.length} flashcards:{" "}
			{flashcards.map((m) => m.suuid).join(", ")}
		</div>
	);
};
