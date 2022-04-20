import React, { useEffect } from "react";

import Editor from "../components/Editor";

function New() {
  useEffect(() => {
    const titleName = document.getElementsByTagName("title")[0];
    titleName.innerHTML = `Daily Memo 새 메모`;
  }, []);

  return (
    <>
      <Editor />
    </>
  );
}

export default New;

//새글작성 페이지
//Editor.js를 import해서 수정페이지와 폼 공유
