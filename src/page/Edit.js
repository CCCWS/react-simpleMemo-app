import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { StateContext } from "../App";
import Editor from "../components/Editor";

function Edit() {
  const nav = useNavigate();

  const data = useContext(StateContext);
  const { id } = useParams();

  const [findData, setFindData] = useState();

  useEffect(() => {
    if (data.length > 0) {
      const find = data.find((data) => parseInt(data.id) === parseInt(id));
      //현재 페이지의 id와 넘겨받은 data의 id를 비교하여 일치한는 인덱스 반환
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
