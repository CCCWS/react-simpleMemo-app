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
import { scoreList } from "../utils/info";

const stringDate = (date) => {
  return date.toISOString().slice(0, 10);
};
//.toISOString() Date함수 날짜를 문자열로 반환
// 0~9자리 > yyyy-mm-dd

function Editor({ isEdit, findData }) {
  //두개다 Edit에서 넘겨받은 props

  const nav = useNavigate();
  const { onCreate, onEdit } = useContext(FunctionContext);
  //useContext를 사용해 App.js에 있는 FunctionContext에 넣어준 onCreate함수를 꺼내옴

  const contentRef = useRef();

  const [date, setDate] = useState(stringDate(new Date())); //stringDate를 사용하여 현재 시간을 yyyy-mm-dd로 저장
  const [score, setScore] = useState(3); //default 점수선택값
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
    //content의 길이가 0이면 작성하지 않은것으로 판단

    if (window.confirm(isEdit ? "내용 수정?" : "내용 작성?")) {
      if (!isEdit) {
        //New페이지에 접속한 경우 새로운 데이터를 생성
        onCreate(date, content, score);
      } else {
        //Edit페이지에 접속한 경우 해당 id의 데이터를 수정
        onEdit(findData.id, date, content, score);
      }
      nav("/", { replace: true });
    }
    // replace: true  > 홈으로 돌아간후 뒤로가기를 했을경우 해당 페이지에 다시 오는걸 막음

    //props로 전달받은 isEdit의 값으로 Edit페이지인지 New페이지 인지 판단함
    //Edit페이지에 접속할 경우 isEdit은 넘겨준 값인 true가 됨
    //New페이지에 접속할 경우 isEdit의 값은 넘겨받은게 없으므로 undefined가 됨
  };

  useEffect(() => {
    if (isEdit) {
      setDate(stringDate(new Date(parseInt(findData.date))));
      setScore(findData.score);
      setContent(findData.content);
    }
  }, [isEdit, findData]);
  //isEdit가 true일때 > edit로 넘어왔을때
  //수정페이지이므로 기존의 값을 가져옴

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
          {scoreList.map((data) => ( //scoreList는 info에서 정의해준 score에 대한 정보를 담고있음
            <ScoreItem
              key={data.score_id}
              {...data}
              saveScore={saveScore}
              isSelect={data.score_id === score} //    
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

//New페이지와 Edit페이지가 공유하는 컴포넌트로
//idEdit의 값에따라 어떤 페이지인지 판단하여 데이터를 보여줌
//날짜선택, 점수선택, 내용입력 3가지로 구성