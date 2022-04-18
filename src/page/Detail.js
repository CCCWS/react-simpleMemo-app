import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StateContext } from "../App";

import Button from "../components/Button";
import Header from "../components/Header";

import { scoreList } from "../utils/score";

function Detail() {
  const nav = useNavigate();
  const [detailData, setDetailData] = useState();
  const data = useContext(StateContext);
  const { id } = useParams();

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

  if (!detailData) {
    return <div>loading</div>;
  } else {
    const findScoreData = scoreList.find(
      (data) => parseInt(data.score_id) === parseInt(detailData.id)
    );
    console.log(findScoreData);

    return (
      <>
        <Header
          text={new Date(detailData.date).toLocaleDateString()}
          left={<Button text={"뒤로가기"} onClick={backPage} />}
          right={<Button text={"수정하기"} onClick={editPage} />}
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
          <textarea disabled>{detailData.content}</textarea>
        </div>
      </>
    );
  }
}

export default Detail;
