import React from "react";

function ScoreItem({
  score_id,
  score_img,
  score_descript,
  isSelect,
  saveScore, //함수
}) {
  return (
    <div
      onClick={() => saveScore(score_id)}
      className={[
        `scoreSelect`,
        isSelect ? `imgScore${score_id}` : `imgScoreOff`,
      ].join(" ")}
    >
      <img src={score_img} />
      <div>{score_descript}</div>
    </div>
  );
}

export default React.memo(ScoreItem);

//useState를 통해 전달받은 상태변화 함수가 아니거나 useCallback을 적용한 함수가 아니라면
//React.memo를 해주어도 랜더링시에 다시 랜더링이 발생하게됨 > onClick으로 인한 랜더링 발생
//saveScore는 직접 useCallback을 적용시켜서 전달받음

//선택한 score는 항상 일치하는 score_id가 존재하므로 선택한 score만 Ture 나머지는 false로 만들면
//각 항목마다 서로다른 css스타일을 적용가능함
//선택된 항목만 다른 색을 입혀주면 마치 라디오박스같이 작동을 하게됨
