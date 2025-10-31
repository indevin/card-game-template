import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import "./BookPage.css";

const CARD_POOL = [
  { id: 1, name: "一般豚", level: "N", img: "/images/card-01.png" },
  { id: 2, name: "叛逆豚", level: "N", img: "/images/card-02.png" },
  { id: 3, name: "頹廢豚", level: "N", img: "/images/card-03.png" },
  { id: 4, name: "口水豚", level: "R", img: "/images/card-04.png" },
  { id: 5, name: "厭世豚", level: "R", img: "/images/card-05.png" },
  { id: 6, name: "鄙視豚", level: "R", img: "/images/card-06.png" },
  { id: 7, name: "八卦豚", level: "SR", img: "/images/card-07.png" },
  { id: 8, name: "緊急豚", level: "SR", img: "/images/card-08.png" },
  { id: 9, name: "貓貓豚", level: "UR", img: "/images/card-09.png" },
  { id: 10, name: "豚桶", level: "UR", img: "/images/card-10.png" },
];

const LEVEL_COUNTS = {
  N: 3,
  R: 3,
  SR: 2,
  UR: 2,
};

function BookPage() {
  const { cards } = useContext(AppContext);
  const [showResetModal, setShowResetModal] = useState(false);

  // 計算各等級已收集數量
  const collectedByLevel = {
    N: cards.filter((id) => CARD_POOL.find((c) => c.id === id)?.level === "N")
      .length,
    R: cards.filter((id) => CARD_POOL.find((c) => c.id === id)?.level === "R")
      .length,
    SR: cards.filter((id) => CARD_POOL.find((c) => c.id === id)?.level === "SR")
      .length,
    UR: cards.filter((id) => CARD_POOL.find((c) => c.id === id)?.level === "UR")
      .length,
  };

  return (
    <div className="book-page">
      <div className="book-list">
        <div className="book-header">
          <div className="book-title">圖鑑</div>
          <div className="book-progress">
            <div className="book-progress-item">
              <div className="book-progress-level level-N">N</div>
              <span>
                {collectedByLevel.N}/{LEVEL_COUNTS.N}
              </span>
            </div>
            <div className="book-progress-item">
              <div className="book-progress-level level-R">R</div>
              <span>
                {collectedByLevel.R}/{LEVEL_COUNTS.R}
              </span>
            </div>
            <div className="book-progress-item">
              <div className="book-progress-level level-SR">SR</div>
              <span>
                {collectedByLevel.SR}/{LEVEL_COUNTS.SR}
              </span>
            </div>
            <div className="book-progress-item">
              <div className="book-progress-level level-UR">UR</div>
              <span>
                {collectedByLevel.UR}/{LEVEL_COUNTS.UR}
              </span>
            </div>
          </div>
        </div>
        <div className="book-cards-grid">
          {CARD_POOL.map((card) => {
            const collected = cards.includes(card.id);
            return (
              <div className={`book-card level-${card.level}`} key={card.id}>
                {collected ? (
                  <>
                    <img
                      src={card.img}
                      alt={card.name}
                      className="book-card-img"
                    />
                    <div className="book-card-name">{card.name}</div>
                    <div className="book-card-level">{card.level}</div>
                  </>
                ) : (
                  <>
                    <img
                      src="/images/unknow.png"
                      alt="未收集"
                      className="book-card-img"
                    />
                    <div className="book-card-level">{card.level}</div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="book-footer-tip">集滿後，會獲得神秘禮物！</div>
      <button
        className="book-reset-btn"
        onClick={() => setShowResetModal(true)}
      >
        重玩
      </button>
      {showResetModal && (
        <div className="book-reset-modal-bg">
          <div className="book-reset-modal">
            <div className="book-reset-modal-title">確定要重製所有進度嗎？</div>
            <div className="book-reset-modal-btns">
              <button
                className="book-reset-cancel"
                onClick={() => setShowResetModal(false)}
              >
                取消
              </button>
              <button
                className="book-reset-confirm"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                確定重製
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookPage;
