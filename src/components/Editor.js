import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import Button from "./Button";
import ScoreItem from "./ScoreItem";

import { FunctionContext } from "../App";

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

function Editor({ isEdit, findData }) {
  //Edit에서 넘겨받은 props
  const nav = useNavigate();
  const { onCreate } = useContext(FunctionContext);
  //useContext를 사용해 App.js에 있는 FunctionContext에 넣어준 onCreate함수를 꺼내옴

  const contentRef = useRef();
  const [date, setDate] = useState(stringDate(new Date()));
  const [score, setScore] = useState(3);
  const [content, setContent] = useState("");

  const saveScore = (data) => {
    setScore(data);
  };

  const back = () => {
    nav(-1);
  };

  const dataSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    onCreate(date, content, score);
    nav("/", { replace: true });
    // replace: true  > 홈으로 돌아간후 뒤로가기를 했을경우 해당 페이지에 다시 오는걸 막음
  };

  useEffect(() => {
    if (isEdit) {
      setDate(stringDate(new Date(parseInt(findData.date))));
      setScore(findData.score);
      setContent(findData.content);
    }
  }, [isEdit, findData]);
 //isEdit가 true일때 > edit로 넘어왔을때

  return (
    <>
      <Header
        text={"새글쓰기"}
        left={<Button onClick={back} text={"< 뒤로가기"} />}
      />
      <section>
        <h2>오늘 날짜는?</h2>
        <input
          className="dateInput"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </section>
      <section>
        <h2>점수</h2>
        <div className="scoreInput">
          {scoreList.map((data) => (
            <ScoreItem
              key={data.score_id}
              {...data}
              onClick={saveScore}
              isSelect={data.score_id === score} //선택된 아이템만 True를 반환
            />
          ))}
        </div>
      </section>
      <section>
        <h2>내용</h2>
        <textarea
          className="contentInput"
          ref={contentRef}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="내용 입력"
        />
      </section>

      <section className="BtnInput">
        <Button text={"취소"} onClick={back} />
        <Button text={"완료"} type={"green"} onClick={dataSubmit} />
      </section>
    </>
  );
}

export default Editor;
