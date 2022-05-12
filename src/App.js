import React from 'react';
import MainNavbar from './components/MainNavbar';
import { MainContent } from './components/MainContent';
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
