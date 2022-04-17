import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StateContext } from "../App";
import "./Detail.css";

import Button from "../components/Button";
import Header from "../components/Header";

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
    const filterData = data.find((data) => data.id == id);
    setDetailData(filterData);
  }, []);

  console.log(detailData);

  return (
    <>
      {detailData !== undefined ? (
        <>
          <Header
            text={new Date(detailData.date).toLocaleDateString()}
            left={<Button text={"뒤로가기"} onClick={backPage} />}
            right={<Button text={"수정하기"} onClick={editPage} />}
          />
          <div className="detailPage">
            <h4> 점수 </h4>
            <div
              className={[`detailPageImg imgScore${detailData.score}`].join(
                " "
              )}
            >
              <img src={`../../assets/emotion${detailData.score}.png`} />
              <div>나쁨</div>
            </div>

            <h4>내용</h4>
            <div className="detailContent">{detailData.content}</div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Detail;
