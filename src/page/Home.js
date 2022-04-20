import React, { useContext, useEffect, useState } from "react";

import Header from "../components/Header";
import Button from "../components/Button";
import DataList from "../components/DataList";

import { StateContext } from "../App";

//new Date() 연 월 일 요일 시 분 초 모두 포함
//new Date().getFullYear()
//new Date().getMonth()
//new Date().getTime() 시간은 ms로 반환

function Home() {
  const dataList = useContext(StateContext); //context로 App에서 받아온 데이터
  const [data, setData] = useState([]);
  const [currDate, setCurrDate] = useState(new Date()); //header에 날짜 표시를 위한 state

  useEffect(() => {
    const titleName = document.getElementsByTagName("title")[0];
    titleName.innerHTML = `Daily Memo  ${currDate.getMonth() + 1}월`;
  }, [currDate]);

  useEffect(() => {
    const first = new Date(
      currDate.getFullYear(),
      currDate.getMonth(),
      1
    ).getTime(); //헤더에 표시된 월의 1일

    const last = new Date(
      currDate.getFullYear(),
      currDate.getMonth() + 1,
      0,
      23,
      59,
      59
      //0만 입력해주면 월의 마지막일은 표시가 안됨
    ).getTime(); //헤더에 표시된 월의 마지막일

    setData(dataList.filter((data) => first <= data.date && data.date <= last));
  }, [dataList, currDate]);
  //currDate가 변경될때마다 실행 > prev, nextMonth함수로 날짜가 변할때마다
  //삭제 추가 수정을 위해 dataList가 변화가 생길때도 실행
  //모든 시간은 ms로 반환

  const prevMonth = () => {
    setCurrDate(
      new Date(currDate.getFullYear(), currDate.getMonth() - 1),
      currDate.getDate()
    );
  };

  const nextMonth = () => {
    setCurrDate(
      new Date(currDate.getFullYear(), currDate.getMonth() + 1),
      currDate.getDate()
    );
  };

  return (
    <>
      <Header
        text={`${currDate.getFullYear()}년 ${currDate.getMonth() + 1}월`}
        left={<Button text={"<"} onClick={prevMonth} />}
        right={<Button text={">"} onClick={nextMonth} />}
      />


      <DataList data={data} />
    </>
  );
}

export default Home;

//메인화면
//Header컴포넌트와 DataList컴포넌트를 사용하여 랜더링
//DataList에 넘겨주는 data는 해당 월에 포함되는 값만 필터링된 데이터