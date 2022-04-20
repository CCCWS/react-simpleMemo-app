import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StateContext } from "../App";
import { FunctionContext } from "../App";

import Button from "../components/Button";
import Header from "../components/Header";

import { scoreList } from "../utils/info";

function Detail() {
  const nav = useNavigate();

  const { id } = useParams();

  const { onRemove } = useContext(FunctionContext);
  const data = useContext(StateContext);

  const [detailData, setDetailData] = useState();

  useEffect(() => {
    if (detailData) {
      const titleName = document.getElementsByTagName("title")[0];
      titleName.innerHTML = `Daily Memo ${detailData.content}`;
    }
  }, [detailData]);

  const backPage = () => {
    nav(-1);
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
  //수정페이지와 동일하게 id값을 비교하여 일치하는 id를 가지는 데이터 하나만 가져옴

  const removeData = () => {
    if (window.confirm("삭제?")) {
      onRemove(detailData.id);
      nav("/", { replace: true });
    }
  };
  //context로 가져온 onRemove함수에 state에 저장된 데이터의 id값을 보냄
  //onRemove함수에서는 전달받은 id와 일치하는 데이터를 filter를 통해 제외시킴

  if (!detailData) {
    return <div>loading</div>;
  } else {
    const findScoreData = scoreList.find(
      (item) => parseInt(item.score_id) === parseInt(detailData.score)
    );
    //utils의 score를 import해서 일치하는 id값의 데이터를 불러옴

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

//상세페이지
// 이미지에 대한 정보를 담고있는 score와 해당 id에 일치하는 정보를 가져옴
