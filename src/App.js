import React, { useReducer, useRef } from "react";
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
      newState = [...action.data, ...state];
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
  return newState;
};

export const StateContext = React.createContext(); //
export const FunctionContext = React.createContext();

const dummy = [
  {
    id: 1,
    score: 1,
    content: "testestsetsetsetset",
    date: 1650126849993,
  },
  {
    id: 2,
    score: 2,
    content: "testestsetsetsetset",
    date: 1650126849994,
  },
  {
    id: 3,
    score: 3,
    content: "testestsetsetsdfsdfsetset",
    date: 1650126849995,
  },
  {
    id: 4,
    score: 4,
    content: "testestsetsetsetset",
    date: 1650126849996,
  },
  {
    id: 5,
    score: 5,
    content: "testestsetsetdfgasetset",
    date: 1650126849997,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummy);
  const dataId = useRef(1);

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
