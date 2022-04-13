import React, { Suspense } from 'react';
import MainNavbar from './components/MainNavbar';
import MainContent from './components/MainContent';
import LoadingPage from './components/LoadingPage';
import { Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <MainNavbar />
      <MainContent />
    </>
  );
}

export default App;
