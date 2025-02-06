import { FrontendFlashcard } from "../../share/types";
import { useTypedStoreActions, useTypedStoreState } from "../store/hooks";

export const FlashcardArea = () => {
	const { frontendFlashcards } = useTypedStoreState(
		(state) => state.flashcardModel
	);
	const { saveFrontendFlashcard } = useTypedStoreActions(
		(actions) => actions.flashcardModel
	);

	const handleToggleFrontendFlashcard = (
		frontendFlashcard: FrontendFlashcard
	) => {
		frontendFlashcard.isOpen = !frontendFlashcard.isOpen;
		saveFrontendFlashcard(frontendFlashcard);
	};

	return (
		<div>
			<h2 className="text-xl mb-3">
				There are {frontendFlashcards.length} flashcards:{" "}
			</h2>
			{frontendFlashcards.map((ff) => {
				return (
					<div className="mb-4">
						<div
							className="bg-slate-600 text-slate-200 p-2 rounded-t cursor-pointer"
							onClick={() => handleToggleFrontendFlashcard(ff)}
						>
							{ff.front}
						</div>
						{ff.isOpen && (
							<div className="bg-slate-300 p-2 rounded-b font-mono text-orange-800 text-sm">
								{ff.back}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
};
