import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const initialTasks = {
  Day1: [false, false, false, false],
  Day2: [false, false, false, false],
  Bonus: [false, false, false, false, false, false, false, false],
};

const initialCards = [];

export function AppProvider({ children }) {
  // localStorage key 名稱
  const STORAGE_KEYS = {
    watermelon: 'watermelon',
    tasks: 'tasks',
    caughtCount: 'caughtCount',
    cards: 'cards',
    bag: 'bag',
  };

  // 1. 初始化時讀取 localStorage
  const [watermelon, setWatermelon] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.watermelon);
    return saved !== null ? JSON.parse(saved) : 0;
  });
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.tasks);
    return saved !== null ? JSON.parse(saved) : initialTasks;
  });
  const [caughtCount, setCaughtCount] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.caughtCount);
    return saved !== null ? JSON.parse(saved) : 0;
  });
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.cards);
    return saved !== null ? JSON.parse(saved) : initialCards;
  });
  const [bag, setBag] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.bag);
    return saved !== null ? JSON.parse(saved) : [];
  });

  // 2. 狀態變動時寫入 localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.watermelon, JSON.stringify(watermelon));
  }, [watermelon]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.caughtCount, JSON.stringify(caughtCount));
  }, [caughtCount]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.cards, JSON.stringify(cards));
  }, [cards]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.bag, JSON.stringify(bag));
  }, [bag]);

  // 完成任務
  const completeTask = (group, idx, reward = 1) => {
    if (!tasks[group][idx]) {
      const newTasks = { ...tasks };
      newTasks[group] = [...newTasks[group]];
      newTasks[group][idx] = true;
      setTasks(newTasks);
      setWatermelon(w => w + reward);
    }
  };

  // 誘捕豚豚（抽卡）
  const catchPig = (newCards) => {
    setCards(prev => {
      const merged = [...prev];
      newCards.forEach(card => {
        if (!merged.includes(card)) merged.push(card);
      });
      return merged;
    });
  };

  return (
    <AppContext.Provider value={{
      watermelon,
      setWatermelon,
      tasks,
      completeTask,
      caughtCount,
      setCaughtCount,
      cards,
      catchPig,
      bag,
      setBag,
    }}>
      {children}
    </AppContext.Provider>
  );
} 