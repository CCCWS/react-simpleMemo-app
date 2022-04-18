import React, { useEffect, useState } from "react";
import "./DataList.css";
import Button from "./Button";
import DataItem from "./DataItem";
import { useNavigate } from "react-router-dom";

const sortType = [
  { value: "new", name: "최신순" },
  { value: "old", name: "오래된순" },
]; //select의 option을 정의

const filterType = [
  { value: "all", name: "모두" },
  { value: "good", name: "좋음" },
  { value: "normal", name: "보통" },
  { value: "bad", name: "나쁨" },
];

//select 컴포넌트
const SelectMenu = React.memo(({ setFunction, type }) => {
  // useEffect(() => {
  //   console.log("render");
  // });
  //React.memo를 사용하지 않으면 해더의 날짜가 바뀔때마다 실행됨

  //setFunction같이 상태변화함수를 넘겨받는 경우에는 자체적으로 useCallback이 적용되어서 받게됨
  //props로 넘겨받지않고 컴포넌트에서 함수를 생성하여 사용하면 따로 처리를 해줘야하는 불편함발생

  const onChange = (event) => {
    setFunction(event.target.value);
  }; //이벤트가 발생하면 new인지 old인지 setDataSort로 데이터를 저장
  return (
    <select className="selectMenu" onChange={onChange}>
      {type.map((data, index) => (
        <option key={index} value={data.value}>
          {data.name}
        </option>
      ))}
    </select>
  );
});

function DataList({ data }) {
  const nav = useNavigate();
  const [dataSort, setDataSort] = useState("new");
  const [dataFilter, setDataFilter] = useState("all");
  //select 컴포넌트에서 선택한 value를 저장

  const sortData = () => {
    const sorted = (a, b) => {
      //정렬
      if (dataSort === "new") {
        //date의 값이 클수록 최신순
        return parseInt(b.date) - parseInt(a.date);
      } else {
        //date의 값이 작을수록 오래된순
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const filtered = (data) => {
      //필터
      if (dataFilter === "good") {
        return parseInt(data.score) < 3;
      }
      if (dataFilter === "normal") {
        return parseInt(data.score) === 3;
      }
      if (dataFilter === "bad") {
        return parseInt(data.score) > 3;
      }
    };

    const copyData = [...data]; //props로 받은 데이터를 복사

    const filterData =
      dataFilter === "all" //filter의 value가 all이라면 변화없이 그대로 반환
        ? copyData
        : copyData.filter((data) => filtered(data)); //아니라면 filter 실행

    const sortedData = filterData.sort(sorted);
    //sort와 filter를 거친 새로운 배열을 반환
    return sortedData;
  };

  const newPage = () => {
    nav("/new");
  };

  return (
    <>
      <div className="menu">
        <SelectMenu setFunction={setDataSort} type={sortType} />
        <SelectMenu setFunction={setDataFilter} type={filterType} />
        <Button type={"green"} text={"new"} onClick={newPage} />
      </div>

      {sortData().map((data) => {
        //넘겨받은 data를 sort한 sortData를 사용
        return <DataItem key={data.id} {...data} />;
      })}
    </>
  );
}

DataList.defaultProps = {
  data: [],
};

export default DataList;

//Home컴포넌트의 자식요소로 Home이 재랜더링이 발생하면 같이 재랜더링 발생
