import { useTypedStoreState } from "../store/hooks";

export const PageWelcome = () => {
	const { message } = useTypedStoreState((state) => state.mainModel);
	const { flashcards } = useTypedStoreState((state) => state.flashcardModel);

	return (
		<>
			<p>{message}</p>
			<p>
				There are {flashcards.length} flashcards:{" "}
				{flashcards.map((m) => m.suuid).join(", ")}
			</p>
		</>
	);
};
