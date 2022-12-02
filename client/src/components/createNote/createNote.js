import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';


export default function CreateNote() {

    const [note, setNote] = useState({
        date: 0,
        mood: '',
        symptoms: '',
        solutions: ''
    })

    const createNote = () => {
        axios.post('http://localhost:3000/notes', note).then(() => {
            window.location.reload(false);
        })
    }
  return (
    <>
    <h2>Mental Check-In</h2>
    <Box
      component="form"
      sx={{
        '& > *': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Date" variant="outlined" value={note.date} onChange={(event) => {
      setNote({ ...note, date: event.target.value})
        }} />
      <TextField id="outlined-basic" label="Overall Mood" variant="outlined" value={note.mood} onChange={(event) => {
      setNote({ ...note, mood: event.target.value})
      }}/>
      <TextField id="outlined-basic" label="Reasons & Symptoms" variant="outlined" value={note.symptoms} onChange={(event) => {
      setNote({ ...note, symptoms: event.target.value})
      }}/>
      <TextField id="outlined-basic" label="Goals & Solutions" variant="outlined" value={note.solutions} onChange={(event) => {
      setNote({ ...note, solutions: event.target.value})
      }}/>
      <Button variant="contained" color="primary" onClick={createNote}>Post</Button>
    </Box>
    </>
  );
}
