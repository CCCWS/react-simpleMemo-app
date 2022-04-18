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

export default ScoreItem;
