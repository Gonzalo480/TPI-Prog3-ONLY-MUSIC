import { useState } from 'react'
import Login from "./components/Auth/Login";
import Profile from "./components/Auth/Profile";
import NavBar from "./components/NavBar";
import FooterBar from "./components/FooterBar";
import SideBar from "./components/SideBar";
import React from "react";
import SongList from './components/SongList';
import NewSongForm from './components/NewSongForm';
import Error from './components/Error';
import SongDetail from './components/SongDetail';



function App() {
   const token = localStorage.getItem("token");
   switch (window.location.pathname) {
      case "/":
         return (
            <div className="App">
              {token ? <> <NavBar /> <SideBar />  <SongList /> <FooterBar /> </> : <> <NavBar /> <SideBar /> <Error /> <FooterBar /> </> }
            </div>
          );

        case "/login":
           return <> <NavBar /> <SideBar /> <Login /> <FooterBar /> </>;
        case "/profile":
           return <> <NavBar /> <SideBar /> <Profile /> <FooterBar /> </>;

        case "/new" :
           return <> <NavBar /> <SideBar /> <NewSongForm />  <FooterBar /> </>;

         case `/song/${window.location.pathname.split("/")[2]}`:
            const id = window.location.pathname.split("/")[2];
            return <> <NavBar /> <SideBar />  <SongDetail id={id} /> <FooterBar /> </>;

        default:
          return  <> <NavBar /> <SideBar /> <Error /> <FooterBar /> </>;
  }
}

export default App;