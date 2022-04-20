import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Editor from "../components/Editor";

import { StateContext } from "../App";

function Edit() {
  const nav = useNavigate();

  useEffect(() => {
    const titleName = document.getElementsByTagName("title")[0];
    titleName.innerHTML = `Daily Memo 수정`;
  }, []);

  const data = useContext(StateContext);
  //context에서 data를 받아옴

  const { id } = useParams();


  const [findData, setFindData] = useState();

  useEffect(() => {
    if (data.length > 0) {
      const find = data.find((data) => parseInt(data.id) === parseInt(id));
      //현재 페이지의 id와 넘겨받은 data의 id를 비교하여 일치한는 인덱스 반환
      //filter사용시 해당 인덱스를 배열에 담긴 상태로 반환
      //find를 사용하여 값을 하나하나 받아옴
      if (find) {
        setFindData(find);
      } else {
        alert("없음");
        nav("/", { replace: true });
      }
    }
  }, [id, data]);

  return <div>{findData && <Editor isEdit={true} findData={findData} />}</div>;
}

export default Edit;


//수정페이지
//새글작성 페이지와 공유하는 Editor컴포넌트를 사용하여 랜더링
//context로 받은 data중 props로 id값과 일치하는 값 하나를 props로 전달
// true를 전달하여 Editor에서 true를 받았다면 수정페이지로 인지