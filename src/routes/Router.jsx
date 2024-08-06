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

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route
        path="/"
        element={localStorage.getItem("token") ? <SongUser /> : <Inicio />}
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
      <Route path="/songs" element={<SongList />} />
      <Route path="/song/:id" element={<SongDetail />} />
      <Route path="/songuser" element={<SongUser />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/update/:id" element={<UpdateSongForm />} />
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
