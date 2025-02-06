import axios from "axios";
import { FlashcardSchema, FrontendFlashcard } from "../../share/types";

export const getFlashcards = async () => {
	return new Promise<FrontendFlashcard[]>((resolve, reject) => {
		(async () => {
			try {
				const response = await axios.get(
					"http://localhost:3300/api/flashcards"
				);
				if (response.status === 200) {
					const _fetchedFlashcards: unknown[] = response.data;
					const _frontendFlashcards: FrontendFlashcard[] = [];
					for (const _fetchedFlashcard of _fetchedFlashcards) {
						const parseResult = FlashcardSchema.safeParse(_fetchedFlashcard);
						if (parseResult.success) {
							const {suuid, category, front, back} =
								parseResult.data;
							const _frontendFlashcard: FrontendFlashcard = {
								suuid: suuid.trim(),
								category: category.trim(),
								front: front.trim(),
								back: back.trim(),
								isOpen: false
							};
							_frontendFlashcards.push(_frontendFlashcard);
						} else {
							let r = "";
							r += `INVALID FLASHCARD IN IMPORT: ${JSON.stringify(
								_fetchedFlashcard,
								null,
								2
							)}\n`;
							parseResult.error.errors.forEach((err) => {
								r += `Error in field "${err.path.join(
									"."
								)}" - ${err.message}\n`;
							});
							console.error(r);
						}
					}
					resolve(_frontendFlashcards);
				}
			} catch (e: unknown) {
				reject(`ERROR: ${(e as Error).message}`);
			}
		})();
	});
};
