import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';





export default function ShowNote() {

    const [notesList, setNoteList] = useState([])

    const deleteNote = (id) => {
        axios.delete(`http://localhost:3000/`).then(() => {
            window.location.reload(false);
        })
    }
    useEffect(() => {
        axios.get('http://localhost:2121/notes').then((allNotes) => {
            setNoteList(allNotes.data);
        })
    }, [])
  return (
      <>
      <h2>Your Notes</h2>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Overall Mood</TableCell>
            <TableCell align="right">Reasons & Symptoms</TableCell>
            <TableCell align="right">Goals & Solutions</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notesList.map((note, key) => (
            <TableRow key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{note.date}</TableCell>
              <TableCell align="right">{note.mood}</TableCell>
              <TableCell align="right">{note.symptoms}</TableCell>
              <TableCell align="right">{note.solutions}</TableCell>
              <TableCell align="right">
              <Button variant="contained" color="primary" onClick={() => deleteNote(note._id)}>
                Delete
              </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
