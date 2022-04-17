import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";

import { FunctionContext } from "../App";

function New() {
  const { onCreate } = useContext(FunctionContext);
  const nav = useNavigate();
  const [state, setState] = useState({
    date: "",
    content: "",
    score: "",
  });
  const back = () => {
    nav(-1);
  };

  const saveState = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const onClick = () => {
    onCreate(state.date, state.content, state.score);
  };
  return (
    <>
      <Header
        text={"새글쓰기"}
        left={<Button onClick={back} text={"< 뒤로가기"} />}
      />
      <div className="calender">
        <h2>오늘 날짜는?</h2>
        <div>달력표시</div>
      </div>

      <div className="score">
        <h2>점수</h2>
        <input name="score" onClick={saveState} type="radio" value="5" />
        매우 중요
        <input name="score" onClick={saveState} type="radio" value="4" />
        중요
        <input name="score" onClick={saveState} type="radio" value="3" />
        보통
        <input name="score" onClick={saveState} type="radio" value="2" />
        시간 되면
        <input name="score" onClick={saveState} type="radio" value="1" />
        안해도됨
      </div>

      <div className="content">
        <h2>내용</h2>
        <textarea name="content" value={state.content} onChange={saveState} />
      </div>
      <Header
        left={<Button text={"취소"} />}
        right={<Button text={"완료"} type={"green"} onClick={onClick} />}
      />
    </>
  );
}

export default New;
