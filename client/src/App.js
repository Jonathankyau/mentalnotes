import React from 'react';
import { useEffect, useState } from "react";
import Signin from './pages/Signin/Signin';
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/showNav/showNav.js';
import Header from "./components/navBar";
import ProtectedRoute from "./components/protectedRoute.js";
import NotFound from "./pages/NotFound/NotFound";
import ForceRedirect from "./components/forceRedirect";
import Footer from "./components/footer/footer";
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './index.css'
import './styles/mood-map.css'
import useStyles from './styles';

function App() {
  const classes = useStyles();

  const [isConnected, setIsconnected] = useState(false);

  const checkUserToken = () => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user-token"));
      if (user) {
        setIsconnected(true);
      } else {
        setIsconnected(false);
      }
    }
  };
  useEffect(() => {
    checkUserToken();
  }, [isConnected]);

  const Logout = () => {
    if (localStorage.getItem("user-token")) {
      localStorage.clear();
      setIsconnected(false);
    }
  };
  return (
   
      <BrowserRouter>
      <Nav />
      <div className="bg-white" style={{ height: "100vh" }}>
        <Header Logout={Logout} user={isConnected} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={isConnected}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <ForceRedirect user={isConnected}>
                <Signin />
              </ForceRedirect>
            }
          />
          <Route
            path="/signup"
            element={
              <ForceRedirect user={isConnected}>
                <Signup />
              </ForceRedirect>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
      {/* <div className="App">
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
      </div> */}
    </BrowserRouter>
  )}

export default App;
