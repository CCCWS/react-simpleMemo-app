import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import DataItem from "./DataItem";

import { sortType, filterType } from "../utils/info";

// export const sortType = [
//   { value: "new", name: "최신순" },
//   { value: "old", name: "오래된순" },
// ];
// export const filterType = [
//   { value: "all", name: "모두" },
//   { value: "good", name: "좋음" },
//   { value: "normal", name: "보통" },
//   { value: "bad", name: "나쁨" },
// ];
//select의 option에 사용될 데이터 정의
//info에서 import해서 사용 or 해당 파일에 정의하여 사용

//Selcet컴포넌트
const SelectMenu = React.memo(({ setFunction, type }) => {
  // useEffect(() => {
  //   console.log("render");
  // });
  //React.memo를 사용하지 않으면 헤더의 날짜가 바뀔때마다 실행됨

  //setFunction같이 상태변화함수를 넘겨받는 경우에는 useCallback이 적용되어서 받게됨
  //props로 넘겨받지않고 컴포넌트에서 함수를 생성하여 사용하면 따로 처리를 해줘야하는 불편함발생

  //setFunction으로 넘겨받은 setDataFilter와 setDataSort는 useState 상태변화 함수로 useCallback가 적용됨

  const onChange = (event) => {
    setFunction(event.target.value);
  };
  //해당 type의 value를 저장

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
  //Home에서 data를 props로 전달받음
  const nav = useNavigate();

  const [dataSort, setDataSort] = useState("new");
  const [dataFilter, setDataFilter] = useState("all");
  //선택한 select의 value값을 저장

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

    const copyData = [...data];
    //props로 받은 데이터를 복사
    //전달받은 data를 직접수정하지 않음

    const filterData =
      dataFilter === "all"
        ? copyData //filter의 value가 all이라면 변화없이 그대로 반환
        : copyData.filter((data) => filtered(data)); //아니라면 filter 실행

    const sortedData = filterData.sort(sorted);

    return sortedData;
    //sort와 filter를 거친 새로운 data를 반환
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

//메인화면에서 작성된 data를 보여주기위한 컴포넌트

//날짜순, 카테고리 select와 새글작성을 위한 버튼생성
//화면에 리스트를 생성만 해주고 실제 데이터 입력은 DataItem 컴포넌트에 data를 전달하여 처리