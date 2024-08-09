import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Login from '../components/Auth/Login';
import Profile from '../components/Auth/Profile';
import Albums from '../components/MusicPlayer/Albums';
import Genres from '../components/MusicPlayer/Genres';
import Artist from '../components/MusicPlayer/Artists';
import NewSongForm from '../components/NewSongForm';
import SongList from '../components/SongList';
import SongDetail from '../components/SongDetail';
import Error from '../components/Error';
import ProtectedRoute from './ProtectedRoute';
import SongUser from '../components/SongUser';
import SearchResults from '../components/SearchResults';
import UpdateProfileForm from '../components/UpdateProfileForm';
import Inicio from '../components/Inicio';
import UpdateSongForm from '../components/UpdateSongForm';
import Contact from '../components/Contact';
import NewAlbumForm from '../components/NewAlbumForm';
import NewArtistForm from '../components/NewArtistForm';
import NewGenreForm from '../components/NewGenreForm';
import NewPlaylistForm from '../components/NewPlaylistForm';
import UpdateAlbumForm from '../components/UpdateAlbumForm';
import RecommendedSongs from '../components/RecommendedSongs';
import Slider from '../components/Slider';
import UserAlbums from '../components/UserAlbums';
import PlaylistList from '../components/MusicPlayer/PlaylistList';
import UpdatePlaylistForm from '../components/UpdatePlaylistForm';
import PlaylistDetail from '../components/PlaylistDetail';
import ProfileViewer from '../components/ProfileViewer';
import UpdateArtistForm from '../components/UpdateArtistForm';


const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route
        path="/"
        element={localStorage.getItem("token") ? <> <Slider /> <RecommendedSongs /> <SongUser /> </> : <Inicio />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/artist" element={<Artist />} />
      <Route path="/albums" element={<Albums />} />
      <Route path="/genres" element={<Genres />} />
      <Route path="/new" element={<NewSongForm />} />
      <Route path="/newalbum" element={<NewAlbumForm />} />
      <Route path="/newartist" element={<NewArtistForm />} />
      <Route path="/newgenre" element={<NewGenreForm />} />
      <Route path="/newplaylist" element={<NewPlaylistForm />} />
      <Route path="/songs" element={<SongList />} />
      <Route path="/song/:id" element={<SongDetail />} />
      <Route path="/songuser" element={<SongUser />} />
      <Route path="/albumsguser" element={<UserAlbums />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/playlists" element={<PlaylistList />} />
      <Route path="/playlists/:id" element={<PlaylistDetail />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/updatealbum/:id" element={<UpdateAlbumForm />} />
      <Route path="/updateartist/:id" element={<UpdateArtistForm />} />
      <Route path="/update/:id" element={<UpdateSongForm />} />
      <Route path="/viewerprofile/:id" element={<ProfileViewer/>} />
      <Route path="/updateplaylist/:id" element={<UpdatePlaylistForm />} />
      <Route path="/updateprofile/:userId" element={
      <ProtectedRoute>
        <UpdateProfileForm />
      </ProtectedRoute>
      } />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

export { Router };
