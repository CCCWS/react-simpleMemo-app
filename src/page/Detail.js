import React from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  return <div>Detail</div>;
}

export default Detail;
