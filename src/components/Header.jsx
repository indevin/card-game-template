import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './Header.css';

function Header() {
  const { watermelon } = useContext(AppContext);
  return (
    <header className="header">
      <img src="/images/title.png" alt="title" className="header-title-img" />
      <div className="header-title">豚豚抵嘉</div>
      <div className="header-watermelon">
        <img src="/images/watermelon.png" alt="镼踹" className="header-watermelon-icon" />
        <span className="header-watermelon-count">{watermelon}</span>
      </div>
    </header>
  );
}

export default Header; 