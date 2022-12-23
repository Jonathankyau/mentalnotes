import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import Note from '../.././components/showNote/showNote.js';
import Create from '../.././components/createNote/createNote.js';
import Calendar from '../.././components/showCalendar/showCalendar.js';
import "./Profile.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
      <div className="App">
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
      <div className="card p-4">
        <div className=" image d-flex flex-column justify-content-center align-items-center">
          <button className="btn btn-secondary">
            {" "}
            <img src={user.image} alt="user face" height="100" width="100" />
          </button>
          <span className="name mt-3">{user.name}</span>{" "}
           <div className="d-flex flex-row justify-content-center align-items-center gap-2"></div>
          <div className="d-flex flex-row justify-content-center align-items-center mt-3">
            <span className="number">
              e-mail 📧 : <span className="follow">{user.email}</span>
            </span>{" "}
          </div>
          <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
            <span>
              <i className="fab fa-twitter"></i>
            </span>{" "}
            <span>
              <i className="fab fa-facebook-f"></i>
            </span>
            <span>
              <i className="fab fa-instagram"></i>
            </span>{" "}
            <span>
              <i className="fab fa-linkedin"></i>
            </span>{" "}
          </div>
          <div className=" px-2 rounded mt-4 date ">
            {" "}
            <span className="join">{new Date().getFullYear()}</span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;