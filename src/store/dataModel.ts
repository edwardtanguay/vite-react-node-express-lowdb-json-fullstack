import axios from "axios";
import { Flashcard, FlashcardSchema, FrontendFlashcard } from "../../share/types";

export const getFlashcards = async () => {
	return new Promise<Flashcard[]>((resolve, reject) => {
		(async () => {
			try {
				const response = await axios.get(
					"http://localhost:3300/api/flashcards"
				);
				if (response.status === 200) {
					const _rawFlashcards: unknown[] = response.data;
					const _flashcards: Flashcard[] = [];
					for (const _rawFlashcard of _rawFlashcards) {
						const parseResult = FlashcardSchema.safeParse(_rawFlashcard);
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
							_flashcards.push(_frontendFlashcard);
						} else {
							let r = "";
							r += `INVALID FLASHCARD IN IMPORT: ${JSON.stringify(
								_rawFlashcard,
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
					resolve(_flashcards);
				}
			} catch (e: unknown) {
				reject(`ERROR: ${(e as Error).message}`);
			}
		})();
	});
};
