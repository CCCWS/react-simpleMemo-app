import React from "react";

function ScoreItem({ score_id, score_img, score_descript, onClick, isSelect }) {
  return (
    <div
      onClick={() => onClick(score_id)}
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