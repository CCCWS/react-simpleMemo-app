import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import Button from "./Button";
import ScoreItem from "./ScoreItem";

import { FunctionContext } from "../App";

import { scoreList } from "../utils/score";

const stringDate = (date) => {
  return date.toISOString().slice(0, 10);
};
//.toISOString() Date함수 날짜를 문자열로 반환
// 0~9자리 > yyyy-mm-dd

function Editor({ isEdit, findData }) {
  //Edit에서 넘겨받은 props
  const nav = useNavigate();
  const { onCreate, onEdit } = useContext(FunctionContext);
  //useContext를 사용해 App.js에 있는 FunctionContext에 넣어준 onCreate함수를 꺼내옴

  const contentRef = useRef();
  const [date, setDate] = useState(stringDate(new Date()));
  const [score, setScore] = useState(3);
  const [content, setContent] = useState("");

  const saveScore = useCallback((data) => {
    setScore(data);
  }, []);
  //ScoreItem에 넘겨주는 saveScore함수는 useStaet 상태변화 함수가 아님
  //useCallback을 해주어야 매번 재랜더링이 발생하지 않음

  const back = () => {
    nav(-1);
  };

  const dataSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (window.confirm(isEdit ? "내용 수정?" : "내용 작성?")) {
      if (!isEdit) {
        onCreate(date, content, score);
      } else {
        onEdit(findData.id, date, content, score);
      }
      nav("/", { replace: true });
    }
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
        text={isEdit ? "수정하기 " : "새글쓰기"}
        left={<Button text={"취소"} onClick={back} />}
        right={<Button text={"완료"} type={"green"} onClick={dataSubmit} />}
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
    </>
  );
}

export default Editor;
