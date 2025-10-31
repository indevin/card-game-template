import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import "./ArrestPage.css";

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

const LEVEL_ORDER = { N: 1, R: 2, SR: 3, UR: 4 };

const LEVEL_RATE = [
  { level: "N", rate: 0.72 },
  { level: "R", rate: 0.24 },
  { level: "SR", rate: 0.03 },
  { level: "UR", rate: 0.01 },
];

function randomCard() {
  const r = Math.random();
  let acc = 0;
  let level = "N";
  for (const l of LEVEL_RATE) {
    acc += l.rate;
    if (r < acc) {
      level = l.level;
      break;
    }
  }
  const pool = CARD_POOL.filter((c) => c.level === level);
  return pool[Math.floor(Math.random() * pool.length)];
}

function drawCards() {
  const result = [];
  for (let i = 0; i < 4; i++) {
    result.push(randomCard());
  }
  return result;
}

function ExchangeModal({ bag, onClose, onExchange }) {
  const cardCount = { N: 0, R: 0, SR: 0, UR: 0 };
  bag.forEach(card => { cardCount[card.level] = (cardCount[card.level] || 0) + 1; });

  const maxN = Math.floor(cardCount.N / 8) * 8;
  const maxR = Math.floor(cardCount.R / 4) * 4;
  const maxSR = Math.floor(cardCount.SR / 2) * 2;
  const maxUR = cardCount.UR;

  const [nCount, setNCount] = useState(0);
  const [rCount, setRCount] = useState(0);
  const [srCount, setSRCount] = useState(0);
  const [urCount, setURCount] = useState(0);

  const nWatermelon = Math.floor(nCount / 8);
  const rWatermelon = Math.floor(rCount / 4);
  const srWatermelon = Math.floor(srCount / 2);
  const urWatermelon = urCount;
  const watermelon = nWatermelon + rWatermelon + srWatermelon + urWatermelon;

  const add = (max, set, step = 1) => () => {
    set(x => Math.min(x + step, max));
  };
  const sub = (set, step = 1) => () => {
    set(x => Math.max(x - step, 0));
  };

  const handleExchange = () => {
    onExchange({ N: nCount, R: rCount, SR: srCount, UR: urCount });
    onClose();
  };

  return (
    <div className="arrest-modal-bg">
      <div className="arrest-modal exchange-modal">
        <div className="exchange-title">交換區</div>
        <div className="exchange-list">
          <div className="exchange-row">
            <span className="exchange-level level-N">N</span>
            <button onClick={sub(setNCount, 8)} disabled={nCount === 0}>-</button>
            <span className="exchange-count">{nCount}/{cardCount.N}</span>
            <button onClick={add(maxN, setNCount, 8)} disabled={nCount >= maxN}>+</button>
            <span className="exchange-equal">=</span>
            <span className="exchange-wm"><img src="/images/watermelon.png" alt="西瓜" />+{nWatermelon}</span>
          </div>
          <div className="exchange-row">
            <span className="exchange-level level-R">R</span>
            <button onClick={sub(setRCount, 4)} disabled={rCount === 0}>-</button>
            <span className="exchange-count">{rCount}/{cardCount.R}</span>
            <button onClick={add(maxR, setRCount, 4)} disabled={rCount >= maxR}>+</button>
            <span className="exchange-equal">=</span>
            <span className="exchange-wm"><img src="/images/watermelon.png" alt="西瓜" />+{rWatermelon}</span>
          </div>
          <div className="exchange-row">
            <span className="exchange-level level-SR">SR</span>
            <button onClick={sub(setSRCount, 2)} disabled={srCount === 0}>-</button>
            <span className="exchange-count">{srCount}/{cardCount.SR}</span>
            <button onClick={add(maxSR, setSRCount, 2)} disabled={srCount >= maxSR}>+</button>
            <span className="exchange-equal">=</span>
            <span className="exchange-wm"><img src="/images/watermelon.png" alt="西瓜" />+{srWatermelon}</span>
          </div>
          <div className="exchange-row">
            <span className="exchange-level level-UR">UR</span>
            <button onClick={sub(setURCount)} disabled={urCount === 0}>-</button>
            <span className="exchange-count">{urCount}/{cardCount.UR}</span>
            <button onClick={add(maxUR, setURCount)} disabled={urCount >= maxUR}>+</button>
            <span className="exchange-equal">=</span>
            <span className="exchange-wm"><img src="/images/watermelon.png" alt="西瓜" />+{urWatermelon}</span>
          </div>
        </div>
        <div className="exchange-total">
          總計 <img src="/images/watermelon.png" alt="西瓜" /> +{watermelon}
        </div>
        <div className="exchange-btn-row">
          <button className="exchange-cancel-btn" onClick={onClose}>取消</button>
          <button className="exchange-confirm-btn" onClick={handleExchange} disabled={watermelon === 0}>確定</button>
        </div>
      </div>
    </div>
  );
}

