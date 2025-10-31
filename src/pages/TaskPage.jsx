import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import "./TaskPage.css";

// 任務資料
const TASKS = {
  Day1: [
    { title: "任務一", subtitle: "任務說明", reward: 1 },
    { title: "任務二", subtitle: "任務說明", reward: 1 },
    { title: "任務三", subtitle: "任務說明", reward: 1 },
    { title: "任務四", subtitle: "任務說明", reward: 1 },
  ],
  Day2: [
    { title: "任務一", subtitle: "任務說明", reward: 1 },
    { title: "任務二", subtitle: "任務說明", reward: 1 },
    { title: "任務三", subtitle: "任務說明", reward: 1 },
    { title: "任務四", subtitle: "任務說明", reward: 1 },
  ],
  Bonus: [
    { title: "任務一", subtitle: "任務說明", reward: 2 },
    { title: "任務二", subtitle: "任務說明", reward: 2 },
    { title: "任務三", subtitle: "任務說明", reward: 2 },
    { title: "任務四", subtitle: "任務說明", reward: 2 },
    { title: "任務五", subtitle: "任務說明", reward: 2 },
    { title: "任務六", subtitle: "任務說明", reward: 2 },
    { title: "任務七", subtitle: "任務說明", reward: 2 },
    { title: "任務八", subtitle: "任務說明", reward: 2 },
    { title: "任務九", subtitle: "任務說明", reward: 20 },
    { title: "任務十", subtitle: "任務說明", reward: 20 },
  ],
};

// 分頁標籤
const TABS = [
  { key: "Day1", label: "Day1" },
  { key: "Day2", label: "Day2" },
  { key: "Bonus", label: "Bonus" },
];

function TaskPage() {
  const [tab, setTab] = useState("Day1");
  const { tasks, completeTask } = useContext(AppContext);

  return (
    <div className="task-page">
      <div className="task-container">
        <div className="task-header">
          <div className="task-title">每日任務</div>
          <div className="task-description">完成每日任務，獲取西呱</div>
        </div>
        <div className="task-list">
          {TASKS[tab].map((task, idx) => {
            const done = tasks[tab][idx];
            return (
              <button
                key={idx}
                className={`task-card${done ? " done" : ""}`}
                onClick={() => completeTask(tab, idx, task.reward)}
                disabled={done}
              >
                <div className="task-card-main">
                  <div className="task-card-title">{task.title}</div>
                  <div className="task-card-subtitle">{task.subtitle}</div>
                </div>
                <div className="task-card-reward">
                  <img src="/images/watermelon.png" alt="西呱" />
                  <span>+{task.reward}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="task-tabs-bottom">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`task-tab-bottom${tab === t.key ? " active" : ""}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskPage;
