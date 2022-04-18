import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import Button from "./Button";
import ScoreItem from "./ScoreItem";

const scoreList = [
  {
    score_id: 1,
    score_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    score_descript: "완벽",
  },
  {
    score_id: 2,
    score_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    score_descript: "만족",
  },
  {
    score_id: 3,
    score_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    score_descript: "보통",
  },
  {
    score_id: 4,
    score_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    score_descript: "별로",
  },
  {
    score_id: 5,
    score_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    score_descript: "망함",
  },
];

const stringDate = (date) => {
  return date.toISOString().slice(0, 10);
};
//.toISOString() Date함수 날짜를 문자열로 반환
// 0~9자리 > yyyy-mm-dd

function Editor() {
  const nav = useNavigate();

  const [date, setDate] = useState(stringDate(new Date()));
  const [score, setScore] = useState(3);

  const saveScore = (data) => {
    setScore(data);
  };

  console.log(score);
  const back = () => {
    nav(-1);
  };

  return (
    <>
      <Header
        text={"새글쓰기"}
        left={<Button onClick={back} text={"< 뒤로가기"} />}
      />
      <div className="calenderBox">
        <h2>오늘 날짜는?</h2>
        <input
          className="dateInput"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        <h2>점수</h2>
        <div className="scoreBox">
          {scoreList.map((data) => (
            <ScoreItem
              key={data.score_id}
              {...data}
              onClick={saveScore}
              isSelect={data.score_id === score} //선택된 아이템만 True를 반환
            />
          ))}
        </div>
      </div>

      <div className="content">
        <h2>내용</h2>
        <textarea name="content" />
      </div>
      <Header
        left={<Button text={"취소"} onClick={back} />}
        right={<Button text={"완료"} type={"green"} />}
      />
    </>
  );
}

export default Editor;
