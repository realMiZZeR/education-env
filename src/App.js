import React, { useRef } from 'react';
import MainNavbar from './components/MainNavbar';
import { MainContent } from './components/MainContent';
import { AuthProvider } from './hoc/AuthProvider';

const App = () => {

  // for mobile navbar with hamburger
  const navbarRef = useRef(null);
  const navbarRefHandler = () => {
    const elem = navbarRef.current;
    const classNames = elem.className;

    elem.className = `${classNames} ${classNames}_show`;
  }

  return (
    <AuthProvider>
      <MainNavbar ref={navbarRef} />
      <MainContent refHandler={navbarRefHandler} />
    </AuthProvider>
  );
}

export default App;
