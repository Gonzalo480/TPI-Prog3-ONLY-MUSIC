import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Albums from './components/MusicPlayer/Albums';
import Genres from './components/MusicPlayer/Genres';
import UpdateSongForm from './components/UpdateSongForm';
import SongUser from './components/SongUser';
import SearchResults from './components/SearchResults';
import UpdateProfileForm from './components/UpdateProfileForm';

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <div className="App">
        <NavBar />
        <SideBar />
        <Routes>
          <Route path="/" element={token ? <SongUser /> : <Error />} />
          <Route path="/songsuser" element={<SongUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/new" element={<NewSongForm />} />
          <Route path="/update/:id" element={<UpdateSongForm />} />
          <Route path="/songs" element={<SongList />} />
          <Route path="/song/:id" element={<SongDetail />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/updateprofile/:userId" element={<UpdateProfileForm />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <FooterBar />
      </div>
    </Router>
  );
}

export default App;