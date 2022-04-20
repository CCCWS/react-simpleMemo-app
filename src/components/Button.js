import React from "react";

//전달받은 props가 없을시 기본값 설정
Button.defaultProps = {
  type: "gray",
};

function Button({ text, type, onClick }) {
  //type props로 전달받은 값이 일치하면 그대로 반환, 아니라면 gray를 반환 
  // .includes(a) > 리스트의 인덱스를 하나하나 a와 비교하여 일치하면 true, 아니면 false 반환 
  const btnCheck = ["red", "green"].includes(type) ? type : "gray";
  return (
    <button
    //type별로 다른 className을 가짐
    // .join(" ") > 리스트의 인덱스를 " "로 연결하여 하나의 문자열로 반환 
      className={[`Button`, `Button_${btnCheck}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;

//버튼 컴포넌트
