import { z } from "zod";

export const NewFlashcardSchema = z.object({
	category: z.string(),
	front: z.string(),
	back: z.string(),
});

export type NewFlashcard = z.infer<typeof NewFlashcardSchema>;

export const FlashcardSchema = NewFlashcardSchema.extend({
	suuid: z.string(),
});

export const FrontendFlashcardSchema = FlashcardSchema.extend({
	isOpen: z.boolean(),
});

export type Flashcard = z.infer<typeof FlashcardSchema>;
export type FrontendFlashcard = z.infer<typeof FrontendFlashcardSchema>;

export const PatchFlashcardSchema = NewFlashcardSchema.partial();

export type PatchFlashcard = z.infer<typeof PatchFlashcardSchema>;

export const DatabaseSchema = z.object({
	flashcards: z.array(FlashcardSchema),
});

export type Database = {
	flashcards: Flashcard[];
};
