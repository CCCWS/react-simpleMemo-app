import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";

function DataItem({ id, score, date, content }) {
  //DataList로부터 전달밭은 props

  const nav = useNavigate();

  const detailPage = () => {
    nav(`/detail/${id}`);
  };

  const editPage = () => {
    nav(`/edit/${id}`);
  };

  return (
    <div className="dataList">
      <div className={[`imgScore imgScore${score}`].join(" ")}>
        <img src={process.env.PUBLIC_URL + `assets/emotion${score}.png`} />
      </div>

      <div onClick={detailPage} className="listContent">
        <div className="date">{new Date(date).toLocaleDateString()}</div>
        <div className="content">{content.slice(0, 10)}</div>
      </div>

      <Button onClick={editPage} text={"수정하기"} />
    </div>
  );
}

export default React.memo(DataItem);

//메인화면에서 각각의 메모에 표시될 데이터를 입력
//이미지 / 정보 / 수정버튼으로 구성
