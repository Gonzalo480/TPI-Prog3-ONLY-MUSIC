import { useState } from 'react'
import Login from "./components/Auth/Login";
import Profile from "./components/Auth/Profile";
import NavBar from "./components/NavBar";
import FooterBar from "./components/FooterBar";
import ProfileUpdate from './components/ProfileUpdate';

function App() {
    switch (window.location.pathname) {
        case "/login":
           return <Login />;
        case "/profile":
           return <>
           <NavBar /> <Profile /> <FooterBar /> </>;
        default:
          return <Login />;
  }
}

export default App;