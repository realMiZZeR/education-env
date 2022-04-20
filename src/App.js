import React, { Suspense } from 'react';
import MainNavbar from './components/MainNavbar';
import MainContent from './components/MainContent';
import LoadingPage from './components/LoadingPage';
import { Routes } from 'react-router-dom';
import { AuthProvider } from './hoc/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <MainNavbar />
      <MainContent />
    </AuthProvider>
  );
}

export default App;