function ArrestPage() {
  const { watermelon, setWatermelon, caughtCount, setCaughtCount, catchPig, bag, setBag } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [drawn, setDrawn] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [showExchange, setShowExchange] = useState(false);

  const handleDraw = () => {
    if (watermelon < 1) return;
    setWatermelon(w => w - 1);
    setCaughtCount(c => c + 1);
    const result = drawCards();
    setDrawn(result);
    catchPig(result.map(c => c.id));
    setBag(prev => [...prev, ...result]);
    setShowModal(true);
  };

  const handleExchange = ({ N, R, SR, UR }) => {
    let leftN = N, leftR = R, leftSR = SR, leftUR = UR;
    setBag(prev => {
      const newBag = [];
      for (const card of prev) {
        if (card.level === 'N' && leftN > 0) { leftN--; continue; }
        if (card.level === 'R' && leftR > 0) { leftR--; continue; }
        if (card.level === 'SR' && leftSR > 0) { leftSR--; continue; }
        if (card.level === 'UR' && leftUR > 0) { leftUR--; continue; }
        newBag.push(card);
      }
      return newBag;
    });
    setWatermelon(w => w + Math.floor(N / 8) + Math.floor(R / 4) + Math.floor(SR / 2) + UR);
  };

  useEffect(() => {
    if (showModal && drawn.length > 0) {
      setVisibleCards(Array(drawn.length).fill(false));
      drawn.forEach((_, idx) => {
        setTimeout(() => {
          setVisibleCards(v => {
            const next = [...v];
            next[idx] = true;
            return next;
          });
        }, 300 * (idx + 1));
      });
    } else if (!showModal) {
      setVisibleCards([]);
    }
  }, [showModal, drawn]);

  const bagCards = [...bag].sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level] || a.id - b.id);

  return (
    <div className="arrest-page">
      <div className="arrest-collected-list">
        <div className="arrest-bag-header">
          <div className="arrest-bag-title">背包</div>
          <div className="arrest-bag-count">已捕獲小豚：{bag.length}隻</div>
        </div>
        <div className="arrest-collected-cards-scroll">
          {bagCards.map((card, idx) => (
            <div className={`arrest-collected-card level-${card.level}`} key={idx}>
              <img src={card.img} alt={card.name} />
              <div className="arrest-collected-card-name">{card.name}</div>
              <div className="arrest-collected-card-level">{card.level}</div>
            </div>
          ))}
        </div>
      </div>
      <button className="arrest-btn" onClick={handleDraw} disabled={watermelon < 1}>
        <span>誘捕</span>
        <img src="/images/water.png" alt="誘捕" className="arrest-btn-icon" />
      </button>
      <button className="exchange-btn" onClick={() => setShowExchange(true)}>兌換</button>
      {showExchange && (
        <ExchangeModal bag={bag} onClose={() => setShowExchange(false)} onExchange={handleExchange} />
      )}
      {showModal && (
        <div className="arrest-modal-bg">
          <div className="arrest-modal">
            <div className="arrest-modal-title">抽到的卡片</div>
            <div className="arrest-modal-cards">
              {drawn.map((card, idx) => (
                <div className={`arrest-modal-card level-${card.level}${visibleCards[idx] ? ' visible' : ''}`} key={idx}>
                  <img src={card.img} alt={card.name} />
                  <div className="arrest-modal-card-name">{card.name}</div>
                  <div className="arrest-modal-card-level">{card.level}</div>
                </div>
              ))}
            </div>
            <button className="arrest-modal-close" onClick={() => setShowModal(false)}>關閉</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArrestPage;
