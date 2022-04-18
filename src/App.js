import React, { useEffect, useReducer, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./page/Home";
import New from "./page/New";
import Detail from "./page/Detail";
import Edit from "./page/Edit";

import "./App.css";

const reducer = (state, action) => {
  let newState = [];
  //생성된 데이터를 저장

  switch (action.type) {
    case "INIT": {
      return action.data;
      //데이터 초기화
    }

    case "CREATE": {
      newState = [action.data, ...state];
      //전달 받은 데이터와 기존에 있던 데이터를 모두 저장
      break;
    }

    case "REMOVE": {
      newState = state.filter((data) => data.id !== action.id);
      //전달 받은 id를 제외한 인덱스를 반환
      break;
    }

    case "EDIT":
      {
        newState = state.map((data) =>
          data.id === action.data.id ? { ...action.data } : data
        );
        //id는 변경되지 않으므로 일치하는 id에 새로운 값으로 변경
        break;
      }
      defalut: return state;
  }
  localStorage.setItem("data", JSON.stringify(newState));
  return newState;
};

export const StateContext = React.createContext(); //
export const FunctionContext = React.createContext();

// const dummy = [
//   {
//     id: 1,
//     score: 1,
//     content: "내일",
//     date: 1650126849993,
//   },
//   {
//     id: 2,
//     score: 2,
//     content: "까진",
//     date: 1650126849994,
//   },
//   {
//     id: 3,
//     score: 3,
//     content: "진짜",
//     date: 1650126849995,
//   },
//   {
//     id: 4,
//     score: 4,
//     content: "전부",
//     date: 1650126849996,
//   },
//   {
//     id: 5,
//     score: 5,
//     content: "끝냄",
//     date: 1650126849997,
//   },
// ];

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(1);
  //더미데이터를 사용한 상태에서 새로운 값을 추가할시
  //id값으로 1번부터 주고있지만 이미 1~5번 id는 사용중이라 에러발생
  //더미데이터를 사용하며 에러를 피하기 위해서는 id를 6부터 줘야됨

  useEffect(() => {
    const localData = localStorage.getItem("data");
    if (localData !== "[]" && localData !== null) {
      const loadData = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      dataId.current = parseInt(loadData[0].id) + 1;
      //lacalstorge에서 불러온 데이터에 이미 id값을 가지고 있어서
      //새로 추가할 데이터의 id를 1부터 시작해주면 안됨 > 조정 필요
      //불러온 데이터를 id를 기준으로 내림차순 정렬후 가장 높은 값의 +1부터 시작

      dispatch({ type: "INIT", data: loadData });
    }
  }, []);

  //생성
  const onCreate = (date, content, score) => {
    //받은 prop을 data 객체로 묶어서 전달
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        score,
      },
    });
    dataId.current += 1;
  };

  //제거
  const onRemove = (id) => {
    //id를 전달
    dispatch({ type: "REMOVE", id });
  };

  //수정
  const onEdit = (id, date, content, score) => {
    dispatch({
      type: "EDIT",
      data: {
        id: id,
        date: new Date(date).getTime(),
        content,
        score,
        //id를 제외한 나머지 값들은 모두 새로운 값으로 변경
      },
    });
  };

  return (
    <StateContext.Provider value={data}>
      <FunctionContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path={`/`} element={<Home />} />
              <Route path={`/new`} element={<New />} />
              <Route path={`/detail/:id`} element={<Detail />} />
              <Route path={`/edit/:id`} element={<Edit />} />
            </Routes>
          </div>
        </BrowserRouter>
      </FunctionContext.Provider>
    </StateContext.Provider>
  );
}
export default App;
