import express from 'express'
import { getNotes, createNote, deleteNote } from '../controllers/note.js';
// import note from '../models/note.js';
const router = express.Router();

router.get('/', getNotes);
// router.get('/', (req, res) => {
//     res.send('Router is working')
// })
router.post('/', createNote);
router.delete('/:id', deleteNote);

export default router;