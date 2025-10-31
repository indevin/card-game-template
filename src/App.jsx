import React, { useState } from 'react';
import Header from './components/Header';
import TabBar from './components/TabBar';
import TaskPage from './pages/TaskPage';
import ArrestPage from './pages/ArrestPage';
import BookPage from './pages/BookPage';
import './App.css';

function App() {
  const [tab, setTab] = useState('task');

  return (
    <div className="app-bg">
      <Header />
      <main className="main-content">
        {tab === 'task' && <TaskPage />}
        {tab === 'arrest' && <ArrestPage />}
        {tab === 'book' && <BookPage />}
      </main>
      <TabBar tab={tab} setTab={setTab} />
    </div>
  );
}

export default App; 