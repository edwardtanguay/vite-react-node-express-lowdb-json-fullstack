import { Router } from 'express';
import * as flashcardHandler from '../handlers/flashcardHandlers';
import { IFlashcard, INewFlashcard, IPatchFlashcard } from '../../interfaces';

export const flashcardRouter = Router();

flashcardRouter.get('/', (_req, res) => {
	res.json(flashcardHandler.getAllFlashcards());
});

flashcardRouter.get('/:suuid', (req, res) => {
	const suuid = req.params.suuid;
	const flashcard: IFlashcard | null = flashcardHandler.getOneFlashcard(suuid);
	if (flashcard) {
		res.json(flashcard);
	} else {
		res.status(404).json({
			message: `Flashcard with suuid "${suuid}" was not found.`
		})
	}
});

flashcardRouter.post('/', async (req, res) => {
	const newFlashcard: INewFlashcard = req.body;
	const createdFlashcard = await flashcardHandler.createFlashcard(newFlashcard);
	res.json(createdFlashcard);
});

flashcardRouter.put('/:suuid', async (req, res) => {
	const suuid = req.params.suuid;
	const newFlashcard: INewFlashcard = req.body;
	const replacedFlashcard = await flashcardHandler.replaceFlashcard(suuid, newFlashcard);
	if (replacedFlashcard) {
		res.json(replacedFlashcard);
	} else {
		res.status(404).json({
			message: `Flashcard with suuid "${suuid}" was not found.`
		})
	}
});

flashcardRouter.patch('/:suuid', async (req, res) => {
	const suuid = req.params.suuid;
	const patchFlashcard: IPatchFlashcard = req.body;
	const patchedFlashcard = await flashcardHandler.replaceSomeFieldsInFlashcard(suuid, patchFlashcard);
	if (patchedFlashcard) {
		res.json(patchedFlashcard);
	} else {
		res.status(404).json({
			message: `Flashcard with suuid "${suuid}" was not found.`
		})
	}
});

flashcardRouter.delete('/:suuid', async (req, res) => {
	const suuid = req.params.suuid;
	const deletedFlashcard = await flashcardHandler.deleteFlashcard(suuid);
	if (deletedFlashcard) {
		res.json(deletedFlashcard);
	} else {
		res.status(404).json({
			message: `Flashcard with suuid "${suuid}" was not found.`
		})
	}
});