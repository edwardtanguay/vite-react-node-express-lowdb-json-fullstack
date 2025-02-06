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

export type Flashcard = z.infer<typeof FlashcardSchema>;

export const PatchFlashcardSchema = NewFlashcardSchema.partial();

export type PatchFlashcard = z.infer<typeof PatchFlashcardSchema>;

export const DatabaseSchema = z.object({
  flashcards: z.array(FlashcardSchema),
});


export type Database = {
	flashcards: Flashcard[];
};
