import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StateContext } from "../App";
import { FunctionContext } from "../App";

import Button from "../components/Button";
import Header from "../components/Header";

import { scoreList } from "../utils/score";

function Detail() {
  const nav = useNavigate();
  const [detailData, setDetailData] = useState();
  const data = useContext(StateContext);
  const { onRemove } = useContext(FunctionContext);
  const { id } = useParams();

  useEffect(() => {
    if (detailData) {
      const titleName = document.getElementsByTagName("title")[0];
      titleName.innerHTML = `Daily Memo ${detailData.content}`;
    }
  }, [detailData]);

  const backPage = () => {
    nav(-1);
  };

  const editPage = () => {
    nav(`/edit/${id}`);
  };

  useEffect(() => {
    if (data.length > 0) {
      const find = data.find((data) => parseInt(data.id) === parseInt(id));
      if (find) {
        setDetailData(find);
      } else {
        alert("없음");
        nav(`/`, { replace: true });
      }
    }
  }, [data, id]);

  const removeData = () => {
    if (window.confirm("삭제?")) {
      onRemove(detailData.id);
      nav("/", { replace: true });
    }
  };

  if (!detailData) {
    return <div>loading</div>;
  } else {
    const findScoreData = scoreList.find(
      (item) => parseInt(item.score_id) === parseInt(detailData.score)
    );

    return (
      <>
        <Header
          text={new Date(detailData.date).toLocaleDateString()}
          left={<Button text={"뒤로가기"} onClick={backPage} />}
          right={<Button text={"삭제하기"} type={"red"} onClick={removeData} />}
        />

        <div className="detailScore">
          <h4> 점수 </h4>
          <div
            className={[`detailScoreImg imgScore${detailData.score}`].join(" ")}
          >
            <img src={findScoreData.score_img} />
            <div>{findScoreData.score_descript}</div>
          </div>
        </div>

        <div className="detailContent">
          <h4>내용</h4>
          <textarea value={detailData.content} disabled />
        </div>
      </>
    );
  }
}

export default Detail;
