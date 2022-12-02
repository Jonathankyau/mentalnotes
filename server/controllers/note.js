import NoteData from '../models/Note.js';

export const getNotes = async (req, res) => {
    try {
        const allNotes = await NoteData.find();
        console.log("It's working")
        res.status(200).json(allNotes);

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

 export const createNote = async (req, res) => {
    const note = req.body;

    const newNote = new NoteData(note); // Model(variable)

    try {
        await newNote.save();
        res.status(201).json(newNote); // 201 successful status response meaning request succeeded
    } catch (error) {
        res.status(409).json({ message: error.message }) //409 means conflictif there's no student data
    }
}

export const deleteNote = async (req, res) => {
    const id = req.params.id;

    try {
        await NoteData.findByIdAndRemove(id).exec();
        res.send('Successfully Deleted')
    } catch (error) {
        console.log(error);
    }
}
