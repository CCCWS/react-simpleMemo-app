import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function DataItem({ id, score, date, content }) {
  // useEffect(() => {
  //   console.log("test");
  // });
  const nav = useNavigate();

  const detailPage = () => {
    nav(`/detail/${id}`);
  };

  const editPage = () => {
    nav(`/edit/${id}`);
  };
  return (
    <div className="dataList">
      <div
        onClick={detailPage}
        className={[`imgScore imgScore${score}`].join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${score}.png`} />
      </div>

      <div onClick={detailPage} className="listContent">
        <div className="date">{new Date(date).toLocaleDateString()}</div>

        <div className="content">{content.slice(0, 30)}</div>
      </div>
      <Button onClick={editPage} text={"수정하기"} />
    </div>
  );
}

export default React.memo(DataItem);
