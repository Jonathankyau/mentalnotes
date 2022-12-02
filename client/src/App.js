import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import Note from './components/showNote/showNote.js';
import Create from './components/createNote/createNote.js';
import Calendar from './components/showCalendar/showCalendar.js';
import Nav from './components/showNav/showNav.js';
import './App.css';
import './index.css'
import './styles/mood-map.css'
import useStyles from './styles';

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Nav />
      <Container maxWidth="lg"> 
        <Grow in>
          <Container>
            <Grid container justify="space-between" alignItems="stretch">
              <Grid item xs={12} sm={10}>
              <AppBar className={classes.appBar} position="static" color="inherit">
                  <Calendar />
                </AppBar>
              </Grid>
              <Grid item xs={12} sm={5}>
                <AppBar className={classes.appBar} position="static" color="inherit">
                  <Create />
                </AppBar>
              </Grid>
              <Grid item xs={12} sm={10}>
              <AppBar className={classes.appBar} position="static" color="inherit">
                  <Note />
                </AppBar>
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </div>
  )}

export default App;
